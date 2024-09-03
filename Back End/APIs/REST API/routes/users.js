const express = require("express");
const router = express.Router();
const user_documents = require("../models/user_schema");

//get all
router.get("/", async (req, res) => {
  try {
    const users = await user_documents.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//post one
router.post("/", async (req, res) => {
    const user = new user_documents({
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        contact_number: req.body.contact_number,
        status: req.body.status,
    })   
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//Middleware for finding users with ID
async function get_user(req, res, next) {
    let user;
    try {
      user = await user_documents.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "Cannot find user" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
    res.user = user;
    next();
  }
  
//get one
router.get("/:id", get_user, async (req, res) => {
    try {
      const { name, gender, age, email, password, contact_number, status } = res.user;
      res.json({ name, gender, age, email, password, contact_number, status });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });  
//update one
router.patch('/:id', get_user, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    try {
        const updated_user = await res.user.save();
        res.json(updated_user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//delete one
router.delete("/:id", get_user, async (req, res) => {
    try {
      await res.user.deleteOne();
      res.json({ message: "User Deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
module.exports = router;
