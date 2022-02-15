const Router = require("express")
const router = new Router()
const {SubGroup} = require ("../models")
const path = require("path")
const fs = require ("fs")
const checkRole = require("./checkRole")

router.post("/", async (req, res) => {
	const {name, groupId} = req.body
  const {img} = req.files
  let fileName = name + ".jpg"
  img.mv(path.resolve(__dirname, "..", "static", fileName))
  const subGroup = await SubGroup.create({name, groupId, img: fileName})
  return res.json(subGroup)
})
router.get("/", async (req, res) => {
  let {groupId} = req.query
  let subGroups
  if (groupId) {
    subGroups = await SubGroup.findAll({where:{groupId}})
  } else {
    subGroups = await SubGroup.findAll()
  }
	return res.json(subGroups)
})
router.get("/:id", async (req, res) => {
	const {id} = req.params
	const subGroup = await Flower.findOne({where: {id}}) 
	return res.json(subGroup)
})

router.delete("/:id", async (req, res) => {
	const {id} = req.params
  const subGroup = await SubGroup.findOne({where: {id}})
  fs.unlinkSync(path.resolve(__dirname, "..", "static", group.img))
	await SubGroup.destroy({where: {id}})
  return res.json({})
})

module.exports = router
// checkRole("ADMIN")