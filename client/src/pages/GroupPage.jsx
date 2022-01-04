import React,  {useContext, useEffect} from "react"
import {observer} from "mobx-react-lite"
import {Context} from ".."
import {ListGroup, Image, Container} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {fetchFlowers} from "../http/flowerAPI"

const GroupPage = observer(() => {
  const {store} = useContext(Context)
  useEffect(() => {
    fetchFlowers().then(data => store.setFlowers(data))
    .then(() => store.setSelectedImage({}))
  }, [])

  const navigate = useNavigate()
  console.log(store.selectedGroup.name)
  return (
    <div className="d-flex flex-column align-items-center mt-3">
      <h3 style={{color: "white"}}>
        {store.selectedGroup.name}
      </h3>
    <Container 
      className="d-flex flex-column align-items-center" 
      style={{width: "70vw" ,height: "78vh", overflow: "auto"}}
    >
      <ListGroup>
        {store.flowers.filter(flowFilt => 
          flowFilt.groupId === store.selectedGroup.id).map(flower =>  
            <ListGroup.Item  
              key={flower.id}
              style={{cursor: "pointer", marginTop: 2}}
              onClick={() => {
              // fetchImages().then(data => store.setImages(data))
                store.setSelectedFlower(flower)
                navigate("/flower")
              }}
            >
              <h5>{flower.name}</h5>
              <Image src={process.env.REACT_APP_API_URL + "1" + flower.id + ".jpg"} style={{width: "60vw", height: "38.5vw"}}/>
            </ListGroup.Item > 
          )}
        </ListGroup>
      </Container>
    </div>
  )
})

export default GroupPage
