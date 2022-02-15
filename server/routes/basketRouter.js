const Router = require("express")
const router = new Router()
const {Basket} = require ("../models")

router.post("/", async (req, res) => {
  const {buyerId} = req.body
	const basket = await Basket.create({buyerId})
  return res.json(basket)
})
router.get("/", async (req, res) => {
  const {finished} = req.query
  const baskets = await Basket.findAll({where: {finished}})
  return res.json(baskets)
})
router.get("/:id", async (req, res) => {
	const {id} = req.params
	const basket = await Basket.findOne({where: {id}}) 
	return res.json(basket)
})
router.put("/:id", async (req, res) => {
  const {id} = req.params
	const {finished} = req.body
	const basket = await Basket.findOne({where: {id}})
	await basket.update({finished})
	return res.json(basket)
})
router.delete("/:id", async (req, res) => {
	const {id} = req.params
	await Basket.destroy({where: {id}})
  return res.json({})
})	

module.exports = router