module.exports = {
  getUserById: (con, userId) => {
    return new Promise((resolve, reject) => {
      con.query(`SELECT * FROM user WHERE userId=${userId}`, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  getUserByEmail: (con, email) => {
    return new Promise((resolve, reject) => {
      con.query(`SELECT * FROM user WHERE email="${email}"`, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  createUser: (con, firstName, lastName, email, password) => {
    return new Promise((resolve, reject) => {
      con.query(
        `INSERT INTO user (firstName, lastName, email, password) VALUES 
		("${firstName}", "${lastName}", "${email}", "${password}")`,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
