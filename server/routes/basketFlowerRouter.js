const Router = require("express")
const router = new Router()
const {BasketFlower} = require ("../models")

router.post("/", async (req, res) => {
	const {basketId, flowerId} = req.body
	const basket_flower = await BasketFlower.create({basketId, flowerId})
  return res.json(basket_flower)
})
router.get("/", async (req, res) => {
	let {basketId, flowerId} = req.query
  let basket_flowers
  if (!basketId && !flowerId) {
    basket_flowers = await BasketFlower.findAll()
  }
  if (basketId && !flowerId) {
    basket_flowers = await BasketFlower.findAll({where:{basketId}})
  }
  if (basketId && flowerId) {
    basket_flowers = await BasketFlower.findOne({where:{basketId, flowerId}})
  }
  return res.json(basket_flowers)
})
router.get("/:id", async (req, res) => {
	const {id} = req.params
	const basket_flower = await Image.findOne({where: {id}}) 
	return res.json(basket_flower)
})
router.delete("/:id", async (req, res) => {
	const {id} = req.params
	await Image.destroy({where: {id}})
})

module.exports = router