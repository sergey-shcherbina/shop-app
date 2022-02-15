import React,  {useState, useContext} from "react"
import {Container, Button, Card, Dropdown, CloseButton} from "react-bootstrap"
import CreateFlower from "../components/modals/CreateFlower"
import AddPhoto from "../components/modals/AddPhoto"
import {useNavigate} from "react-router-dom"
import {Context} from ".."
import {observer} from "mobx-react-lite"
import {fetchBaskets, fetchBasketFlowers, fetchBuyerId, editBasket} from "../http/userAPI"
import InputMask from "react-input-mask"
// import CreateGroup from "../components/modals/CreateGroup"
// import {removeGroup, fetchGroups, fetchFlower} from "../http/flowerAPI"

const Admin = observer(() => {
  const {store} = useContext(Context)
  const [flowerVisible, setFlowerVisible] = useState(false)
  const [photoVisible, setPhotoVisible] = useState(false)
  const [inpVis, setInpVis] = useState(false)
  const [phone, setPhone] = useState("")
  // const [groupVisible, setGroupVisible] = useState(false)
  const navigate = useNavigate()
  return (
    <Container className="d-flex justify-content-start align-items-center flex-column" style={{background: "transparent", minHeight: "80vh"}}>
      <Card className="d-flex flex-column align-items-center" style={{width: 400, overflow: "auto"}}>
        <CloseButton style={{marginLeft: "auto"}} onClick={() => navigate("/")} />
        {/* <Button
          variant="outline-success" size="lg"
          className="p-2"
          style={{border: "none"}}
          onClick={() => {
            setGroupVisible(true)
          }}
        >
          Добавить группу
        </Button> */}
        {/* <Button
          variant="outline-success" size="lg"
          className="mt-3 p-2"
          style={{border: "none"}}
          // onClick={() => set...Visible(true)}
        >
          Добавить обзор (статью)
        </Button> */}
        <Button
          variant="outline-success" size="lg"
          className="p-2 mt-1" style={{border: "none"}}
          onClick={() => setFlowerVisible(true)}
        >
          Добавить растение 
        </Button>
        <Button
          variant="outline-success" size="lg"
          className="mt-3 p-2" style={{border: "none"}}
          onClick={() => setPhotoVisible(true)}
        >
          Добавить фото в галерею
        </Button>
        <Button
          variant="outline-danger" size="lg"
          className="mt-3 p-2" style={{border: "none"}}
          onClick={() => {
            store.setProcessedBasketFlowers([])
            fetchBaskets(false).then(data => {
              store.setUnProcessedBaskets(data)
              store.unProcessedBaskets.map(basket => 
                fetchBuyerId(basket.buyerId).then(data => store.setBuyer(data))
                .then(() => fetchBasketFlowers(basket.id).then(data => {
                  store.setBasketFlowers(data)
                  store.setUnProcessedBasketFlowers([...store.unProcessedBasketFlowers, {basketId: basket.id, basketCreatedAt: basket.createdAt, ...store.buyer, basketFlowers: store.basketFlowers}])
                }))
              )
            })
          }}
        >    
          Необработанные заказы
        </Button>
        <Button
          variant="outline-success" size="lg"
          className="mt-3 p-2" style={{border: "none"}}
          onClick={() => {
            store.setUnProcessedBasketFlowers([])
            fetchBaskets(true).then(data => {
              store.setProcessedBaskets(data)
              store.processedBaskets.map(basket => 
                fetchBuyerId(basket.buyerId).then(data => store.setBuyer(data))
                .then(() => fetchBasketFlowers(basket.id).then(data => {
                  store.setBasketFlowers(data)
                  store.setProcessedBasketFlowers([...store.processedBasketFlowers, {basketId: basket.id, basketCreatedAt: basket.createdAt, ...store.buyer, basketFlowers: store.basketFlowers}])
                }))
              )
            })
          }}
        >
          Обработанные заказы
        </Button>
        <Button
          variant="outline-success" size="lg"
          className="mt-3 p-2 mb-4" style={{border: "none"}}
          onClick={() => setInpVis(true)}
        >
          Обработанные заказы <br/>(поиск по телефону)
        </Button>
        {inpVis && 
          <div className="d-flex"> 
            <InputMask 
              mask="+38 (099) 999-99-99" 
              style={{marginBottom: 30}}
              value={phone}
              onChange={event => setPhone(event.target.value)}
            />
            <Button 
              variant="outline-success" style={{height: 30, marginLeft: 5}}
              className="d-flex align-items-center"
              onClick={() => setInpVis(false)}
            >
              Найти</Button>
            <Button 
              variant="outline-success" style={{height: 30, marginLeft: 5}}
              className="d-flex align-items-center"
              onClick={() => setInpVis(false)}
            >
              Закрыть</Button>
          </div>
        }
        <CreateFlower show={flowerVisible} onHide={() => setFlowerVisible(false)} />
        <AddPhoto show={photoVisible} onHide={() => setPhotoVisible(false)} />
      </Card>
      {store.unProcessedBasketFlowers !== [] && store.unProcessedBasketFlowers.map(basket => 
        <Card className="mt-3 p-3" key={basket.basketId}>
          <h4>Заказ № {"1" + basket.basketId}</h4>
          <span>Оформлен {new Date(basket.basketCreatedAt).toUTCString().slice(4, -7)}</span> 
          <span>Получатель:  {basket.name}</span>
          <span>Телефон: {basket.phone}</span>
          <span>Email: {basket.email}</span>
          {basket.viber && <span>Viber: {basket.viber}</span>}
          {basket.telegram && <span>Telegram: {basket.telegram}</span>}
          <span>Доставка: {basket.service}.</span>
          <span>{basket.localRus}</span>
          <span>({basket.localUkr})</span>
          <span>{basket.departRus}.</span>
          <span>Оплата: {basket.pay}</span>
          {basket.comment && <span>Комментарий: {basket.comment}</span>}
          {basket.basketFlowers.map(flower => 
            <div key={flower.id} style={{border: "1px solid", borderBottom: "none", padding: 5}}>
              <span>{flower.name} - {flower.number} шт. по {flower.price} грн. = {flower.number * flower.price} грн.</span>
            </div>
          )}
          <div style={{border: "1px solid", padding: 5}}>
            Сумма заказа: {basket.basketFlowers.reduce((sum, flower) => sum + flower.number * flower.price, 0)} грн. 
          </div>
          <div className="mt-2 d-flex justify-content-end">
          <Button 
              variant="outline-primary" style={{marginRight: 10}}
              onClick={() => {
                store.setUnProcessedBasketFlowers([...store.unProcessedBasketFlowers.filter(basketDel => basketDel.basketId !== basket.basketId)])
              }} 
            >Закрыть</Button>
            <Button 
              variant="outline-primary"
              onClick={() => {
                store.setUnProcessedBasketFlowers([...store.unProcessedBasketFlowers.filter(basketDel => basketDel.basketId !== basket.basketId)])
                store.setProcessedBasket(...store.unProcessedBaskets.filter(bask => bask.id === basket.basketId))
                console.log(store.processedBasket.id)
                editBasket(store.processedBasket.id, {finished: true})
              }} 
            >В обработанные</Button>
          </div>
        </Card>
      )}
      {store.processedBasketFlowers !== [] && store.processedBasketFlowers.map(basket => 
        <Card className="mt-3 p-3" key={basket.basketId} style={{color: "green"}}>
          <h4>Заказ № {"1" + basket.basketId}</h4>
          <span>Оформлен {new Date(basket.basketCreatedAt).toUTCString().slice(4, -7)}</span> 
          <span>Получатель:  {basket.name}</span>
          <span>Телефон: {basket.phone}</span>
          <span>Email: {basket.email}</span>
          {basket.viber && <span>Viber: {basket.viber}</span>}
          {basket.telegram && <span>Telegram: {basket.telegram}</span>}
          <span>Доставка: {basket.service}.</span>
          <span>{basket.localRus}</span>
          <span>({basket.localUkr})</span>
          <span>{basket.departRus}.</span>
          <span>Оплата: {basket.pay}</span>
          {basket.comment && <span>Комментарий: {basket.comment}</span>}
          {basket.basketFlowers.map(flower => 
            <div key={flower.id} style={{border: "1px solid", borderBottom: "none", padding: 5}}>
              <span>{flower.name} - {flower.number} шт. по {flower.price} грн. = {flower.number * flower.price} грн.</span>
            </div>
          )}
          <div style={{border: "1px solid", padding: 5}}>
            Сумма заказа: {basket.basketFlowers.reduce((sum, flower) => sum + flower.number * flower.price, 0)} грн. 
          </div>
          <div className="mt-2 d-flex justify-content-end">
            <Button 
              variant="outline-primary"
              onClick={() => {
                store.setProcessedBasketFlowers([...store.processedBasketFlowers.filter(basketDel => basketDel.basketId !== basket.basketId)])
              }} 
            >Закрыть</Button>
          </div>
        </Card>
      )}
    </Container>
  )
})

export default Admin
{/* <Dropdown>
					<Dropdown.Toggle 
						variant="outline-danger" 
            className="p-2 mb-3" size="lg"
						style={{border: "none", margin: "1vh auto"}}
          >
					  Удалить группу 
					</Dropdown.Toggle>
						<Dropdown.Menu>
							{store.groups.map(group =>
								<Dropdown.Item 
									key={group.id}
                  style={{color: "red", fontSize: 20, fontWeight: "bold"}}
                  onClick={() => {
                    store.setSelectedGroup(group)
                    removeGroup(store.selectedGroup.id).then(() => 
                    fetchGroups().then(data => store.setGroups(data)))
                  }}
								>
									{group.name}
								</Dropdown.Item> 
							)}
						</Dropdown.Menu>
					</Dropdown> */}
        {/* <CreateGroup show={groupVisible} onHide={() => setGroupVisible(false)} /> */}
