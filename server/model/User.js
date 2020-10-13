module.exports = {
  getUserById: (con, userId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
          * 
        FROM 
          user 
        WHERE 
          userId = ${userId}
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  getUserByEmail: (con, email) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
          * 
        FROM 
          user 
        WHERE 
          email = "${email}"
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  getUserByUserName: (con, userName) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
          * 
        FROM 
          user 
        WHERE 
          userName = "${userName}"
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  createUser: (con, fullName, userName, email, password) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        INSERT INTO user 
          (fullName, userName, email, password) 
        VALUES 
          ("${fullName}", "${userName}", "${email}", "${password}")
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
