const fs = require("fs");

//Sync...
//fs.writeFileSync('./test.txt','hey there its himanshu')

//Async..always expects a callback
//fs.writeFile('./test.txt','hey there its himanshu\n',(err)=>{});

//Sync.. returns the value
const result1 = fs.readFileSync('./contact.txt','utf-8');
console.log(result1);


//Async ..does not return anything it expects a callback (arr,result) and fills it 
fs.readFile('./contact.txt','utf-8',(err,result2)=>{
 if(err){
  console.log("Error",err);
 }else{
 console.log(result2);
 }
});


fs.appendFileSync('./test.txt',`${Date.now()}Hey there\n`);