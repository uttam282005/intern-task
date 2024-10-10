const express = require("express");
const app = express();
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const jwtPassword = "secret";
const { User, RealEstate } = require("./db");
const dummyRealEstateData = require("./dummydata");
const userMiddleware = require("./mddileware");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// app.get('/', async (req, res) => {
//   await RealEstate.insertMany(dummyRealEstateData);
//   res.send("done");
// });

app.post("/signup", (req, res) => {
  const username = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  console.log(email)

  // Check if the user already exists
  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ msg: "Email is already taken!" });
      }

      // If user does not exist, create new user
      const token = jwt.sign({ username }, jwtPassword);
      
        const newUser = new User({
          username,
          password,
          email
        });

        newUser
          .save()
          .then(() =>
            res.json({
              msg: "User created successfully!",
              token,
            })
          )
          .catch((err) =>{
            console.log(err)
            res.status(500).send("Something is up with the server!")
          }
          );
    })
    .catch((err) => {console.log(err);res.status(500).send("Error querying the database!")}); // Moved here
});

app.post("/signin", (req, res) => {
  // Moved outside of signup
  const { email, password } = req.body;

  // Find the user by username
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(400).json({ msg: "User not signed up" });
      }

      // Compare passwords
      const isMatch = password === user.password;
          if (!isMatch) {
            return res
              .status(400)
              .json({ msg: "Invalid password!" });
          }

          // If password is correct, sign the JWT token
          const token = jwt.sign({ email: user.email }, jwtPassword, {
            expiresIn: "1h",
          });

          res.json({
            msg: "Login successful!",
            token,
          });
        
    })
    .catch((err) => res.status(500).send("Error querying the database!"));
});

app.get("/real-estate", userMiddleware, async (req, res) => {
  try {
    // Fetch all real estate data from MongoDB
    const realEstateData = await RealEstate.find();

    // Send the fetched data as a JSON response
    res.json(realEstateData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching real estate data");
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
