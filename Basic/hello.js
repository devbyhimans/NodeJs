console.log("Hey i m js");   

// const oper = require("./math");

// console.log("Addition :",oper.add(2,4));
// console.log("Subraction :",oper.sub(2,4));


//destructuring
const {add,sub} = require("./math");

console.log("Addition :",add(2,4));
console.log("Subraction :",sub(2,4));