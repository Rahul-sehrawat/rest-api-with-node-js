const express = require('express')
const users = require("./MOCK_DATA.json")
const fs = require('fs')

const app = express()
const PORT = 3000


app.use(express.urlencoded({extended:false})) // this middleware is for encoded form request
app.use(express.json()) // this middleware is for json request

//custom middleware
app.use((req,res,next)=>{
    fs.appendFile("log.txt",`\n ${Date.now()}: ${req.method}: ${req.path}`,(err,data)=>{
        next()
    })
})

app.get("/",(req,res)=>{
    res.end(" hello rahul !!!")
})

app.get("/api/users",(req,res)=>{
    res.json(users)
})

app.get("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user)=>user.id === id)
    return res.json(user)
})

app.post("/api/users",(req,res)=>{
    const body = req.body;
    console.log(body)
    users.push({...body,id:users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"success",id:users.length})
    })
})



app.listen(PORT,()=> console.log("app started"))