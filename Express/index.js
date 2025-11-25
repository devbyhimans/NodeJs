// Import the Express framework
const express = require("express");

// Create an Express application (app)
// 'app' will be used to define routes and server behavior.
//This app is basically same as that handler function in our http
const app = express();

//**->express internally uses http and save us from pain and mannual labour of building everything from scratch


// --------------------------------------------
// ROUTE: Home Page
// METHOD: GET
// PATH: '/'
// This route runs when someone visits http://localhost:8000/
// --------------------------------------------
app.get('/', (req, res) => {

  // Send a simple text response to the client
  return res.send('This is home page');
});


// --------------------------------------------
// ROUTE: About Page
// METHOD: GET
// PATH: '/about'
// Example request: http://localhost:8000/about?name=John&age=20
//
// req.query → holds data from URL query parameters
// Example: ?name=John&age=20
// req.query.name → "John"
// req.query.age → "20"
//
// We respond using these values.
// --------------------------------------------
app.get("/about", (req, res) => {

  // Access query parameters sent in the URL
  const name = req.query.name;
  const age = req.query.age;

  // Send a dynamic response using values from the query
  return res.send(
    "Hello from about page" +
    " hey " + name +
    " you are " + age
  );
});


// --------------------------------------------
// Start the server on port 8000
// The callback function runs once the server starts successfully.
// --------------------------------------------
app.listen(8000, () => {
  console.log("Server Started!");
});
