import React,  {useContext, useState, useEffect} from "react"
import {Button, Image, Container, Row, Col} from "react-bootstrap"
import {Context} from ".."
import {observer} from "mobx-react-lite"
import EditFlower from "../components/modals/EditFlower"
import AddImage from "../components/modals/AddImage"
import FullScreen from "../components/modals/FullScreen"
import BasketWindow from "../components/modals/BasketWindow"
import {fetchImages, removeImage} from "../http/flowerAPI"
import {useNavigate} from "react-router-dom"
import {baseURL} from "../http"
import np from "../assets/nova_poshta.png"
import up from "../assets/ukrposhta.png"
import justin from "../assets/justin.png" 
import rightarrow from "../assets/rightarrow.png"


const FlowerPage = observer(() => {
  const {store} = useContext(Context)
  const navigate = useNavigate()
  if (!store.selectedFlower.name) {
    navigate("/")
  }
  useEffect(() => {
    fetchImages(store.selectedFlower.id).then(data => store.setImages(data))
    // fetchFlowers().then(data => store.setFlowers(data))
  }, [])
  const [editVisible, setEditVisible] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const [screenVisible, setScreenVisible] = useState(false)
  const [basketVisible, setBasketVisible] = useState(false)

  return (
    <div>
      <div className="d-flex justify-content-center mt-3">
        <h3 style={{color: "white"}}>{store.selectedFlower.name}</h3>
      </div>
      <Container className="d-flex mt-3 justify-content-between" style={{background: "#e2e2e2"}}>
        <div className="d-flex flex-column align-items-center" style={{width: 620}}>
          <Image 
            src={baseURL + "api/" + (store.selectedImage.img || "1" + store.selectedFlower.id + ".jpg")} 
            style={{width:620, cursor: "pointer"}}
            className="mt-3"
            onClick={() => setScreenVisible(true)}
          />
          <Row className="p-2 mt-2 d-flex justify-content-around">
            {store.images.filter(img => img.flowerId === store.selectedFlower.id).map(image => 
              <Col md={3} key={image.id} className="mb-3">
                <Image
                  src={baseURL + "api/" + image.img}
                  style={{cursor: "pointer", width: 140, height: 93}}
                  onClick={() => store.setSelectedImage(image)}
                />
              </Col>
            )}
          </Row>
        </div>
        <div style={{width: 680, maxHeight: 800, overflow: "auto", marginLeft: 20}}>
        <Row className="d-flex">
          <Col md={10} className="d-flex mt-2">
            <Button 
              variant="outline-success" size="sm" 
              style={{border: "none"}}
              onClick={() => navigate("/")}
            >
              <div className="d-flex align-items-center">
                Главная<Image src={rightarrow} width={20} style={{marginBottom: 2,marginLeft: -4}} />
              </div>
            </Button>

            <Button 
              variant="outline-success" size="sm" 
              style={{border: "none"}}
              onClick={()=> navigate("/home")}
            >
              <div className="d-flex align-items-center">
                {store.selectedGroup.name}<Image src={rightarrow} width={20} style={{marginBottom: 2,marginLeft: -4}} />
              </div>
            </Button>
            <Button 
              variant="outline-success" size="sm" 
              style={{border: "none"}}
              onClick={()=> navigate("/group_page")}
            >
              <div className="d-flex align-items-center">
                {store.selectedSubGroup.name}<Image src={rightarrow} width={20} style={{marginBottom: 2,marginLeft: -4}} />
              </div>
            </Button>
            <Button 
              variant="outline-success" size="sm" 
              style={{border: "none"}}
              onClick={() => setScreenVisible(true)}
            >
              <div className="d-flex align-items-center">
                {store.selectedFlower.name && store.selectedFlower.name.slice(0, store.selectedFlower.name.indexOf("("))}
                <Image src={rightarrow} width={20} style={{marginBottom: 2,marginLeft: -4}} />
              </div>
            </Button> 
          </Col>
        </Row>
        <h3 className="mt-3" style={{fontFamily: "'Lobster', cursive"}}>{store.selectedFlower.name}</h3>
        <h3 className="mt-2" style={{color: "green"}}>{store.selectedFlower.price} грн</h3>
        <Button 
          variant="outline-success" size="lg" className="mt-2"
          onClick={() => {
            store.basket.every(flower => flower.id !== store.selectedFlower.id) && 
            store.setBasket([...store.basket, {...store.selectedFlower, number: 1}])
            setBasketVisible(true)
          }}
        >
          {store.basket.some(flower => flower.id === store.selectedFlower.id) ? "В корзине" : "Купить"}
        </Button>
        <h4 className="mt-3">Описание</h4>
        <span>{store.selectedFlower.text}</span>
        <h4 className="mt-3">Доставка</h4>
        <div className="d-flex align-items-center">
          <Image className="mt-2" src={np} width={60} />
          <Image  style={{marginLeft: 15}} src={justin} width={60} />
          <Image  style={{marginLeft: 15}} src={up} width={70} />
          <div style={{marginLeft: 15}}> — по тарифам перевозчика.</div>
        </div>
          <h4 className="mt-3">Оплата</h4>
          <span>Наличными при получении. </span><br/>
          <span>Кредитной картой в privat24.</span>
          {/* <p>Через кассу или терминал самообслуживания Приватбанк.</p> */}
        </div>
      </Container>
      <BasketWindow show={basketVisible} onHide={() => setBasketVisible(false)} />

      {store.user.role === "ADMIN" &&
        <Container className="d-flex justify-content-center mt-3">
          <div style={{background: "white", marginBottom: 20}}>
          <Button 
            variant="outline-warning" size="lg"
            onClick={() => setEditVisible(true)}
          >
            Редактировать описание
          </Button>
          <Button 
            variant="outline-success" size="lg"
            onClick={() => setImageVisible(true)}
          >
            Добавить фото
          </Button>
          <Button 
            variant="outline-danger" size="lg"
            onClick={() => 
              removeImage(store.selectedImage.id).then(() => 
              fetchImages().then(data => store.setImages(data)))
            }
          >
            Удалить фото
          </Button>
          </div>
        </Container>
      } 
      
      <EditFlower show={editVisible} onHide={() => setEditVisible(false)}/>
      <AddImage show={imageVisible} onHide={() => setImageVisible(false)} />
      <FullScreen 
        show={screenVisible} 
        onHide={() => setScreenVisible(false)} 
        im={store.selectedImage.img || "1" + store.selectedFlower.id + ".jpg"}
      />
    </div>
  )
})

