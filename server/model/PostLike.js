module.exports = {
  getLike: (con, userId, postId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
            * 
        FROM
            postLike
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

  getLikers: (con, postId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
            postLike.*,
            user.userName 
        FROM
            postLike
                INNER JOIN
            user
        WHERE
            postLike.userId = user.userId
                AND postLike.postId = "${postId}"
        ORDER BY dateAndTime DESC   
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  createLike: (con, userId, postId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        INSERT INTO postLike
            (userId, postId)
        VALUES
            (${userId}, "${postId}")
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  deleteLike: (con, userId, postId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        DELETE FROM postLike
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
};
