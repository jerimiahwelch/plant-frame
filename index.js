const Gpio = require('onoff').Gpio
const led1 = new Gpio(17, 'out')
const led2 = new Gpio(27, 'out')
const led3 = new Gpio(22, 'out')


os = require('os');
const http = require('http');
const hostname = os.networkInterfaces()['wlan0'][0].address;
const port = 3000;

// Turn on LEDs on first boot
for (const led of [led1, led2, led3]) {
  led.write(1)
}

const server = http.createServer((req, res) => {
  console.log(req);
  const pathsearch = req.url
    if (pathsearch === '/?led1=on') led1.write(1);
    if (pathsearch === '/?led1=off') led1.write(0);
    
    if (pathsearch === '/?led2=on') led2.write(1);
    if (pathsearch === '/?led2=off') led2.write(0);
    
    if (pathsearch === '/?led3=on') led3.write(1);
    if (pathsearch === '/?led3=off') led3.write(0);


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
<style>
  button, input {
    height: 3rem;
    min-width: 8rem;
    margin: 0.5rem;
  }
</style>
  <h2>A simple LED control server</h2>
  <p></p>
  <p>
    LED 1
    <a href="?led1=on"> <button>ON</button></a>
    <a href="?led1=off"><button>OFF</button></a>
  </p>
  <p>
    LED 2
    <a href="?led2=on"> <button>ON</button></a>
    <a href="?led2=off"><button>OFF</button></a>
  </p>
  <p>
    LED 3
    <a href="?led3=on"> <button>ON</button></a>
    <a href="?led3=off"><button>OFF</button></a>
  </p>
</body>
</html>  
  `)
  
  res.end();
});
 
 
server.listen(port, hostname, () => {
  console.log(`LEO's led server running at http://${hostname}:${port}/`);
});