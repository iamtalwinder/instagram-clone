module.exports = {
  createPost: (con, postId, userId, path, caption) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
          INSERT INTO post
            (postId, userId, path, caption) 
          VALUES 
            ("${postId}", ${userId}, "${path}", "${caption}")
          `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  deletePost: (con, userId, postId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        DELETE FROM post
        WHERE 
          userId = ${userId}
        AND
          postId = "${postId}"  
          `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  getPostByPostId: (con, postId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT
            * 
        FROM
          post
        WHERE
          postId = "${postId}"
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  createTempPostTable: (con, userId) => {
    return new Promise((resolve, reject) => {
      const TABLE_NAME = `post${userId.toString()}`;

      con.query(
        `
        CREATE TEMPORARY TABLE IF NOT EXISTS
            ${TABLE_NAME}
        SELECT
            *
        FROM
            post
        WHERE
            userId = ${userId}
        ORDER BY
            dateAndTime DESC;
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  dropTempPostTable: (con, userId) => {
    return new Promise((resolve, reject) => {
      const TABLE_NAME = `post${userId.toString()}`;
      con.query(
        `
        DROP TABLE IF EXISTS 
            ${TABLE_NAME}
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  getPostsByUserId: (con, userId, start = 0, offset = 12) => {
    return new Promise((resolve, reject) => {
      const TABLE_NAME = `post${userId.toString()}`;
      con.query(
        `
        SELECT
            * 
        FROM
          ${TABLE_NAME}
        LIMIT ${start}, ${offset}
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
