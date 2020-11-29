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

  createTempPostTable: (con, visitedUserId, visitorUserId) => {
    return new Promise((resolve, reject) => {
      const TABLE_NAME = `post${
        visitedUserId.toString() + visitorUserId.toString()
      }`;

      con.query(
        `
        CREATE TEMPORARY TABLE IF NOT EXISTS
          ${TABLE_NAME}
        SELECT 
          post.postId,
          post.userId,
          post.path,
          post.caption,
          post.dateAndTime AS postedOn,
          user.username,
          user.dpPath,
          postLikes.likes,
          comments.comments,
          postLike.userId AS isLiked
        FROM
          post
            INNER JOIN
          user ON user.userId = post.userId
            AND post.userId = ${visitedUserId}
            INNER JOIN
          postLikes ON postLikes.postId = post.postId
            INNER JOIN
          comments ON comments.postId = post.postId
            LEFT JOIN
          postLike ON postLike.userId = ${visitorUserId}
            AND postLike.postId = post.postId
        ORDER BY postedOn DESC;
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  dropTempPostTable: (con, visitedUserId, visitorUserId) => {
    return new Promise((resolve, reject) => {
      const TABLE_NAME = `post${
        visitedUserId.toString() + visitorUserId.toString()
      }`;
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

  getPostsByUserId: (con, visitedUserId, visitorUserId, start, offset) => {
    return new Promise((resolve, reject) => {
      const TABLE_NAME = `post${
        visitedUserId.toString() + visitorUserId.toString()
      }`;
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
