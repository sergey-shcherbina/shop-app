import React, {useContext} from 'react'
import {observer} from "mobx-react-lite"
import {Context} from "../index"
import {Button, ListGroup} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import FlowerBar from './FlowerBar'

const SubGroupBar = observer(() => {
  const {store} = useContext(Context)
  const navigate = useNavigate()
	return (
		<div className="d-flex flex-column align-items-center">
      {/* <ListGroup style={{overflow: "auto", height: "64.5vh", maxWidth: "30vw"}}> */}
      {store.subGroups.map(subGroup =>
        <div key={subGroup.id}>
        <Button  
          // key={group.id}
          variant="outline-light" 
          // active={group.id === store.selectedGroup.id}
          style={{cursor: "pointer", marginTop: 2, border: "none"}}
          onClick={() => {
            store.setSelectedSubGroup(subGroup)
            navigate("/group_page")
          }}
          // onMouseOver={() => {
          //   store.setSelectedSubGroup(subGroup)
          // }}
        >
          <h5>{subGroup.name}</h5>
        </Button>
        {/* {store.selectedSubGroup.id === subGroup.id && <FlowerBar />} */}
        </div>
      )}
      {/* </ListGroup> */}
    </div>
  )
})

export default SubGroupBar