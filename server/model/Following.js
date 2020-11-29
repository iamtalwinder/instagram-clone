module.exports = {
  create: (con, userId, following = 0) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
            INSERT INTO following
                (userId, following)
            VALUES
                (${userId}, ${following})
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
            UPDATE following 
            SET 
                following = following + 1
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
            UPDATE following 
            SET 
                following = following - 1
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
