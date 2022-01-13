import React, {useContext, useEffect} from "react"
import {Card, Container, Image} from "react-bootstrap"
import {observer} from "mobx-react-lite"
import {fetchGroups} from "../http/flowerAPI"
import {Context} from ".."
import {useNavigate} from "react-router-dom"
import {baseURL} from "../http"

const Home = observer(() => {
  const {store} = useContext(Context)
  const navigate = useNavigate()
  useEffect(() => {
    fetchGroups().then(data => store.setGroups(data))
    .then(() => store.setSelectedImage({}))
  }, [])

  return (
    <Container className="d-flex flex-column align-items-center mt-4" 
      style={{height: "83vh", width: "65vw", overflow: "auto"}}>
      {store.groups.map(group =>
        <Card key={group.id} 
          className="d-flex flex-column align-items-center"
        >
        <Image
          // src={process.env.REACT_APP_API_URL + group.img}
          src={baseURL + "api/" + group.img}
          style={{cursor: "pointer", width: "65vw", border: "solid white"}}
          onClick={() => {
            store.setSelectedGroup(group)
            navigate("/group_page")
          }}
        />
          <h3 style={{color: "white", marginTop: "-50px"}}>{group.name}</h3>
        </Card>
      )}
    </Container>
    
  )
})

export default Home
