module.exports = {
  getUserProfile: (con, signedInUser, userToFind) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
          user.userId,
          user.fullname,
          user.username,
          user.dpPath,
          user.dateAndTime AS joinedOn,
          user.website,
          user.bio,
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
          userId,
          fullname,
          username,
          email,
          password,
          dpPath,
          website,
          bio,
          phoneNumber,
          dateAndTime AS joinedOn
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
          userId,
          fullname,
          username,
          email,
          password,
          dpPath,
          website,
          bio,
          phoneNumber,
          dateAndTime AS joinedOn 
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

  getUserByUsername: (con, username) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT 
          userId,
          fullname,
          username,
          email,
          password,
          dpPath,
          website,
          bio,
          phoneNumber,
          dateAndTime AS joinedOn
        FROM 
          user 
        WHERE 
          username = "${username}"
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  findUsers: (con, user) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        SELECT DISTINCT
          user.userId, user.username, user.fullname, user.dpPath
        FROM
          user
            INNER JOIN
          followers ON followers.userId = user.userId
            AND user.username LIKE '${user}%'
            OR user.fullname LIKE '${user}%'
        ORDER BY followers.followers
        LIMIT 20
        `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  findOtherUserWithSameField: (con, userId, field, value) => {
    return new Promise((resolve, reject) => {
      con.query(
        `SELECT 
          ${field}
        FROM
          user
        WHERE
          userId != ${userId}
          AND ${field} = "${value}";
      `,
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });
  },

  createUser: (con, fullname, username, email, password, userId) => {
    let query = `
    INSERT INTO user 
      (fullname, username, email, password) 
    VALUES 
      ("${fullname}", "${username}", "${email}", "${password}")
    `;

    if (userId) {
      query = `
      INSERT INTO user 
        (userId, fullname, username, email, password) 
      VALUES 
        (${userId}, "${fullname}", "${username}", "${email}", "${password}")
      `;
    }

    return new Promise((resolve, reject) => {
      con.query(query, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
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

  updateProfile: (
    con,
    userId,
    fullname,
    username,
    website,
    bio,
    email,
    phoneNumber
  ) => {
    return new Promise((resolve, reject) => {
      con.query(
        `
        UPDATE user
        SET 
            fullname="${fullname}",
            username="${username}",
            website=${typeof website === "string" ? `"${website}"` : website},
            bio=${typeof bio === "string" ? `"${bio}"` : bio},
            email="${email}",
            phoneNumber=${phoneNumber}
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
