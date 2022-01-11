import React,  {useContext, useState, useEffect} from "react"
import {Button, Image, Card} from "react-bootstrap"
import {Context} from ".."
import {observer} from "mobx-react-lite"
import EditFlower from "../components/modals/EditFlower"
import AddImage from "../components/modals/AddImage"
import FullScreen from "../components/modals/FullScreen"
import {fetchFlowers, fetchImages, removeImage} from "../http/flowerAPI"
import {useNavigate} from "react-router-dom"
import {baseURL} from "../http"

const FlowerPage = observer(() => {
  const {store} = useContext(Context)
  const navigate = useNavigate()

  if (!store.selectedFlower.name) {
    navigate("/")
  }
  useEffect(() => {
    fetchImages().then(data => store.setImages(data))
    fetchFlowers().then(data => store.setFlowers(data))
  }, [])
  const [editVisible, setEditVisible] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const [screenVisible, setScreenVisible] = useState(false)
  const imgs = store.images.filter(img => img.flowerId === store.selectedFlower.id).map(image => 
    <div  key={image.id}>
      <Image   
        onClick={() => store.setSelectedImage(image)}
        // src={process.env.REACT_APP_API_URL + image.img} 
        src={baseURL + image.img} 
        style={{cursor: "pointer", marginLeft: 3, width: "13vw", height: "8vw"}}
      />
    </div>  
  )  

  return (
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
        {/* <Image src={process.env.REACT_APP_API_URL + (store.selectedImage.img || */}
          <Image src={baseURL + (store.selectedImage.img ||
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
      </Card>
      {store.user.role === "ADMIN" &&
        <Card className="d-flex flex-column" style={{width: "60vw"}}>
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
        </Card>
      } 
      </div>
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

