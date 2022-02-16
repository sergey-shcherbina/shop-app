import React, {useState, useContext} from "react"
import {Button, Image, Form, Tabs, Tab, Row, Col} from "react-bootstrap"
import {baseURL} from "../http"
import arrow from "../assets/arrow.png"
import np from "../assets/nova_poshta.png"
import up from "../assets/ukrposhta.png"
import justin from "../assets/justin.png"
import {observer} from "mobx-react-lite"
import {Context} from ".."
import {fetchBuyer, createBasket, createBasketFlower} from "../http/userAPI"
import CustomerData from "../components/CustomerData"
import BasketWindow from "../components/modals/BasketWindow"
import {useNavigate} from "react-router-dom"

const Basket = observer(() => {
  const {store} = useContext(Context)
  const navigate = useNavigate()
  const [bool, setBool] = useState(false)
  const [visible, setVisible] = useState(false)
  const [visibleOld, setVisibleOld] = useState(false)
  const [email, setEmail] = useState("")
  const [basketVisible, setBasketVisible] = useState(false)

  return (
    <div style={{background: "white", marginLeft: 20, marginRight: 20, minHeight: 600}}>
      <div className="d-flex justify-content-center"><h2>Оформление заказа</h2></div>
      <Row>
        <Col md={6}>
          <div style={{fontSize: 18, marginLeft: 20}}>
            <Tabs className="mt-3" defaultActiveKey="new" 
              onSelect={() => {
                store.setBuyer({name: "", localUkr: "", localRus: "", service: "", departRus: "", phone: "", 
                viber: "", telegram: "", email: "", pay: "Частичная предоплата", comment: ""})
                setVisible(true)
                setVisibleOld(false)
                setBool(false)
              }}
            >
              <Tab eventKey="new" title="Новый покупатель">  
                {visible && <CustomerData bool={bool}/>}
              </Tab>
              <Tab eventKey="old" title="Зарегистрированный покупатель"> 
                {visible &&
                  <div style={{background: "white", height: 450}}>
                    <div style={{border: "1px solid lightgray", borderTop: "solid white"}}>
                      <Form.Group className="p-2">
                        <Form.Label>Электронная почта</Form.Label>
                        <div className="d-flex">
                          <Form.Control
                            value={email}
                            style={{border: "1px solid gray"}}
                            onChange={event => setEmail(event.target.value)}
                          />	
                          <Button variant="outline-primary" style={{marginLeft: 5}}
                            onClick={async () => {
                              try {
                                await fetchBuyer(email).then(data => store.setBuyer(data)).then(() => {
                                  setBool(true)
                                  setVisible(false)
                                  setVisibleOld(true)
                                })
                              } catch (err) {
                                alert(err.response.data.message)
                              }
                            }}
                          >Войти</Button>
                        </div>
                      </Form.Group> 
                    </div>
                  </div>
                }
                {visibleOld && <CustomerData bool={bool} />}
              </Tab> 
            </Tabs>  
          </div>
        </Col>
        <Col md={6}>
          <div className="d-flex flex-column">
            <div className="p-2" style={{border: "1px solid lightgray", marginTop: 61, marginRight: 20}}>
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
                    {flower.number} {" шт"} 
                    <div style={{fontWeight: "bold", minWidth: 90}}>
                      <span className="d-flex justify-content-center">{flower.number * flower.price} грн</span>
                    </div>
                  </div>
                </div>
              )}  
              <div className="d-flex flex-column mt-3">
                <div style={{fontSize: 20, fontWeight: "bold"}}>Доставка</div>
                {store.buyer.name && store.buyer.phone &&
                  <div className="d-flex flex-column mt-1 p-2" style={{border: "1px solid gray", borderRadius:5}}>
                    <Image src={store.buyer.service === "Новая почта" ? np : store.buyer.service === "Укрпочта" ? up : store.buyer.service === "Justin" ? justin : null} width={120} className="mb-1"/>
                    {!(store.buyer.service === "Укрпочта" || store.buyer.service === "Новая почта" || store.buyer.service === "Justin") && store.buyer.service &&
                      <div style={{fontWeight: "bold"}}>{store.buyer.service.slice(0, 1).toUpperCase() + store.buyer.service.slice(1)}</div>
                    }
                    <>{store.buyer.name}, тел. {store.buyer.phone},</><br/>
                    <>{store.buyer.localRus}</><br/>
                    <>({store.buyer.localUkr})</><br/>
                    <>{store.buyer.departRus}</><br/>
                  </div>
                }
              </div>

              <div className="d-flex justify-content-end mt-3" style={{fontSize: 20, fontWeight: "bold"}}>
                Сумма заказа - {store.basket.reduce((sum, flower) => sum + flower.number * flower.price, 0)} грн
              </div>
              <div className="d-flex justify-content-between mt-2">
                <Button 
                  variant="light" size="lg" style={{border: "none"}}
                  onClick={() => setBasketVisible(true)}
                >
                  <div className="d-flex align-items-center">
                    <Image src={arrow} width={20} height={20}/><span style={{marginLeft: 10}}>Вернуться в корзину</span> 
                  </div>
                </Button>
                <Button 
                  variant="outline-primary" size="lg" 
                  onClick={() => {
                    createBasket({buyerId: store.buyer.id})
                    .then(data => store.setBasketBuyer(data)).then(() => {
                      console.log(store.basket)
                      console.log(store.basketBuyer)
                      store.basket.forEach(flower => {
                        console.log(flower)
                        createBasketFlower({number: flower.number, name: flower.name, price: flower.price, basketId: store.basketBuyer.id, flowerId: flower.id})
                        .then(data => { 
                          store.setBasketFlower(data)
                          console.log(store.basketFlower)
                        }).then(() => console.log(store.basketFlower))
                      })})
                      
                      .finally(() => {
                        store.setBasket([])
                        store.setBuyer({name: "", localUkr: "", localRus: "", service: "", departRus: "", phone: "", 
                        viber: "", telegram: "", email: "", pay: "Частичная предоплата", comment: ""})
                        navigate("/home")
                      })

                    }}
                >
                  Подтвердить
                </Button>
              </div>
            </div>
          </div> 
        </Col>
      </Row>
      <BasketWindow show={basketVisible} onHide={() => setBasketVisible(false)} />
    </div>
  )
})

export default Basket
