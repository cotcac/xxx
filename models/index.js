'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if(process.env.NODE_ENV==='production'){
  sequelize = new Sequelize(
    config.database, config.username, config.password,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    });

}else if(process.env.NODE_ENV==='test'){
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.storage
  });

}else{
  //development
  sequelize = new Sequelize(
    {
      dialect: 'sqlite',
      storage: config.storage
    });

}
  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
    process.exit(1);
  });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
