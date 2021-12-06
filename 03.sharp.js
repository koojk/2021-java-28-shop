const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const { absPath } = require('./modules/util');

const files = fs.readdirSync(path.join(__dirname, './storages/201206'));

async function start() {
  for (let v of files) {
    let loc = path.join(__dirname, 'storages', v.split('_')[0], 'thumb');
    v.thumb = await sharp(absPath(v))
      .resize(200)
      // .jpeg({ mozjpeg: true })
      .jpeg({ quality: 100 })
      .toFile(path.join(loc, v));
  }
}

start();
