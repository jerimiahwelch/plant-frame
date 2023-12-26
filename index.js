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
  res.write('<h2>A simple LED control server <br>with Onion Omega2+</h2>');
  res.write('<p>LED state: <a href="?led=on"> <button>ON</button></a>');
  res.write('  <a href="?led=off"><button>OFF</button></a></p>');
  res.end();
});
 
 
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});