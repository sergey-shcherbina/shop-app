const Router = require("express")
const router = new Router()
const {Buyer} = require ("../models")

router.post("/", async (req, res) => {
	const {name, localUkr, localRus, service, departRus, phone, viber, telegram, email, pay, comment} = req.body
  const candidate = await Buyer.findOne({where: {email}})
	if (candidate) {
		return res.status(404).json({message: "Покупатель с таким email уже существует. Перейдите в 'Зарегистрированный окупатель' либо измените email"})	
	}
	const buyer = await Buyer.create({name, localUkr, localRus, service, departRus, phone, viber, telegram, email, pay, comment})
	return res.json(buyer)
})
router.put("/:id", async (req, res) => {
  const {id} = req.params
	const {name, localUkr, localRus, service, departRus, phone, viber, telegram, email, pay, comment} = req.body
	const buyer = await Buyer.findOne({where: {id}})
	await buyer.update({name, localUkr, localRus, service, departRus, phone, viber, telegram, email, pay, comment})
	return res.json(buyer)
})
router.get("/", async (req, res) => {
  const {email} = req.query
  const buyer = await Buyer.findOne({where: {email}})
  if (!buyer) {
		return res.status(404).json({message: "Покупателя с таким email не существует. Перейдите в 'Новый покупатель' либо измените email"})	
	}
  return res.json(buyer) 
})
router.get("/:id", async (req, res) => {
  const {id} = req.params
  const buyer = await Buyer.findOne({where: {id}})
  return res.json(buyer)
})
  
module.exports = router