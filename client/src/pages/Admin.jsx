import React,  {useState, useContext} from "react"
import {Container, Button, Card, Dropdown, CloseButton} from "react-bootstrap"
import CreateGroup from "../components/modals/CreateGroup"
import CreateFlower from "../components/modals/CreateFlower"
import AddPhoto from "../components/modals/AddPhoto"
import {useNavigate} from "react-router-dom"
import {Context} from ".."
import {removeGroup, fetchGroups} from "../http/flowerAPI"
import {observer} from "mobx-react-lite"

const Admin = observer(() => {
  const {store} = useContext(Context)
  const [flowerVisible, setFlowerVisible] = useState(false)
  const [groupVisible, setGroupVisible] = useState(false)
  const [photoVisible, setPhotoVisible] = useState(false)
  const navigate = useNavigate()
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{background: "transparent", height: "80vh"}}>
      <Card className="d-flex flex-column align-items-center" style={{width: 400, maxHeight: "85vh", overflow: "auto"}}>
      <Button
          variant="outline-primary"
          style={{border: "none", marginLeft: "auto"}}
          onClick={() => navigate("/")}
        >
          <CloseButton/>
        </Button>
        <Button
          variant="outline-success" size="lg"
          className="p-2"
          style={{border: "none"}}
          onClick={() => {
            setGroupVisible(true)
          }}
        >
          Добавить группу
        </Button>
        <Button
          variant="outline-success" size="lg"
          className="mt-3 p-2"
          style={{border: "none"}}
          onClick={() => setFlowerVisible(true)}
        >
          Добавить растение 
        </Button>
        <Button
          variant="outline-success" size="lg"
          className="mt-3 p-2"
          style={{border: "none"}}
          // onClick={() => set...Visible(true)}
        >
          Добавить обзор (статью)
        </Button>
        <Button
          variant="outline-success" size="lg"
          className="mt-3 p-2"
          onClick={() => setPhotoVisible(true)}
          style={{border: "none"}}
        >
          Добавить фото в галерею
        </Button>
        <Dropdown>
					<Dropdown.Toggle 
						variant="outline-danger" 
            className="p-2 mb-3" size="lg"
						style={{border: "none", margin: "1vh auto"}}
          >
					  Удалить группу 
					</Dropdown.Toggle>
						<Dropdown.Menu>
							{store.groups.map(group =>
								<Dropdown.Item 
									key={group.id}
                  style={{color: "red", fontSize: 20, fontWeight: "bold"}}
                  onClick={() => {
                    store.setSelectedGroup(group)
                    removeGroup(store.selectedGroup.id).then(() => 
                    fetchGroups().then(data => store.setGroups(data)))
                  }}
								>
									{group.name}
								</Dropdown.Item> 
							)}
						</Dropdown.Menu>
					</Dropdown>
        <CreateGroup show={groupVisible} onHide={() => setGroupVisible(false)} />
        <CreateFlower show={flowerVisible} onHide={() => setFlowerVisible(false)} />
        <AddPhoto show={photoVisible} onHide={() => setPhotoVisible(false)} />
      </Card>
    </Container>
  )
})

export default Admin
