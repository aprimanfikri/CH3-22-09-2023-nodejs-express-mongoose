const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const mongoURI =
      "mongodb://localhost:27017/mencoba"
    const conn = await mongoose.connect(
      mongoURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    )
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectDB
