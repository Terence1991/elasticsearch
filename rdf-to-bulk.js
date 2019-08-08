'use strict';

const dir = require('node-dir');
const parsePDF = require('./lib/parse-rdf.js');

const dirname = process.argv[2];

const options = {
  match: /\.rdf$/,    //match file names that 'rdf' with regex;
  exclude: ['pg0.rdf'] // ignore the template rdf files
}


dir.readFiles(dirname, options, (err, content, next) => {
  if(err) throw err;
    process.stdout.on('error', (error) => {
      if(err.code === 'EPIPE') {
        process.exit();
      }
      throw err;
    })
  const doc = parsePDF(content);
  console.log(JSON.stringify({ index: {_id:`pg${doc.id} `} }));
  console.log(JSON.stringify(doc));
  next();
})