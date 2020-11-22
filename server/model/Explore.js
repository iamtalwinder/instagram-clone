module.exports = {
  createTempExploreTable: (con, userId) => {
    return new Promise((resolve, reject) => {
      const TABLE_NAME = `explore${userId.toString()}`;
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
                  AND post.userId NOT IN (SELECT 
                      userId
                  FROM
                      follow
                  WHERE
                      followerId = ${userId} OR userId = ${userId})
                  INNER JOIN
              postLikes ON postLikes.postId = post.postId
                  INNER JOIN
              comments ON comments.postId = post.postId
                  LEFT JOIN
              postLike ON postLike.userId = ${userId}
                  AND postLike.postId = post.postId
            ORDER BY postLikes.likes + comments.comments DESC;
          `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  dropTempExploreTable: (con, userId) => {
    return new Promise((resolve, reject) => {
      const TABLE_NAME = `explore${userId.toString()}`;
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

  getExplore: (con, userId, start, offset) => {
    return new Promise((resolve, reject) => {
      const TABLE_NAME = `explore${userId.toString()}`;
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
