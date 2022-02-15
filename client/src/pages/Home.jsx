import React, {useContext, useEffect, useState} from "react"
import {Image, Container, Row, Col} from "react-bootstrap"
import {observer} from "mobx-react-lite"
import {fetchSubGroups} from "../http/flowerAPI"
import {Context} from ".."
import {useNavigate} from "react-router-dom"
import {baseURL} from "../http"
import SubGroupBar from "../components/SubGroupBar"

const Home = observer(() => {
  const {store} = useContext(Context)
  const navigate = useNavigate()
  useEffect(() => {
    fetchSubGroups(store.selectedGroup.id || 1).then(data => store.setSubGroups(data))
  }, [])
  return (
    <div className="d-flex flex-column align-items-center mt-3" style={{minHeight: "80vh"}}>
      <h3 style={{color: "white"}}>{store.selectedGroup.name}</h3>
      <Container>
        <Row className="mt-2">
          <Col md={3} className="mt-2">
            <SubGroupBar />
          </Col>
          <Col md={9}>
            <Row className="d-flex">
              {store.subGroups.map(subGroup =>
                <Col md={6} key={subGroup.id} className="mb-5 d-flex flex-column align-items-center" >
                  <Image
                    src={baseURL + "api/" + subGroup.img}
                    style={{cursor: "pointer", width: 450, height: 300, border: "solid white"}}
                    onClick={() => {
                      store.setSelectedSubGroup(subGroup)
                      navigate("/group_page")
                    }}
                  />
                  <h3 style={{color: "white", marginTop: "-50px"}}>{subGroup.name}</h3>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
})

export default Home

   

