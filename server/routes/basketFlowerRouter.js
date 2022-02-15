const Router = require("express")
const router = new Router()
const {BasketFlower} = require ("../models")

router.post("/", async (req, res) => {
	const {number, name, price, basketId, flowerId} = req.body
	const basket_flower = await BasketFlower.create({number, name, price, basketId, flowerId})
  console.log(basket_flower)
  return res.json(basket_flower)
})
router.get("/", async (req, res) => {
	const {basketId} = req.query
  const basket_flowers = await BasketFlower.findAll({where:{basketId}})
  return res.json(basket_flowers)
})
router.get("/:id", async (req, res) => {
	const {id} = req.params
	const basket_flower = await BasketFlower.findOne({where: {id}}) 
	return res.json(basket_flower)
})
router.delete("/:id", async (req, res) => {
	const {id} = req.params
	await BasketFlower.destroy({where: {id}})
  return res.json({})
})

module.exports = router