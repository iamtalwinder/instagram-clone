module.exports = {
  create: (con, userId, followers) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
          INSERT INTO followers
              (userId, followers)
          VALUES
              (${userId}, ${followers})
            `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  increment: (con, userId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
          UPDATE followers 
          SET 
              followers = followers + 1
          WHERE
              userId = ${userId};    
          `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  decrement: (con, userId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
          UPDATE followers 
          SET 
              followers = followers - 1
          WHERE
              userId = ${userId};    
          `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
