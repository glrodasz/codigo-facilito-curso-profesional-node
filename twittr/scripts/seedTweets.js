const connection = require("../lib/connect");

const insertTweets = `INSERT INTO tweets (userId, content)
VALUES 
(1, 'This is my first tweet!'),
(1, 'This is my second tweet!'),
(1, 'I love coding'),
(1, 'Node.js is awesome'),
(1, 'Just finished my OpenAI project'),
(2, 'Hello Twitter!'),
(2, 'This is Jane\\'s second tweet!'),
(2, 'I love databases'),
(2, 'MySQL is great'),
(2, 'Just finished a database design project')`;

const printError = (msg) => (error) => {
  error && console.log(msg, error);
};

connection.connect((error) => {
  error && console.log("Error connecting to database", error);

  connection.query(insertTweets, printError("Error inserting tweets"));

  console.log("Inserting tweets done!");

  connection.end();
});
