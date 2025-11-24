const http = require("http");
const fs = require("fs");

const url = require("url");

// Ek HTTP server create kar rahe hain jo har request ka response handle karega
const myserver = http.createServer((req, res) => {
 if(req.url=="/favicon.ico") return res.end();

 const myurl = url.parse(req.url, true); // true → parse query parameters
  console.log(myurl);

  // Log URL object properly
  fs.appendFile("url_data.txt", JSON.stringify(myurl) + "\n", (err) => {
    if (err) console.log("Error writing URL data:", err);
  });


  // Har baar jab koi request aaye, hum ek log create karte hain timestamp ke saath
  const log = `${Date.now()}: ${req.url} New request received\n`;

  // 'log.txt' file me log ko append kar rahe hain (agar file nahi hogi to create ho jayegi)
  fs.appendFile("log.txt", log, (err, data) => {

    // Yaha hum URL ke hisab se decide kar rahe hain ki kya response bhejna hai
    switch (myurl.pathname) {

      // Agar user root route "/" pe aaye
      case '/':
        res.end("Hello from server");
        break;

      // Agar user "/about" route pe aaye
      case '/about':
        const username = myurl.query.myname
        res.end(`hi, ${username}`);
        break;

      // Agar koi unknown route ho to 404 message bhejenge
      default:
        res.end("404 Not Found");
    }

  });
});

// Server ko port 8000 par listen karwa rahe hain
// Jab server start ho jayega to console me message show hoga
myserver.listen(8000, () => {
  console.log("Server Started!");
});
