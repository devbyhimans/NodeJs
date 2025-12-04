const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");

const app=express();
const PORT =8000;

//Middleware->whenever we get form data this middleware puts that data into body.
// 1. For parsing application/x-www-form-urlencoded (HTML Forms)
app.use(express.urlencoded({ extended: false }));

// 2. For parsing application/json (Postman / React / Axios)
app.use(express.json());  //

//rendering a HTML document to this path
app.get('/users',(req,res)=>{
 const html=`
  <ul>
   ${users.map((user)=>`<li>${user.first_name}</li>`).join("")}
  </ul>
 `
 res.send(html);
})

app.get('/api/users',(req,res)=>{
 return res.json(users);
});


//Dynamic path Parameter

app.get('/api/users/:id',(req,res)=>{
 const id = Number(req.params.id);
 const user = users.find((user)=>user.id == id);
 return res.json(user);
});

//add users-->get the user through POST using POSTMAN
app.post('/api/users',(req,res)=>{
    //body contains the data sent from the frontend
    const body = req.body;
    console.log("Body: ",body);

    //adding data to the users
    users.push({...body,id:users.length+1});
    fs.writeFileSync("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
    return res.json("Data added successfully",body);
    })
});

//edit the user with given id
app.patch('/api/users',(req,res)=>{
    //body contains the data sent from the frontend
    const id = Number(req.body.id);
    console.log(id);
    const body =req.body;
    const userIndex = users.findIndex((user)=>user.id == id);

    if(userIndex==-1){
      return res.status(404).json({status:"error",message:"user not found"});  
    }
    console.log("id: ",id);

    // Update the user object
    // We merge the existing user data (...users[userIndex]) 
    // with the new data (...body). The body fields overwrite the old ones.
    const updatedUser = { ...users[userIndex], ...body };
    users[userIndex] = updatedUser;

    // Writing the updated array back to the file
    fs.writeFileSync("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        if (err) {
            return res.json({ status: "error", message: err });
        }
        return res.json({ status: "Success", user: updatedUser });
    })
});

app.delete('/api/users/:id',(req,res)=>{
    const id = Number(req.params.id);
    console.log(id);

    //delete user with id given
    const userIndex = users.findIndex((user)=>user.id == id);
    if(userIndex==-1){
        return res.status(404).json({status:"error",message:"user not found"});  
    }

    // Remove the user from the array
    // .splice(startIndex, deleteCount) -> removes 1 element at the found index
    const deletedUser = users.splice(userIndex,1)[0];
    // Get the first element (index 0) of the returned array,basically return the deleteduser to the client

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "Success", message: "User Deleted", deletedUser: deletedUser });
    });

});

/*---modern way to write routes having same path--

app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        if (!user) return res.status(404).json({ error: "User not found" });
        return res.json(user);
    })
    .patch((req, res) => {
        // Changed from POST to PATCH, as we are editing a specific user by ID
        // Logic to edit the user with the id given would go here
        const id = Number(req.params.id);
        return res.json({ status: "pending", message: `User ${id} updated` });
    })
    .delete((req, res) => {
        // Logic to delete user with id given
        const id = Number(req.params.id);
        return res.json({ status: "pending", message: `User ${id} deleted` });
    });

*/

//Routes

app.listen(PORT,()=>console.log(`server start at ${PORT}`))