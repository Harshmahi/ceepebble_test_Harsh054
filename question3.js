const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {

  res.setHeader('Content-Type', 'text/html');
  res.send('<html><body><h1>Hello Express!</h1></body></html>');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});