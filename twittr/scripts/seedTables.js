const connection = require("../lib/connect");

const createUsersTable = `CREATE TABLE users (
	userId INT AUTO_INCREMENT,
	username VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	passwordHash VARCHAR(255) NOT NULL,
	creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	bio TEXT,
	location VARCHAR(255),
	PRIMARY KEY (userId)
  )`;

const createTweetsTable = `CREATE TABLE tweets (
	tweetId INT AUTO_INCREMENT,
	userId INT,
	content VARCHAR(280),
	creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (tweetId)
  )`;

const insertUsers = `INSERT INTO users (username, email, passwordHash, bio, location)
  VALUES 
  ('JohnDoe', 'johndoe@example.com', 'hashedpassword1', 'I love coding', 'New York'),
  ('JaneDoe', 'janedoe@example.com', 'hashedpassword2', 'I love databases', 'San Francisco')`;

const printError = (msg) => (error) => {
  error && console.log(msg, error);
};

connection.connect((error) => {
  error && console.log("Error connecting to database", error);

  connection.query(createUsersTable, printError("Error creating users table"));
  connection.query(
    createTweetsTable,
    printError("Error creating tweets table")
  );
  connection.query(insertUsers, printError("Error inserting users"));

  console.log("Creation tables and inserting users done!");

  connection.end();
});
