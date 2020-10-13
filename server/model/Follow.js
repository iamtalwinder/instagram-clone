module.exports = {
  getFollow: (con, userId, followerId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT
            * 
        FROM
          follow
        WHERE
          userId=${userId}
        AND
          followerId=${followerId}
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  follow: (con, userId, followerId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        INSERT INTO follow 
            (userId, followerId) 
        VALUES 
            (${userId}, ${followerId})
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  unFollow: (con, userId, followerId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        DELETE FROM follow 
        WHERE 
            userId = ${userId} AND followerId = ${followerId}
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  followersCount: (con, userId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
            COUNT(followerId) 
        FROM 
            follow 
        WHERE 
            userId = ${userId}
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  followers: (con, userId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
            userId, fullName, userName
        FROM
            user
        WHERE
            userId IN (SELECT 
                followerId
            FROM
                follow
            WHERE
                userId = ${userId})
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  followingCount: (con, userId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
            COUNT(userId) 
        FROM 
            follow 
        WHERE 
            followerId = ${userId}
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  following: (con, userId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
            userId, fullName, userName
        FROM
            user
        WHERE
            userId IN (SELECT 
                userId
            FROM
                follow
            WHERE
                followerId = ${userId})
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
