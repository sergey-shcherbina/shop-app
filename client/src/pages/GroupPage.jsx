import React,  {useContext, useEffect} from "react"
import {observer} from "mobx-react-lite"
import {Context} from ".."
import {Image, Container, Col, Row} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {fetchFlowers, fetchImages, fetchSubGroups} from "../http/flowerAPI"
import {baseURL} from "../http"
import FlowerBar from "../components/FlowerBar"

const GroupPage = observer(() => {
  const {store} = useContext(Context)
  const navigate = useNavigate()
  useEffect(() => {
     // fetchSubGroups(store.selectedGroup.id).then(data => store.setSubGroups(data))
    fetchFlowers(store.selectedSubGroup.id).then(data => store.setFlowers(data))
    // .then(() => store.setSelectedImage({}))
    fetchImages().then(data => store.setImages(data))
  }, [])
                                                  
  return (
    <div className="d-flex flex-column align-items-center mt-3" style={{minHeight: "80vh"}}>
      <h3 style={{color: "white"}}>
        {store.selectedSubGroup.name}
      </h3>
      <Container>
        <Row className="mt-2">
          <Col md={2} className="mt-10">
            {store.selectedSubGroup.id && <FlowerBar />}  
          </Col>
          <Col md={10}>
            <Row className="d-flex">
                {store.flowers.filter(flowFilt => flowFilt.subGroupId === store.selectedSubGroup.id).map(flower => 
                  <Col md={4} key={flower.id} className="mb-4 d-flex flex-column align-items-center">
                    <Image
                      width={330} height={220} src={baseURL + "api/" + "1" + flower.id + ".jpg"}
                      style={{cursor: "pointer", border: "solid white"}}
                      onClick={() => {
                        store.setSelectedFlower(flower)
                        navigate("/flower")
                      }}
                    />
                    <h5 style={{color: "white", marginTop: -60}}>{flower.name.slice(0, flower.name.indexOf("("))}</h5>
                    <h5 style={{color: "white"}}>{flower.name.slice(flower.name.indexOf("("))}</h5>
                    {/* <div className="text-black mt-1 d-flex justify-content-between align-items-center">
                      <div>...</div>
                      <div className="d-flex align-items-center">
                        <div>...</div>
                           <Image width={18} height={18} src={star}/> 
                        </div>
                      </div>
                    <div className="d-flex justify-content-center">{flower.name}</div> */}
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
})
export default GroupPage
