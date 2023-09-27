// CORE PACKAGE/MODULE
const fs = require("fs")

// THIRD PARTY PACKAGE/MODULE
const express = require("express")
const morgan = require("morgan")
const swaggerUi = require("swagger-ui-express")
const yaml = require("js-yaml")

// OUR OWN PACKAGE/MODULE
const tourRouter = require("../routes/tourRoutes")
const userRouter = require("../routes/userRoutes")

const app = express()

// middleware dari express
app.use(express.json())
app.use(morgan("dev"))
// static file
app.use(express.static(`${__dirname}/public`))

// OUR OWN MIDDLEWARE
app.use((req, res, next) => {
  console.log(
    "hallo FSW2 di middleware kita sendiri"
  )
  next()
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  console.log(req.requestTime)
  next()
})

const swaggerDoc = yaml.load(
  fs.readFileSync(
    "./swagger/swagger.yaml",
    "utf-8"
  )
)

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc)
)

app.use("/api/v1/tours", tourRouter)
app.use("/api/v1/users", userRouter)

module.exports = app
