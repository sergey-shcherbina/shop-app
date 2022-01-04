const Router = require("express")
const router = new Router()
const {Review} = require ("../models")

router.post("/", async (req, res) => {
	const {text, userId, flowerId} = req.body
	const review = await Review.create({text, userId, flowerId})
	return res.json(review)
})
router.get("/", async (req, res) => {
	let {flowerId, userId} = req.query 
  let reviews
  if (!flowerId && !userId) {
    reviews = await Review.findAll()
  }
  if (flowerId && !userId) {
    reviews = await Review.findAll({where:{groupId}})
  }
  if (!flowerId && userId) {
    reviews = await Review.findAll({where:{userId}})
  }
  if (flowerId && userId) {
    reviews = await Review.findAll({where:{userId, groupId}})
  }
  return res.json(reviews)
})
router.get("/:id", async (req, res) => {
	const {id} = req.params
	const review = await Review.findOne({where: {id}})
	return res.json(review)
})
router.put("/:id", async (req, res) => {
	const {id} = req.params
	const {text, userId, flowerId} = req.body
	const review = await Review.findOne({where: {id}})
	await review.update({text, userId, flowerId})
	return res.json(review)
})
router.delete("/:id", async (req, res) => {
	const {id} = req.params
	await Review.destroy({where: {id}})
  return res.json({})
})

module.exports = router