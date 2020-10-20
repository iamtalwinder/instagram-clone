module.exports = {
  getUserProfile: (con, signedInUser, userToFind) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
          user.userId,
          user.fullname,
          user.userName,
          user.dpPath,
          user.dateAndTime AS joinedOn,
          followers.followers,
          following.following,
          posts.posts,
          follow.userId AS isFollowing
        FROM
          user
            INNER JOIN
          followers ON user.userId = followers.userId
            AND user.userId = ${userToFind}
            INNER JOIN
          following ON user.userId = following.userId
            INNER JOIN
          (SELECT 
              COUNT(*) AS posts 
          FROM 
              post 
          WHERE 
              userId = ${userToFind}) AS posts
		        LEFT JOIN
	        follow ON follow.userId = ${userToFind} AND follow.followerId = ${signedInUser} 
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  getUserById: (con, userId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
          * 
        FROM 
          user 
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

  getUserByEmail: (con, email) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
          * 
        FROM 
          user 
        WHERE 
          email = "${email}"
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  getUserByUserName: (con, userName) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
          * 
        FROM 
          user 
        WHERE 
          userName = "${userName}"
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  createUser: (con, fullName, userName, email, password) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        INSERT INTO user 
          (fullName, userName, email, password) 
        VALUES 
          ("${fullName}", "${userName}", "${email}", "${password}")
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  changeDP: (con, userId, dpPath) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        UPDATE user
        SET dpPath = "${dpPath}"
          WHERE userId = ${userId}
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  removeDP: (con, userId) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        UPDATE user
        SET dpPath = null
          WHERE userId = ${userId}
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },
};
