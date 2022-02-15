import React, {useContext, useEffect, useState} from "react"
import {Card, Image, Button, Container} from "react-bootstrap"
import {Context} from ".."
import {observer} from "mobx-react-lite"
import {fetchPhotos,removePhoto} from "../http/flowerAPI"
import FullScreen from "../components/modals/FullScreen"
import {baseURL} from "../http"

const Gallery = observer(() => {
  const {store} = useContext(Context)
  useEffect(() => {
    fetchPhotos().then(data => store.setPhotos(data))
  }, [])
  const [screenVisible, setScreenVisible] = useState(false)
  const photos = store.photos.map(photo => 
    <Card  key={photo.id}>
      <Image   
        onClick={() => {
          store.setSelectedPhoto(photo)
          store.user.role !== "ADMIN" && setScreenVisible(true)
        }}
        src={baseURL + "api/" + photo.img}
        // src={baseURL + "api/" + (photo.img === "1000.jpg" ? "2000jpg" : photo.img)}  
        style={{cursor: "pointer",width: "70vw" ,height: "50vw"}}
      />
      Описание
      {(store.selectedPhoto.id === photo.id && store.user.role === "ADMIN")  && 
        <div className="d-flex flex-column align-items-center">
          <Button 
            variant="outline-success" size="lg" 
            onClick={() => {
              store.setBackgr(photo)
              console.log(store.backgr.img)
            }}
          >
            Сделать основным фоном
          </Button>
          <Button 
            variant="outline-success" size="lg" 
            onClick={() => {
              removePhoto(store.selectedPhoto.id).then(() => 
              fetchPhotos().then(data => store.setPhotos(data)))
            }}
          >
            Сделать  фоном
          </Button>
          <Button 
            variant="outline-danger" size="lg"
            onClick={() => {
              removePhoto(store.selectedPhoto.id).then(() => 
              fetchPhotos().then(data => store.setPhotos(data)))
            }}
          >
            Удалить фото
          </Button>
        </div>
      }
    </Card>  
  )  
  return (
    <Container 
      className="d-flex flex-column align-items-center  mt-3" 
      style={{height: "84vh", width: "70vw", overflow: "auto", border: "solid white"}}
    >
      {photos}
      <FullScreen 
        show={screenVisible} 
        onHide={() => setScreenVisible(false)} 
        im={store.selectedPhoto.img}
      />
    </Container>
  )
})

export default Gallery
