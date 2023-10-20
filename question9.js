const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;


const secretKey = 'YourSecretKey';


const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

app.use(bodyParser.json());


function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token verification failed' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Token not provided' });
  }
}


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ id: user.id, username: user.username }, secretKey, {
      expiresIn: '1h', 
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});


app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});