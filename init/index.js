const mongoose = require("mongoose");
const initData = require("./data.js")
const Listing = require("../models/listing.js");


main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj, owner: '692493524d47fd190f283c2c'
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
  }catch(err) {
    console.log("error in inserting data");
    console.log(err);
  }     
};

initDB();