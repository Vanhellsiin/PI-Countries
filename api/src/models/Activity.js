const { DataTypes } = require('sequelize');
module.exports = ( sequelize ) => {

   sequelize.define('activity', {
     name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
     },
     
     difficulty: {
      type: DataTypes.STRING,
      allowNull: false
     },

     duration: {
      type: DataTypes.STRING,
      allowNull: false
     },

     season: {
      type: DataTypes.STRING ,//ENUM("Verano", "Otoño", "Invierno", "Primavera"),
      allowNull: false
    },

   },
   {
    timestamps: false,
    
  }
   
   );
};