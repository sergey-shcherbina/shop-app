const Router = require("express")
const router = new Router()
const {Group} = require ("../models")
const path = require("path")
const fs = require ("fs")
const checkRole = require("./checkRole")

router.post("/", async (req, res) => {
	const {name} = req.body
  const {img} = req.files
  let fileName = name + ".jpg"
  img.mv(path.resolve(__dirname, "..", "static", fileName))
  const group = await Group.create({name, img: fileName})
  return res.json(group)
})
router.get("/", async (req, res) => {
	const groups = await Group.findAll()
  return res.json(groups)
})
router.delete("/:id", async (req, res) => {
	const {id} = req.params
  const group = await Group.findOne({where: {id}})
  fs.unlinkSync(path.resolve(__dirname, "..", "static", group.img))
	await Group.destroy({where: {id}})
  return res.json({})
})

module.exports = router
// checkRole("ADMIN")