const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {

    id: {
      type: DataTypes.STRING,   // para que no choque con los ID de la api
      allowNull: false,
      primaryKey: true, // indica que el ID es la PK
      
      },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    flags: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    continents: {
      type: DataTypes.STRING,
      allowNull: false,

    },

    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    subregion: {
      type: DataTypes.STRING,
      allowNull: true,  

    },

    area: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    population: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false
  }
  );
};
