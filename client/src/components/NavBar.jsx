import React, {useContext} from "react"
import {Button, Image, Nav} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {Context} from ".."
import basketImg from"../assets/basket.svg"
import {observer} from "mobx-react-lite"

const NavBar = observer(() => {
  const {store} = useContext(Context)
  const navigate = useNavigate()
  const logOut = () => {
  	store.setUser({})
    navigate("/")
  }
  const goBasket = () => {
    alert("Для доступа к корзине - войдите в аккаунт или зарегистрируйтесь!")
    navigate("/login")
  }
  
  return (
    <div>
      <div className="d-flex justify-content-end" style={{marginRight: "2vw"}}>
        {/* <Button variant="outline-light" style={{border: "none"}}>Блог</Button> */}
        {/* <Button variant="outline-light" style={{border: "none"}}>Контакты</Button> */}
        <Button 
          variant="outline-light" style={{border: "none"}}
          onClick={() => navigate("/")}
        >
          Главная
        </Button>
        <Button 
          variant="outline-light" style={{border: "none"}}
          onClick={() => { 
            navigate("/gallery")
          }}
        >
          Галерея
        </Button>
        {store.user.role === "ADMIN" &&
          <Button variant="outline-light" style={{border: "none"}} onClick={() => navigate("/admin")}>Админ</Button>
        }
        {(store.user.role === "ADMIN" || store.user.role === "USER") ?
          <Nav>
            <Button variant="outline-light"  style={{border: "none"}} onClick={logOut}>
              Выйти
            </Button>
            <Button variant="outline-light" style={{border: "none"}} onClick={() => navigate("/basket")}>
              <Image src={basketImg} />
            </Button> 
          </Nav>
          :
          <Nav>
            <Button variant="outline-light"  style={{border: "none"}} onClick={() => navigate("/login")}>
              Войти
            </Button>
            <Button variant="outline-light" style={{border: "none"}} onClick={goBasket}>
              <Image src={basketImg} />
            </Button> 
          </Nav>
        }
      </div>
      <div className="d-flex justify-content-center align-items-center" style={{fontWeight: "bold", color: "white"}}>
        <h1 style={{marginRight: "3vw", fontFamily: "'Lobster', cursive"}}>РАЙСКИЙ САД</h1>
        <div className="d-flex flex-column align-items-center" style={{marginLeft: "3vw"}}>
          <h5>viber, telegramm:</h5>
          <h5>(066)6117429</h5>
          {/* <div>(066) 611 74 29</div> */}
        </div>
      </div>
      {/* <Container className="d-flex justify-content-center">
        <Button variant="outline-light" size="lg" style={{border: "none", marginLeft: "2vw"}}>Каталог</Button>
        <Button variant="outline-primary" style={{border: "none"}}>Советы</Button> 
      </Container> */}
    </div>
  )
})

export default NavBar
