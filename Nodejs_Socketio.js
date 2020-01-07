var express = require('express')
var app = express()

app.use(express.static("./Public"))
app.set("view engine","ejs");
app.set("views","./views")
var server = require("http").Server(app);
var io = require("socket.io")(server);

// Code io
var userArray=[]
io.on("connection",function(socket){
    console.log("Some One Connected" + socket.id);
    socket.on("Client-Send-Username",function(data){
        if(userArray.indexOf(data)>=0){
            //dk that bai
            socket.emit("Server-send-dk-thatbai")
            
        }else{
            //dkthanh cong
            userArray.push(data);
            //tao username cho socket
            socket.username = data;
            socket.emit("Server-send-dk-thanhcong",data);
            io.sockets.emit("Server-send-ds-user",userArray)
        }
    socket.on("logout",function(){
        userArray.splice(userArray.indexOf(socket.username),1);
        socket.broadcast.emit("Server-send-ds-user",userArray)
    })
    socket.on("user-send-message",function(data){
        io.sockets.emit("Server-send-message",{username: socket.username, nd:data})
    })

        //Trả Về Tất Cả Client
        // io.sockets.emit("Server-send-data",data+" back");

        //Trả về Chính Mình
        // socket.emit("Server-send-data",data+" back");

        //Trả Về Cho Những người khác ngoài mình.
        // socket.broadcast.emit("Server-send-data",data+" back");
    })
})
const PORT = 3000 || process.env.PORT;
app.get('/',(req,res)=>{
    res.render("home")
})
server.listen(PORT,function(){
    console.log("Allready Running On " + PORT);
})