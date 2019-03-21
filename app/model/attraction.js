/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('attraction', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    city_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    attraction_location: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    attraction_star: {
      type: DataTypes.INTEGER(20),
      allowNull: true
    },
    attraction_imgs: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attraction_profile: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    attraction_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    updated_time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    created_time: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    tableName: 't_attraction'
  });

  Model.associate = function() {

  }

  return Model;
};
