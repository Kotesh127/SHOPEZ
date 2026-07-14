require("dotenv").config();

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Product = require("./models/Product");

const products = [];

const csvFilePath = path.join(__dirname, "data", "amazon-products.csv");

const importData = async () => {
  try {
    await connectDB();

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        products.push({
          name: row.title || "Unknown Product",

          description:
            row.description || "No description available",

          category:
            row.categories
              ? row.categories.split("|")[0]
              : "General",

          brand: row.brand || "Unknown",

          price:
            Number(row.final_price) ||
            Number(row.initial_price) ||
            999,

          stock: Math.floor(Math.random() * 91) + 10,

          image: row.image_url || "",
        });
      })

      .on("end", async () => {
        try {
          console.log(`Read ${products.length} products`);

          await Product.deleteMany();

          await Product.insertMany(products);

          console.log("==================================");
          console.log(`${products.length} Products Imported`);
          console.log("==================================");

          mongoose.connection.close();
          process.exit();
        } catch (err) {
          console.error(err);
          process.exit(1);
        }
      });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

importData();