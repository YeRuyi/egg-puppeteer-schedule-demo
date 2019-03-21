/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('t_article', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    city_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    article_title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    article_img: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    article_profile: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    article_url: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    article_num_view: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    article_num_want: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.TIME,
      allowNull: true
    },
    created_at: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    tableName: 't_article'
  });

  Model.associate = function() {

  }

  return Model;
};
