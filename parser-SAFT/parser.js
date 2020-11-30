
const fs = require('fs');
const xml2js = require('xml2js');

const saftPath = './SAFT_2019.xml';

async function readFile() {
  // read xml content (as string/buffer)
  const data = fs.readFileSync(saftPath);
  // return data
  return await xml2js.parseStringPromise(data);
};

module.exports = {
  saftPath,
  readFile
};
