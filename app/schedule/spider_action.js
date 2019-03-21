const Subscription = require('egg').Subscription;

class SpiderSchedule extends Subscription{
    static get schedule() {
        return {
            type: 'worker',
            immediate: true,
        };
    }

    async subscribe() {
        const { service } = this.ctx;
        await service.spider.loadAttractionsInfo();
    }
}


module.exports = SpiderSchedule;
