const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.json());

var tasks = [];

app.get("/posts",(req,res) => {
    // console.log("received");
    // console.log(tasks)
    res.status(200).send(JSON.stringify(tasks));
})

app.post("/post",(req,res) => {
    // console.log("got it")
    var {task} = req.body;
    // console.log(req.body);
    tasks.push({task, completed: false, id: tasks.length});
    // console.log(tasks)
    res.status(200).json({message: "success"})
})

app.delete("/delete",(req,res) => {
    let {id} = req.body;
    var i = 0;
    // console.log(id);
    tasks.forEach(t => {
        if(t.id == id)
        {
            tasks.splice(i,1);
            return;
        }
        i++;
    })
    res.status(200).send(JSON.stringify(tasks));
})

app.put("/checkUncheck",(req,res) => {
    // console.log("check uncheck")
    let {id} = req.body;
    var i = 0;
    tasks.forEach(t => {
        if(t.id == id)
        {
            tasks[i].completed = !tasks[i].completed;
            return;
        }
        i++;
    })
    res.status(200).send(JSON.stringify(tasks));

})

app.listen(3000,() => {
    // console.log("listening to port 3000");
})