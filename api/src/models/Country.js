const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    }, 

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    img: {
      type: DataTypes.STRING,
      allowNull: false
    },

    continents: {
      type: DataTypes.ENUM('South America', 'North America','Europe','Africa', 'Asia','Oceania','Antarctica'),
      allowNull: false,
    },

    capital: {
      type: DataTypes.STRING,
      allowNull: true,
    },    

    subregion: {
      type:DataTypes.STRING,
      allowNull: true,
    },

    area: {
      type:DataTypes.FLOAT,
      allowNull: false,
    },

    population: {
      type:DataTypes.FLOAT,
      allowNull: false,
    }

  },
  {
    timestamps: false,
    
  }
  );
};