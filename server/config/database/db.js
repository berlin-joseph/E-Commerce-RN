const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`Mongodb is connected host:${process.env.MONGO_URI}`);
    })
    .catch((error) => console.log(error.message));
};

module.exports = connectDatabase;
