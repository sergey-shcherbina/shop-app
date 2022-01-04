const Router = require("express")
const router = new Router()
const {Rating} = require ("../models")

router.post("/", async (req, res) => {
	const {rate, userId, flowerId} = req.body
	const rating = await Rating.create({rate, userId, flowerId})
  return res.json(rating)
})
router.get("/", async (req, res) => {
	let {userId, flowerId} = req.query
  let ratings
  if (!userId && !flowerId) {
    ratings = await Rating.findAll()
  }
  if (userId && !flowerId) {
    ratings = await Rating.findAll({where:{userId}})
  }
  if (!userId && flowerId) {
    ratings = await Rating.findAll({where:{flowerId}})
  }
  if (userId && reviewId) {
    ratings = await Rating.findOne({where:{flowerId, userId}})
  }
  return res.json(ratings)
})

module.exports = router