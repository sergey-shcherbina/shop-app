require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const models = require("./models")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const path = require("path")

const PORT = process.env.PORT || 3001
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({})) 

app.use("/api/user", require("./routes/userRouter"))
app.use("/api/group", require("./routes/groupRouter"))
app.use("/api/sub_group", require("./routes/subGroupRouter"))
app.use("/api/flower", require("./routes/flowerRouter"))
app.use("/api/review", require("./routes/reviewRouter"))
app.use("/api/basket_flower", require("./routes/basketFlowerRouter"))
app.use("/api/basket", require("./routes/basketRouter"))
app.use("/api/image", require("./routes/imgageRouter"))
app.use("/api/photo", require("./routes/photoRouter"))
app.use("/api/rating", require("./routes/ratingRouter"))
app.use("/api/buyer", require("./routes/buyerRouter"))

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