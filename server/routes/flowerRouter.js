const Router = require("express")
const router = new Router()
const {Flower} = require ("../models")
const checkRole = require("./checkRole")

router.post("/", async (req, res) => {
	const {name, price, text, subGroupId} = req.body
	const flower = await Flower.create({name, price, text, subGroupId})
	return res.json(flower)
})
router.get("/", async (req, res) => {
  let {subGroupId} = req.query
  let flowers
  if (subGroupId) {
    flowers = await Flower.findAll({where: {subGroupId}})
  } else {
    flowers = await Flower.findAll()
  }
	return res.json(flowers)
})
router.get("/:id", async (req, res) => {
	const {id} = req.params
	const flower = await Flower.findOne({where: {id}}) 
	return res.json(flower)
})
router.put("/:id", async (req, res) => {
	const {id} = req.params
	const {name, price, text, subGroupId} = req.body
	const flower = await Flower.findOne({where: {id}})
	await flower.update({name, price, text, subGroupId})
	return res.json(flower)
})
router.delete("/:id", async (req, res) => {
	const {id} = req.params
	await Flower.destroy({where: {id}})
  return res.json({})
})	

module.exports = router
// checkRole("ADMIN"), 