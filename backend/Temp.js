const dbConfig = require("./src/config/db.config");

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
    .connect(dbConfig.url)
    .then(() => {
        console.log("connection done with database");
    })
    .catch((err) => {
        console.log("error in db connection ", err);
        process.exit();
    });