const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🔹 MongoDB Atlas connect
mongoose.connect(
  mongoose.connect("mongodb+srv://khasiyaankiyantaa:Ankita%402209@cluster0.xxxxx.mongodb.net/admissionDB")


)

.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// 🔹 Multer setup
const upload = multer({ dest: "uploads/" });

// 🔹 Schema (database structure)
const admissionSchema = new mongoose.Schema({
  fullname: String,
  dob: String,
  gender: String,
  email: String,
  mobile: String,
  course: String,
  address: String,
  photo: String
}); 

const Admission = mongoose.model("Admission", admissionSchema);

// 🔹 API
app.post("/submit", upload.single("photo"), async (req, res) => {

  const data = new Admission({
    fullname: req.body.fullname,
    dob: req.body.dob,
    gender: req.body.gender,
    email: req.body.email,
    mobile: req.body.mobile,
    course: req.body.course,
    address: req.body.address,
    photo: req.file.filename
  });

  await data.save();

  res.send("Form submitted & data saved in MongoDB");
});

// 🔹 Server start
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
