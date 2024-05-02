const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors"); // cross origin resource sharing
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require("mongoose");
const uri = process.env.DATABASE_URL; // Retrieve database URL from environment

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
  // finally {
  //     // await mongoose.disconnect();
  //     console.error("Error connecting to MongoDB:", error);
  // }
}

run().catch(console.dir);

app.use("/api/subject", require("./src/subject/subject.routes"));
app.use("/api/unit", require("./src/unit/unit.routes"));

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
