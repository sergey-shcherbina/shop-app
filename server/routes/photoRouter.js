const Router = require("express")
const router = new Router()
const {Photo} = require ("../models")
const path = require("path")
// const checkRole = require("./checkRole")
const fs = require ("fs")

router.post("/", async (req, res) => {
	const {order} = req.body
  const {img} = req.files
	let fileName = order + "000.jpg"
  img.mv(path.resolve(__dirname, "..", "static", fileName))
	const photo = await Photo.create({img: fileName})
  return res.json(photo)
})
router.get("/", async (req, res) => {
  const photos = await Photo.findAll()
  return res.json(photos)
})
router.get("/:id", async (req, res) => {
	const {id} = req.params
	const photo = await Photo.findOne({where: {id}}) 
	return res.json(photo)
})
router.delete("/:id", async (req, res) => {
	const {id} = req.params
  const photo = await Photo.findOne({where: {id}})
  if (fs.existsSync(path.resolve(__dirname, "..", "static", photo.img))) {
    fs.unlinkSync(path.resolve(__dirname, "..", "static", photo.img))
  }
  // fs.unlinkSync(path.resolve(__dirname, "..", "static", photo.img))
  await Photo.destroy({where: {id}})
  return res.json({})
})

module.exports = router
// , checkRole("ADMIN")