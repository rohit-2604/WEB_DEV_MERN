const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose
    .connect(DB)
    .then(() => console.log("DATABASE CONNECTION SUCCESSFUL....."))
    .catch((err) => console.log(`DATABASE Not Connect........${err}`));
