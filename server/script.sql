/*User table*/

CREATE TABLE user(userId INT NOT NULL AUTO_INCREMENT,
				  fullName VARCHAR(30) NOT NULL, 
                  userName  VARCHAR(15) NOT NULL UNIQUE, 
                  email     VARCHAR(50) NOT NULL UNIQUE, 
                  password  VARCHAR(1000) NOT NULL,
				  PRIMARY KEY(userId));
                  
CREATE TABLE follow(userId INT NOT NULL,
					followerId INT NOT NULL,
                    dateAndTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    PRIMARY KEY(userId, followerId),
                    FOREIGN KEY (userId) 
						REFERENCES user (userId)
						ON DELETE CASCADE,
					FOREIGN KEY (followerId) 
						REFERENCES user (userId)
						ON DELETE CASCADE);

/*Creating new database user*/

CREATE USER 'instagram_clone'@'localhost' IDENTIFIED BY 'instagram_clone';
GRANT ALL PRIVILEGES ON instagram_clone.* TO 'instagram_clone'@'localhost';
ALTER USER 'instagram_clone'@'localhost' IDENTIFIED WITH mysql_native_password BY 'instagram_clone';