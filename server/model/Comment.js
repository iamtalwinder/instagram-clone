module.exports = {
  getCommentByCommentId: (con, commentId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
            *
        FROM
          comment
        WHERE
          commentId = ${commentId}
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
            comment.dateAndTime,
            user.userName
        FROM
            comment
                INNER JOIN
            user
        WHERE
            comment.userId = user.userId
                AND comment.postId = "${postId}"
        ORDER BY dateAndTime DESC
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

  deleteComment: (con, commentId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        DELETE FROM comment
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
};
