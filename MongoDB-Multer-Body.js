const express = require("express");
const app = express();

//Setup For Body-Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

//Setup For Static Folder
app.use(express.static("publicMongodb"));

//Setup for Multer
const multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "publicMongodb/imagesUpload");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    if (
      file.mimetype == "image/bmp" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only image are allowed"));
    }
  }
}).array("singleImage",10);//10 is maximum file

//Setup For EJS Engine
app.set("view engine", "ejs");
app.set("views", "./views");

//Setup For Mongoose
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://LeQuangThach:lequangthach95@clustersthachhaclong-3t8fn.mongodb.net/test?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true },
  function(error) {
    if (!error) {
      console.log("Connect MongoDB Successfully");
    } else {
      console.log("Connection Error " + error);
    }
  }
);

const Book = require("./publicMongodb/models/book");

app.get("/", (req, res) => {
  Book.find(function(error, data) {
    if (error) {
      console.log("Get Book List Err " + error);
      res.json({ kq: 0 });
    } else {
      console.log("Get Book Successfully ");
      console.log(data);
      res.render("Book.ejs", { data: data });
    }
  });
});
//Using get method for add new book
// app.get("/addBook/:type/:title/:author/:price/:image", (req, res) => {
//   var book = new Book({
//     type: req.params.type,
//     title: req.params.title,
//     author: req.params.author,
//     price: req.params.price,
//     image: req.files
//   });
//   book.save(function(err) {
//     if (err) {
//       console.log("Cant Not Save");
//       res.json({
//         kq: 0
//       });
//     } else {
//       console.log("Save Successfully");
//       res.json({
//         kq: 1
//       });
//     }
//   });
// });

//Using POST method for add new book
app.post("/addBook", (req, res) => {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      console.log("A Multer error occrred when uploading");
    } else if (err) {
      console.log("An unknown error occurred when uploading " + err);
    } else {
      console.log("Upload Book Image  Successfully");
      let imagesArray = [];
      req.files.forEach(image=>{
        imagesArray.push(image.originalname)
      })
      console.log(imagesArray);
      var book = new Book({
        type: req.body.type,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        image: imagesArray
      });
      book.save(function(err) {
        if (err) {
          console.log("Cant Not Save");
          res.json({
            kq: 0
          });
        } else {
          console.log("Save Successfully");
          res.redirect("/");
          //   res.json({
          //     kq: 1
          //   });
        }
      });
    }
  });
});

app.listen(3000, "localhost", () => {
  console.log("Running on port " + 3000);
});
