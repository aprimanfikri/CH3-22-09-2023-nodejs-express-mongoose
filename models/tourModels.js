const mongoose = require("mongoose")

const mongoURI =
  "mongodb://localhost:27017/mencoba"
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection established")
  })
  .catch((err) => {
    console.error(
      "Error connecting to the database:",
      err
    )
  })

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true,
      "The name of the tour is required",
    ],
    unique: [
      true,
      "The name of the tour is already exist",
    ],
  },
  rating: {
    type: Number,
    default: 4,
  },
  price: {
    type: Number,
    required: [
      true,
      "The price of the tour is required",
    ],
  },
})

const Tour = mongoose.model("Tour", tourSchema)

module.exports = Tour
