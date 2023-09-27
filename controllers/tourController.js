const fs = require("fs")
const Tour = require("../models/tourModels")

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/../dev-data/data/tours-simple.json`
  )
)

const checkId = (req, res, next, val) => {
  const tour = tours.find(
    (el) => el.id === val * 1
  )
  if (!tour) {
    return res.status(404).json({
      status: "failed",
      message: `data with ${val} this not found`,
    })
  }
  next()
}

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "failed",
      message: `name or price are required`,
    })
  }
  next()
}

const editTour = (req, res) => {
  const id = req.params.id * 1
  // findIndex = -1 (kalau data nya gk ada)
  const tourIndex = tours.findIndex(
    (el) => el.id === id
  )

  tours[tourIndex] = {
    ...tours[tourIndex],
    ...req.body,
  }
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        message: `tour with this id ${id} edited`,
        data: {
          tour: tours[tourIndex],
        },
      })
    }
  )
}

const removeTour = (req, res) => {
  // konversi string jadi number
  const id = req.params.id * 1

  // cari index dari data yg sesuai id di req.params
  const tourIndex = tours.findIndex(
    (el) => el.id === id
  )

  // proses mengahpus data sesuai index array nya => req.params.id
  tours.splice(tourIndex, 1)

  // proses update di file json nya
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({
        status: "success",
        message: "berhasil delete data",
        data: null,
      })
    }
  )
}

const createTour = async (req, res) => {
  try {
    const newData = await Tour.create(req.body)
    res.status(201).json({
      status: "success",
      data: {
        tour: newData,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    })
  }
}

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find()
    res.status(200).json({
      status: "success",
      data: {
        tours,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
      data: null,
    })
  }
}

const updateTour = async (req, res) => {
  try {
    const updatedTour =
      await Tour.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      )
    if (!updatedTour) {
      return res.status(404).json({
        status: "failed",
        message: `Tour with ID ${req.params.id} not found`,
      })
    }
    res.status(200).json({
      status: "success",
      data: {
        tour: updatedTour,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    })
  }
}

const deleteTour = async (req, res) => {
  try {
    const deletedTour =
      await Tour.findByIdAndDelete(req.params.id)
    if (!deletedTour) {
      return res.status(404).json({
        status: "failed",
        message: `Tour with ID ${req.params.id} not found`,
      })
    }
    res.status(200).json({
      status: "success",
      data: null,
    })
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    })
  }
}

const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(
      req.params.id
    )
    if (!tour) {
      return res.status(404).json({
        status: "failed",
        message: `Data with ID ${req.params.id} not found`,
      })
    }
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    })
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    })
  }
}

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  editTour,
  removeTour,
  checkId,
  checkBody,
  updateTour,
  deleteTour,
}
