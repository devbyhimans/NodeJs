const express = require("express");
const users = require("./MOCK_DATA.json");

const app=express();
const PORT =8000;

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

app.post('/api/users',(req,res)=>{
 //edit the user with id given
 return res.json({status: "pending"});
});

app.delete('/api/users/:id',(req,res)=>{
 //delete user with id given
  return res.json({status: "pending"});
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