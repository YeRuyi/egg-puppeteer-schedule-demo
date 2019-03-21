const { Service: EggService } = require('egg');
const puppeteer = require('puppeteer');

class PuppeteerService extends EggService {

  constructor(props) {
    super(props);
    this.config = this.ctx.app.config.puppeteerConfig;
  }

  async loadCitiesInfo() {
    const { model } = this.ctx;
    const url = 'https://you.ctrip.com/place/';
    const browser = await puppeteer.launch({
      // headless: false,
      // defaultViewport: null,
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitFor(this.config.common_waiting_time);
    const valueArray = await page.$eval('#journals-panel-items > dl:nth-child(2) > dd > ul', countryPartObj => {
      const valueArray = [];
      for (const itemObj of countryPartObj.children) {
        const countryPartTitle = itemObj.getElementsByTagName('strong')[ 0 ].innerText
        const cities = itemObj.getElementsByTagName('a');
        const cityValues = [];
        for (const city of cities) {
          cityValues.push({
            city_url: city.href,
            city_name: city.innerHTML,
          })
        }
        valueArray.push({
          country_part_name: countryPartTitle,
          cities: cityValues,
        })
      }
      return valueArray;
    });
    await page.close();
    await browser.close();
    const res = [];
    valueArray.forEach(({ country_part_name, cities }) => {
      cities.forEach(item => {
        res.push({
          ...item,
          country_part_name,
        })
      })
    })
    await model.City.bulkCreate(res);
    return { data: valueArray };
  }

  async loadAttractionsInfo() {

    async function _loadAttraction(url) {
      const page = await browser.newPage()
      await page.goto(url);
      await page.waitFor(this.config.common_waiting_time);
      const valueArray = await page.$eval(
        'body > div.ttd2_background > div.content.cf.dest_city > div.des_wide.f_right > div:nth-child(13)', mainBody => {
          const articles = [];
          // 按照分析，获取热门文章
          const hotArticleGroup = mainBody.getElementsByClassName('journalslist cf')[ 0 ];
          for (const articleObj of hotArticleGroup.children) {
            if (!articleObj.href) {
              continue;
            }
            articles.push({
              article_img: articleObj.getElementsByTagName('img')[ 0 ].src,
              article_title: articleObj.getElementsByClassName('ellipsis')[ 0 ].innerText,
              article_profile: articleObj.getElementsByClassName('item-short')[ 0 ].innerText,
              article_url: articleObj.href,
              article_num_view: articleObj.getElementsByClassName('numview')[ 0 ].innerText,
              article_num_want: articleObj.getElementsByClassName('want')[ 0 ].innerText,
            });
          }
          return articles;
        })
      // 翻页继续获取
      await page.close();
      return valueArray;
    }

    const { model } = this.ctx;
    const citiesInfo = await model.City.findAll({
      attributes: [ 'id', 'city_url' ],
      raw: true,
    })
    const browser = await puppeteer.launch({
      headless: true,
      // defaultViewport: null,
    });
    const res = [];
    for (const { id: city_id, city_url } of citiesInfo) {
      try {
        const valuesArray = await _loadAttraction.call(this, city_url);
        console.log('[city_id]', city_id, ',spider resource num', valuesArray.length);
        res.push(...valuesArray.map(item => {
          return { ...item, city_id };
        }));
      } catch (e) {
        console.log('[city_id]', city_id, '[exp continue]', e);
      }
    }
    await model.Article.bulkCreate(res);
  }
}

module.exports = PuppeteerService;