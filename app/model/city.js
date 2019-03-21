/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('city', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    country_part_name: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    city_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    city_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_at: {
      type: DataTypes.TIME,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    tableName: 't_city'
  });

  Model.associate = function() {

  }

  return Model;
};
