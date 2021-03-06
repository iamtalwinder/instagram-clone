module.exports = {
  getComment: (con, userId, commentId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
            *
        FROM
          comment
        WHERE
          userId = ${userId}
        AND
          commentId = "${commentId}"
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  getCommentByCommentId: (con, commentId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
            *
        FROM
          comment
        WHERE
          commentId = "${commentId}"
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  getCommentsByPostId: (con, postId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
            comment.commentId,
            comment.userId,
            comment.comment,
            comment.dateAndTime AS commentedOn,
            user.username,
            user.dpPath
        FROM
            comment
                INNER JOIN
            user
        WHERE
            comment.userId = user.userId
                AND comment.postId = "${postId}"
        ORDER BY commentedOn DESC
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  createComment: (con, commentId, postId, userId, comment) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
          INSERT INTO comment
            (commentId, postId, userId, comment) 
          VALUES 
            ("${commentId}", "${postId}", ${userId}, "${comment}")
          `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  deleteComment: (con, userId, commentId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        DELETE FROM comment
        WHERE
          userId = ${userId}  
        AND 
          commentId = "${commentId}"
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
