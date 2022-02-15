import React, {useContext} from "react"
import {Modal, Form, Button, Container, Image, CloseButton, Card} from "react-bootstrap"
import {Context} from "../.."
import {observer} from "mobx-react-lite"
import {baseURL} from "../../http"
import arrow from "../../assets/arrow.png"
import {useNavigate} from "react-router-dom"

const BasketWindow = observer(({show, onHide}) => {
  const {store} = useContext(Context)
  const navigate = useNavigate()
  return (
    <Container>
      <Modal show={show} onHide={onHide} size="lg" >
				<Modal.Header>
					<Modal.Title><h2>Корзина</h2></Modal.Title>
            <CloseButton onClick={onHide}/>
				</Modal.Header>
				<Modal.Body>
          <div className="d-flex justify-content-end">
            <span style={{color: "green", marginRight: 35}}>Количество</span>
            <span style={{color: "green", marginRight: 110}}>Стоимость</span>
          </div>
          {store.basket.map(flower => 
            <div 
              key={flower.id}
              className="d-flex justify-content-between align-items-center mt-1 p-3" 
              style={{border: "1px solid darkgray"}}>
              <div className="d-flex">
                <Image src={baseURL + "api/1" +  flower.id + ".jpg"} width={150} />
                <div className="d-flex flex-column align-items-center justify-content-center" style={{marginLeft: 15}}>
                  <div>{flower.name.slice(0, flower.name.indexOf("("))}</div>
                  <div>{flower.name.slice(flower.name.indexOf("("))}</div>
                  <div>{flower.price} грн</div> 
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center" style={{border: "1px solid green", borderRadius: 5, marginRight: 25}}>
                  <Button
                    variant="outline-success"
                    style={{border: "none"}}
                    onClick={() => 
                      flower.number > 1 && 
                      store.setBasket(store.basket.map(basketFlower => 
                        basketFlower.id === flower.id ? {...basketFlower, number: flower.number - 1} : basketFlower
                      ))
                    }
                  > - </Button>
                  <Form.Control
                    style={{width: 50, color: "green", border: "none"}}
                    value={flower.number}
                    onChange={event => 
                      store.setBasket(store.basket.map(basketFlower => 
                        basketFlower.id === flower.id ? {...basketFlower, number: event.target.value} : basketFlower
                      ))
                    }
                  />
                  <Button 
                    variant="outline-success"
                    style={{border: "none", marginLeft: -15}}
                    onClick={() => 
                      store.setBasket(store.basket.map(basketFlower => 
                        basketFlower.id === flower.id ? {...basketFlower, number: flower.number + 1} : basketFlower))
                    }
                  > + </Button>
                </div>
                <div style={{fontWeight: "bold", minWidth: 90}}>
                  <span className="d-flex justify-content-center">{flower.number * flower.price} грн</span>
                </div>
                <Button 
                  variant="outline-danger"
                  onClick={() => {
                  store.setBasket(store.basket.filter(basketFlower => 
                    basketFlower.id !== flower.id))
                  }}
                >Удалить</Button>
              </div>
            </div>
          )}
        </Modal.Body>
				<Modal.Footer>
          <Card className="p-2" style={{width: 800}}>
          <div className="d-flex justify-content-end" style={{fontSize: 20, fontWeight: "bold"}}>
            Сумма заказа - {store.basket.reduce((sum, flower) => sum + flower.number * flower.price, 0)} грн
          </div>
          <div className="d-flex justify-content-between mt-2">
            <Button variant="light" size="lg" style={{border: "none"}} onClick={() => onHide()}>
              <div className="d-flex align-items-center">
                <Image src={arrow} width={20} height={20}/><span style={{marginLeft: 10}}>Вернуться к покупкам</span> 
              </div>
            </Button>
            <Button 
              variant="outline-success" size="lg"
              onClick={() => {
                // store.setBuyer({name: "", localUkr: "", localRus: "", service: "", departRus: "", phone: "", 
                // viber: "", telegram: "", email: "", pay: "Частичная предоплата", comment: ""})
                navigate("/basket")
                onHide()
              }}
              >Оформить заказ</Button>
          </div>
          </Card>
				</Modal.Footer>
			</Modal>
    </Container>
  )
})

export default BasketWindow
