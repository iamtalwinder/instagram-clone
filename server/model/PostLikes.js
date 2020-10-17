module.exports = {
  create: (con, postId, likes) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        INSERT INTO postLikes
            (postId, likes)
        VALUES
            ("${postId}", ${likes})
          `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  increment: (con, postId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        UPDATE postLikes 
        SET 
            likes = likes + 1
        WHERE
            postId = "${postId}";    
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  decrement: (con, postId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        UPDATE postLikes 
        SET 
            likes = likes - 1
        WHERE
            postId = "${postId}";    
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
