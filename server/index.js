const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const multer = require('multer');
const path = require('path');



const app = express();
app.use(bodyParser.json())
app.use(cors())

mongoose.connect("mongodb://0.0.0.0:27017/DEALSDRAY")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const userSchema = new mongoose.Schema({
  f_sno: Number,
  f_userName: String,
  f_Pwd: String
});
const userModel = mongoose.model("t_login", userSchema);

app.get("/getUser", (req, res) => {
  userModel.find({}).then(function (t_login) {
    res.json(t_login);
  }).catch(function (err) {
    console.log(err);
    res.status(500).send("Error retrieving users");
  });
});

app.post("/addUser", (req, res) => {
    const { f_sno, f_userName, f_Pwd } = req.body;
  
    // Ensure all required fields are present
    if (f_sno === undefined || f_userName === undefined || f_Pwd === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    // Convert f_sno to integer
    const sno = parseInt(f_sno);
  
    // Create a new user instance
    const newUser = new userModel({
      f_sno: sno,
      f_userName,
      f_Pwd
    });
  
    // Save the user to the database
    newUser.save()
      .then((user) => {
        res.status(201).json(user); // Respond with the newly created user
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error creating user");
      });
  });
// Login route
app.post("/login", async (req, res) => {
    const { f_userName, f_Pwd } = req.body;
  
    try {
      // Check if the user exists in the database
      const user = await userModel.findOne({ f_userName, f_Pwd });
  
      if (user) {
        return res.status(200).send("Login successful");
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (err) {
      console.error("Error:", err);
      return res.status(500).send("Internal Server Error");
    }
  }); 

  const employeeSchema = new mongoose.Schema({
    f_Id: { type: String, required: true },
    f_Image: { type: String, required: true },
    f_Name: { type: String, required: true },
    f_Email: { type: String, required: true },
    f_Mobile: { type: String, required: true },
    f_Designation: { type: String, required: true },
    f_gender: { type: String, required: true },
    f_Course: { type: String, required: true },
    f_Createdate: { type: Date, default: Date.now }
  });
  
  const Employee = mongoose.model("Employee", employeeSchema);
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  });
  
  const upload = multer({ storage: storage });
  
  app.post('/addEmployee', upload.single('f_Image'), async (req, res) => {
    try {
      const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
      const newEmployee = new Employee({
        f_Id,
        f_Image: req.file.path,
        f_Name,
        f_Email,
        f_Mobile,
        f_Designation,
        f_gender,
        f_Course
      });
      await newEmployee.save();
      res.status(201).json({ message: "Employee added successfully" });
    } catch (error) {
      console.error("Error adding employee:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
