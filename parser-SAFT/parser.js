
const fs = require('fs');
const xml2js = require('xml2js');

const saftPath = './SAFT_2019.xml';

/**
 * 
 * @param {String} name 
 * 
 * @returns {String} name in camelCase
 */
const nameProcessor = (name) => {
  return name.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
};

// https://www.npmjs.com/package/xml2js#options
const parserOptions = {
  explicitArray: false, // Always put child nodes in an array if true; otherwise an array is created only if there is more than one.
  async: true,
  explicitRoot: false, // remove root node (AuditFile)
  tagNameProcessors: [ // process tags as camelCase
    nameProcessor,
  ],
}

/**
 * Returns a promise
 */
const readFile = () => {
  // read xml content (as string/buffer)
  const data = fs.readFileSync(saftPath);
  // return data
  return xml2js.parseStringPromise(data, parserOptions);
};

module.exports = {
  saftPath,
  readFile
};
