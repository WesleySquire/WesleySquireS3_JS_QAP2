// Author: Wesley Squire
// Date: 2022-02-03

// These are required
const http = require('http');
var fs = require('fs');
var events = require('events');
var eventEmitter = new events.EventEmitter();

// This creates server with a request and response
const server = http.createServer((req, res) => {
  // This sets the default path to our views folder for easy use
  let path = './views/';
  console.log(req.url, req.method);
  // The switch works with the expression req.url
  // It works by comparing the expression with each case.
  // It will execute the code block under a certain case if
  // The requirements are met, if not met it will execute the
  // default case.
  switch (req.url) {
    // When the url is / it will use the case /
    // It will execute this code. block underneath
    case '/':
      // path will add index.html onto itself
      path += 'index.html';
      // It will set results status code to 200
      res.statusCode = 200;
      // It will run the function fetch file from the path
      // we just set
      fetchFile(path);
      // Breaks from code block
      break;
    case 'black-bear':
      path += 'black.html';
      res.statusCode = 200;
      fetchFile(path);
      break;
    case 'grizzly-bear':
      path += 'grizzly.html';
      res.statusCode = 200;
      fetchFile(path);

      break;
    case 'panda-bear':
      path += 'panda.html';
      res.statusCode = 200;
      fetchFile(path);

      break;
    case 'polar-bear':
      path += 'polar.html';
      res.statusCode = 200;
      fetchFile(path);

      break;
    case 'sun-bear':
      path += 'sun.html';
      res.statusCode = 200;
      fetchFile(path);

      break;
    case 'conservation-efforts':
      path += 'conservation.html';
      res.statusCode = 200;
      fetchFile(path);
      break;
    // Setting the default page path to this error
    // website is great if someone puts something random or incorrect
    // in the search bar
    default:
      path += 'error404.html';
      res.statusCode = 404;
      fetchFile(path);
      break;
  }

  function fetchFile(path) {
    // Will use filesystem to read the path we set with the switch
    fs.readFile(path, function (err, data) {
      // If we get an error with the read file function
      if (err) {
        //It will log the error and end the response
        console.log(err);
        res.end();
      } else {
        // If there is no error it will log that the path was read
        console.log(`${path} was read.`);
        // This sends the status code which is set in the switch
        // to the request.
        res.writeHead(res.statusCode, {
          // This is the response headers
          'Content-Type': 'text/html',
        });
        // This ends the response
        res.end(data);
        // This logs our status code from our statusCodeEvent function
        eventEmitter.emit('status');
        // This logs if we're on home page from our homeEvent function
        eventEmitter.emit('home');
      }
    });
  }
  // This is pretty simple if the path is index it will log home page
  // If not we're not home
  var homeEvent = function () {
    if (path == './views/index.html') {
      console.log('You are on the home page!');
    } else {
      console.log('Youre not home!');
    }
  };
  var statusCodeEvent = function () {
    console.log(`Status Code: ${res.statusCode}`);
  };
  // I used the .once method because it would internally store
  // and print 10 of the status codes over time. So using the
  // once method the old listener is removed and uses the new
  // listener
  eventEmitter.once('status', statusCodeEvent);
  eventEmitter.on('home', homeEvent);
});

// This makes our server run on localhost:3000 url
server.listen(3000, 'localhost', () => {
  console.log();
  console.log('listening on port 3000.');
});
