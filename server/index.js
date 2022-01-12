require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const models = require("./models")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const path = require("path")

const PORT = process.env.PORT || 3004
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({})) 

app.use("/user", require("./routes/userRouter"))
app.use("/group", require("./routes/groupRouter"))
app.use("/flower", require("./routes/flowerRouter"))
app.use("/review", require("./routes/reviewRouter"))
app.use("/basket_flower", require("./routes/basketFlowerRouter"))
app.use("/image", require("./routes/imgageRouter"))
app.use("/photo", require("./routes/photoRouter"))
app.use("/rating", require("./routes/ratingRouter"))

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (err) {
    console.log(err)
  }
}
start()