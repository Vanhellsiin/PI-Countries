const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
   sequelize.define('activity', {
     id: {
       type: DataTypes.UUID,   // para que no choque con los ID de la api
       allowNull: false,
       unique: true,
       primaryKey: true, // indica que el ID es la PK
       defaultValue: DataTypes.UUIDV4,
       },
 
     name: {
       type: DataTypes.STRING,
       allowNull: false,
     },
 
     difficulty: {
       type: DataTypes.ENUM("1", "2", "3", "4", "5"),
       allowNull: false,
     },
 
     duration: {
       type: DataTypes.STRING,
       allowNull: false,
 
     },
 
     season: {
         type: DataTypes.STRING,
         allowNull: false
     }
 
    
   },
   {
     timestamps: false,
     createdAt: false,
     updatedAt: false
   }
   );
 };