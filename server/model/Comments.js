module.exports = {
  create: (con, postId, comments) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
          INSERT INTO comments
              (postId, comments)
          VALUES
              ("${postId}", ${comments})
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
          UPDATE comments 
          SET 
              comments = comments + 1
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
          UPDATE comments 
          SET 
              comments = comments - 1
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
