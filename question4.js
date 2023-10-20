const http = require('http');

function httpGet(url, callback) {
  http.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      callback(null, data);
    });
  }).on('error', (error) => {
    callback(error, null);
  });
}

httpGet('http://example.com', (error, responseBody) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Response body:', responseBody);
  }
});