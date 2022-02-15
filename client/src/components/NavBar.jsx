import React, {useContext, useEffect, useState} from "react"
import {Button, Image, Nav, Row, Col} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {Context} from ".."
import userImg from"../assets/user.svg"
import basketImg from"../assets/basket.svg"
import phoneImg from"../assets/phone1.png"
import {observer} from "mobx-react-lite"
import {fetchGroups, fetchSubGroups, fetchFlowers} from "../http/flowerAPI"
import {baseURL} from "../http"
import BasketWindow from "../components/modals/BasketWindow"

const NavBar = observer(() => {
  const {store} = useContext(Context)
  const navigate = useNavigate()
  const [buttonsVisible, setButtonsVisible] = useState(false)
  const [color, setColor] = useState("white")
  const [basketVisible, setBasketVisible] = useState(false)

  useEffect(() => {
    fetchGroups().then(data => store.setGroups(data))
    // .then(() => store.setSelectedImage({}))
  }, [])
  // useEffect(() => {
  //   fetchSubGroups(store.selectedGroup.id).then(data => store.setSubGroups(data))
  // }, [])
  // useEffect(() => {
  //   fetchFlowers(store.selectedSubGroup.id).then(data => store.setFlowers(data))
  // }, [store.selectedSubGroup])
  const logOut = () => {
  	store.setUser({})
    navigate("/")
  }
  return (
    <div>
      <div className="d-flex justify-content-end" style={{marginRight: "2vw"}}>
        <Button 
          variant="outline-light" size="lg" style={{border: "none"}}
          onClick={() => navigate("/")}
        >
          Главная
        </Button>
        <Button 
          variant="outline-light" size="lg" style={{border: "none"}}
          onClick={() => navigate("/home")}
        >
          Каталог
        </Button>
        <Button 
          variant="outline-light" size="lg" style={{border: "none"}}
          onClick={() => { 
            navigate("/gallery")
          }}
        >
          Галерея
        </Button>
        {store.user.role === "ADMIN" &&
          <Button variant="outline-light" size="lg" style={{border: "none"}} onClick={() => navigate("/admin")}>Админ</Button>
        }
        {(store.user.role === "ADMIN" || store.user.role === "USER") ?
          <Nav>
            <Button variant="outline-light"  size="lg" style={{border: "none"}} onClick={logOut}>
              <Image src={userImg} height={20}/> Выйти
            </Button> 
          </Nav>
          :
          <Nav>
            <Button 
              variant="outline-light" size="lg" style={{border: "none"}} onClick={() => navigate("/login")}>
              <Image src={userImg} height={20}/> Войти
            </Button>
          </Nav>
        }
      </div>
      <div className="d-flex justify-content-center align-items-center" style={{fontWeight: "bold", color: "white"}}>
        <h1 style={{marginRight: "3vw", fontFamily: "'Lobster', cursive"}}>РАЙСКИЙ САД</h1>
        <div className="d-flex flex-column align-items-center" style={{marginLeft: "3vw"}}>
          <h5>viber, telegramm:</h5>
          <h5><Image src={phoneImg} width={22} /> (066) 611-74-29</h5>
        </div>
        <Button variant="outline-light" size="lg" style={{border: "none", marginLeft: "3vw"}}
          onMouseOver={() => setColor("black")}
          onMouseOut={() => setColor("white")}
            onClick={() => setBasketVisible(true)}
            // setColor("black")}
        >
          <Image src={basketImg} width={35}/>
        </Button> 
        <div 
          className="d-flex justify-content-center align-items-center"
          style={{width: 18, height: 18, borderRadius: "50%", background:"orange", marginLeft: -35}}
        >
          <span style={{fontSize: 13, fontWeight: 400, color: "black"}}>
            {store.basket.reduce((sum, flower) => sum + Number(flower.number), 0)} 
          </span>
        </div>
        <div style={{width: 22}}></div>
        <div className="d-flex flex-column align-items-center" style={{color: color, fontWeight: 500, fontSize: 16}}>
          <span>Мой заказ</span>
          {store.basket.length ? 
            <span>{store.basket.reduce((sum, flower) => sum + flower.number * flower.price, 0)} грн</span>
            : ""
          }
        </div>
      </div>
      <div className="d-flex justify-content-center mb-2">
        {store.groups.map(group => 
          <Button 
            key={group.id}
            variant="outline-light" size="lg" style={{border: "none", marginLeft: 8}}
            onMouseOver={() => {
              store.setSelectedGroup(group)
              fetchSubGroups(store.selectedGroup.id).then(data => { 
                store.setSubGroups(data)
                setButtonsVisible(true)
              })
            }}
            onClick={() => {
              store.setSelectedGroup(group)
              navigate("/home")
            }}
          >{group.name}</Button>
        )}
      </div>
      {buttonsVisible && 
        <Row className="d-flex justify-content-center mb-2">
          <Col md={10} className="d-flex justify-content-center">
            <div 
              // style={{background: "blue"}} 
              onMouseLeave={() => {
                setButtonsVisible(false)
              }}
            >
              <Image src={baseURL + "api/" + store.selectedGroup.img} width={75} height={50} style={{border: "1px solid white"}}/>
              {store.subGroups.map(subGroup => 
                <Button 
                  key={subGroup.id}
                  variant="outline-light" style={{border: "none", marginLeft: 5}}
                  onClick={() => {
                    store.setSelectedSubGroup(subGroup)
                    fetchFlowers(store.selectedSubGroup.id).then(data => {
                      store.setFlowers(data)
                      navigate("/group_page")
                    })
                  }}
                >
                  {subGroup.name}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      }
      <BasketWindow show={basketVisible} onHide={() => setBasketVisible(false)} />
    </div>
  )
})

export default NavBar