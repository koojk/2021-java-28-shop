const path = require('path');
const fs = require('fs-extra');
const Sequelize = require('sequelize');
const { Op } = Sequelize;
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
config.timezone = '+09:00';
const db = {};

Sequelize.prototype.getWhere = function ({ field, search }) {
  let where = {};
  if (field === 'all') {
    // 상품검색
    where = {
      [Op.or]: {
        title: { [Op.like]: '%' + search + '%' },
        summary: { [Op.like]: '%' + search + '%' },
        content: { [Op.like]: '%' + search + '%' },
      },
    };
  } else if (field === 'tel') {
    // 회원검색
    where = this.where(this.fn('replace', this.col('tel'), '-', ''), {
      [Op.like]: '%' + search.replace(/-/g, '') + '%',
    });
  } else if (field === 'addrRoad') {
    // 회원검색
    where = {
      [Op.or]: {
        addrPost: { [Op.like]: '%' + search + '%' },
        addrRoad: { [Op.like]: '%' + search + '%' },
        addrJibun: { [Op.like]: '%' + search + '%' },
        addrComment: { [Op.like]: '%' + search + '%' },
        addrDetail: { [Op.like]: '%' + search + '%' },
      },
    };
  } else {
    where = search ? { [field]: { [Op.like]: '%' + search + '%' } } : {};
  }
  return where;
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
