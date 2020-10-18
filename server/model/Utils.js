module.exports = {
  startTransaction: (con) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        START TRANSACTION
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  commit: (con) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        COMMIT     
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
