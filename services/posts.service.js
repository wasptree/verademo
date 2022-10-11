const db = require("../config/db.config");

exports.addBlab = (data, callback) => {
  const newDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
  //newDate.format("%Y-%m-%d %H:%M:%s")
  db.query(
    //bad code SQLi
    `INSERT INTO blabs (blabber, content, timestamp) VALUES ("`+data.user+`", "`+data.blab+`", "`+newDate+`")`,

    //good code
    //`INSERT INTO blabs (blabber, content, timestamp) VALUES (?, ?, ?)`,
    [data.user, data.blab, new Date()],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, "Blab posted successfully");
    }
  );
};

exports.getAllBlabs = (data, callback) => {
    db.query(
      `SELECT * from blabs`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  };

  exports.addBlabComment = (data, callback) => {
    const newDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    db.query(
      //bad code SQLi
      `INSERT INTO comments (blabid, content, blabber, timestamp) VALUES ("`+data.blabId+`", "`+data.comment+`", "`+data.user+`", "`+newDate+`")`,

      //good code
      //`INSERT INTO comments (blabid, content, blabber, timestamp) VALUES (?, ?, ?, ?)`,
      [data.blabId, data.comment, data.user, new Date()],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, `Comment Added Successfully`);
      }
    );
  };

  exports.getBlabComments = (data, callback) => {
    db.query(
      //bad code SQLi
      `SELECT * from comments where blabid = "`+data.blabId+`"`,

      //good code
      //`SELECT * from comments where blabid = ?`,
      [data.blabId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  };


  
  
  

  exports.deleteBlab = (data, callback) => {
    db.query(
      //bad code SQLi
      `DELETE FROM blabs WHERE blabid = "`+data.blabId+`"`,

      //good code
      //`DELETE FROM blabs WHERE blabid = ?`,
      [data.blabId],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        if (results.affectedRows === 1) {
          return callback(null, `Blab Deleted Successfully`);
        } else {
          return callback(new Error("Invalid post"));
        }
      }
    );
  };