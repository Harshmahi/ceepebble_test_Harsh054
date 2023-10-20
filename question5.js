const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/echo', (req, res) => {
  const jsonData = req.body; 
  res.json(jsonData); 
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});