const mongoose = require("mongoose");
const config = require("./default.json");
const db = config.mongoURI;

var DbConnection = () => {
  var database = null;

  var DbConnect = async () => {
    try {
      var connect = await mongoose.connect(db);
      console.log("MongoDB Connected...🎄");
      return connect;
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }
  };
  const GetDB = async () => {
    try {
      if (database != null) {
        console.log(`db connection is already alive`);
        return database;
      } else {
        console.log(`getting new db connection`);
        database = await DbConnect();

        return database;
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return {
    Get: GetDB,
  };
};

module.exports = DbConnection();
