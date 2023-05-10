import mongoose from "mongoose";

const { DB_URL="mongodb://127.0.0.1:27017/products" } = process.env;

console.log(DB_URL)

// main.catch((err) => logger.error(err));

async function main() {
  try {
    await mongoose.connect(DB_URL);
    console.log("DB Connected");
  } catch (err) {
    console.log('mongo error', err);
  }
}

export default main;