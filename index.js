const Gpio = require('onoff').Gpio
const led = new Gpio(17, 'out')

console.log('hi');

os = require('os');
const http = require('http');
const hostname = os.networkInterfaces()['wlan0'][0].address;
const port = 3000;
const server = http.createServer((req, res) => {
  if (req.url === '/?led=on') led.write(1);
  if (req.url === '/?led=off') led.write(0);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  
  res.write(/*html*/`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LED Demo</title>
</head>
<body>
  <h2>A simple LED control server</h2>
  <p>LED state: <a href="?led=on"> <button>ON</button></a>
<a href="?led=off"><button>OFF</button></a></p>
</body>
</html>  
  `)
  
  
    
  res.end();
});
 
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});