export default FlowerPage

{/* 
 const imgs = store.images.filter(img => img.flowerId === store.selectedFlower.id).map(image => 
    <div  key={image.id}>
      <Image   
        onClick={() => store.setSelectedImage(image)}
        // src={process.env.REACT_APP_API_URL + image.img} 
        src={baseURL + "api/" + image.img} 
        style={{cursor: "pointer", marginLeft: 3, width: "13vw", height: "8vw"}}
      />
    </div>  
  )  
  <div 
      className="d-flex flex-column align-items-center mt-3" 
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{width: "65vw"}}
      >
        <h3 style={{color: "white"}}>
          {store.selectedFlower.name}
        </h3>
      </div>
      <div style={{height: "78vh", width: "60vw", overflow: "auto", background: "white", border: "solid white"}}>
      <div 
        className="d-flex justify-content-center align-items-center"
        style={{cursor: "pointer"}}
      > 
          <Image src={baseURL + "api/" + (store.selectedImage.img ||
          "1" + store.selectedFlower.id + ".jpg")} 
          style={{width: "60vw", height: "32vw"}}
          onClick={() => setScreenVisible(true)}
        />
        
      </div>
      <div 
        className="d-flex mt-1"
        style={{width: "60vw", height: "8vw", overflow: "auto", background: "white"}}
      >
        {imgs}
      </div>
      <Card
        className="d-flex flex-column justify-content-center align-items-center"
        style={{width: "60vw"}}
       >
        <br/><h3>{store.selectedFlower.name}</h3>
        <h5>{store.selectedFlower.text}</h5>
        <div className="d-flex justify-content-between align-items-center">
          <h4 style={{color: "green", marginRight: "2vw"}}>{store.selectedFlower.price} грн</h4>
          <Button 
            variant="outline-success" size="lg" style={{}}
            // onClick={() => set...Visible(true)}
          >
            В корзину 
          </Button>
        </div>
        <br/>
      </Card> */}
