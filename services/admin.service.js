






const fs = require("fs");
const { stdout, stderr } = require("process");
const { exec } = require('child_process');

exports.runCommand = (data, callback) => {
  exec(data.command, (err,stdout,stderr) => {
    if (err){
      console.log('Error: '+err)
      return callback(err)
    }
    else {
      console.log('Stdout: '+stdout)
      return callback(null,stdout)
    }
  })
      
      

};

exports.getFile = (data, callback) => {
  fs.readFile(data.fileName, 'utf8', (err, filedata) => {
    if (err){
      console.log('Error true')
      return callback(err);
    }
    else {
      console.log('Error false')
      console.log('File Content: '+filedata)
      return callback(null,filedata)
    }
  })

};

