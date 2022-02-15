const Router = require("express")
const router = new Router()
const {Image} = require ("../models")
const path = require('path')
// const checkRole = require("./checkRole")
const fs = require ("fs")

router.post("/", async (req, res) => {
	const {flowerId, order} = req.body
  const {img} = req.files
	let fileName = order + flowerId + ".jpg"
  img.mv(path.resolve(__dirname, "..", "static", fileName))
	const image = await Image.create({flowerId, order, img: fileName})
  return res.json(image)
})
router.get("/", async (req, res) => {
	let {flowerId} = req.query
  let images
  if (flowerId ) {
    images = await Image.findAll({where:{flowerId}})
  } else {
    images = await Image.findAll()
  }
  return res.json(images)
})
router.get("/:id", async (req, res) => {
	const {id} = req.params
	const image = await Image.findOne({where: {id}}) 
	return res.json(image)
})
router.delete("/:id", async (req, res) => {
	const {id} = req.params
  const image = await Image.findOne({where: {id}})
  if (fs.existsSync(path.resolve(__dirname, "..", "static", image.img))) {
    fs.unlinkSync(path.resolve(__dirname, "..", "static", image.img))
  }
  // fs.unlinkSync(path.resolve(__dirname, "..", "static", image.img))
  await Image.destroy({where: {id}})
  return res.json({})
})

module.exports = router
// , checkRole("ADMIN")