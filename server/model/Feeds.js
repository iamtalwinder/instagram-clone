module.exports = {
  createTempFeedsTable: (con, userId) => {
    return new Promise((resolve, reject) => {
      const TABLE_NAME = `feeds${userId.toString()}`;
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
                AND post.userId IN (SELECT 
                    userId
                FROM
                    follow
                WHERE
                    followerId = ${userId})
                INNER JOIN
            postLikes ON postLikes.postId = post.postId
                INNER JOIN
            comments ON comments.postId = post.postId
                LEFT JOIN
            postLike ON postLike.userId = ${userId}
                AND postLike.postId = post.postId
        ORDER BY postedOn ASC
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  dropTempFeedsTable: (con, userId) => {
    return new Promise((resolve, reject) => {
      const TABLE_NAME = `feeds${userId.toString()}`;
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

  getFeeds: (con, userId, start, offset) => {
    return new Promise((resolve, reject) => {
      const TABLE_NAME = `feeds${userId.toString()}`;
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
