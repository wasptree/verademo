const db = require("../config/db.config");
const md5 = require("blueimp-md5");
const { isJSDocNonNullableType } = require("typescript");

exports.getUsers = (callback) => {
  db.query(
    `SELECT username,real_name,blab_name,created_at from users`,
    [],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    }
  );
};

exports.userLogin = (data, callback) => {
  let hashedPassword = md5(data.password)
  console.log('hashed pass: '+hashedPassword)
  db.query(
    //bad code - SQLi
    `SELECT password from users where username='`+data.username+`' and password='`+hashedPassword+`'`,

    //good code
    //`SELECT * from users where username = ? and password = ?,
    [data.username, hashedPassword],
    (error, results, fields) => {
      if (error) {
        console.log('Error: '+error)
        return callback(error);
      }
      const resultsLength = results.length
      if ( resultsLength >= 1 ){
        const userToken = results[0].password
        console.log('Auth Token: '+userToken)
        return callback(null, [{"auth token":""+userToken+""}]);
      }
      else {
        return callback(null, "User could not be found");
      }
    }
  );
};