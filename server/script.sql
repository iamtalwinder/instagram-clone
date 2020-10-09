/*User table*/

CREATE TABLE user(userId INT NOT NULL AUTO_INCREMENT,
				  fullName VARCHAR(30) NOT NULL, 
                  userName  VARCHAR(15) NOT NULL, 
                  email     VARCHAR(50) NOT NULL UNIQUE, 
                  password  VARCHAR(1000) NOT NULL,
				  PRIMARY KEY(userId));

/*Creating new database user*/

CREATE USER 'instagram_clone'@'localhost' IDENTIFIED BY 'instagram_clone';
GRANT ALL PRIVILEGES ON instagram_clone.* TO 'instagram_clone'@'localhost';
ALTER USER 'instagram_clone'@'localhost' IDENTIFIED WITH mysql_native_password BY 'instagram_clone';