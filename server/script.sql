CREATE TABLE user (
    userId  BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    fullname VARCHAR(30) NOT NULL,
    username VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(1000) NOT NULL,
    dpPath VARCHAR(70) DEFAULT NULL,
    dateAndTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userId)
);

ALTER TABLE user
ADD website VARCHAR(30) DEFAULT NULL,
ADD bio VARCHAR(100) DEFAULT NULL,
ADD phoneNumber VARCHAR(10) UNIQUE DEFAULT NULL;

CREATE TABLE follow (
    userId BIGINT UNSIGNED NOT NULL,
    followerId BIGINT UNSIGNED NOT NULL,
    dateAndTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userId , followerId),
    FOREIGN KEY (userId)
        REFERENCES user (userId)
        ON DELETE CASCADE,
    FOREIGN KEY (followerId)
        REFERENCES user (userId)
        ON DELETE CASCADE
);
					
CREATE TABLE post (
    postId VARCHAR(50) NOT NULL,
    userId BIGINT UNSIGNED NOT NULL,
    path VARCHAR(70) NOT NULL,
    caption VARCHAR(100) NOT NULL,
    dateAndTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (postId),
    FOREIGN KEY (userId)
        REFERENCES user (userId)
        ON DELETE CASCADE
);

CREATE TABLE comment (
	commentId VARCHAR(50) NOT NULL,
    postId VARCHAR(50) NOT NULL,
    userId BIGINT UNSIGNED NOT NULL,
    comment VARCHAR(100) NOT NULL,
    dateAndTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (commentId),
    FOREIGN KEY (postId)
		REFERENCES post(postId)
        ON DELETE CASCADE,
    FOREIGN KEY (userId)
        REFERENCES user (userId)
        ON DELETE CASCADE
);

CREATE TABLE postLike (
	userId BIGINT UNSIGNED NOT NULL,
    postId VARCHAR(50) NOT NULL,
    dateAndTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userId, postId),
    FOREIGN KEY (userId)
        REFERENCES user (userId)
        ON DELETE CASCADE,
    FOREIGN KEY (postId)
		REFERENCES post(postId)
        ON DELETE CASCADE
);

/*Below are the tables to store aggregate information*/

CREATE TABLE postLikes (
	postId VARCHAR(50) NOT NULL,
    likes INT UNSIGNED NOT NULL DEFAULT 0,
    PRIMARY KEY(postId),
    FOREIGN KEY (postId)
		REFERENCES post(postId)
        ON DELETE CASCADE
);

CREATE TABLE comments (
	postId VARCHAR(50) NOT NULL,
    comments INT UNSIGNED NOT NULL DEFAULT 0, 
    PRIMARY KEY(postId),
    FOREIGN KEY (postId)
		REFERENCES post(postId)
        ON DELETE CASCADE
);

CREATE TABLE followers (
	userId BIGINT UNSIGNED NOT NULL,
    followers INT UNSIGNED NOT NULL DEFAULT 0, 
    PRIMARY KEY(userId),
    FOREIGN KEY (userId)
		REFERENCES user(userId)
        ON DELETE CASCADE
);

CREATE TABLE following (
	userId BIGINT UNSIGNED NOT NULL,
    following INT UNSIGNED NOT NULL DEFAULT 0, 
    PRIMARY KEY(userId),
    FOREIGN KEY (userId)
		REFERENCES user(userId)
        ON DELETE CASCADE
);

SET autocommit = 0;

/*Creating new database user*/

CREATE USER 'instagram_clone'@'localhost' IDENTIFIED BY 'instagram_clone';
GRANT ALL PRIVILEGES ON instagram_clone.* TO 'instagram_clone'@'localhost';
ALTER USER 'instagram_clone'@'localhost' IDENTIFIED WITH mysql_native_password BY 'instagram_clone';