import React, {useContext} from 'react'
import {observer} from "mobx-react-lite"
import {Context} from ".."
import {Button, ListGroup} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import FlowerBar from './FlowerBar'

const GroupBar = observer(() => {
  const {store} = useContext(Context)
  const navigate = useNavigate()
	return (
		<div className="d-flex flex-column align-items-center">
      {store.groups.map(group =>
        <Button  
          key={group.id}
          variant="outline-light" 
          style={{cursor: "pointer", marginTop: 2, border: "none"}}
          onClick={() => {
            store.setSelectedGroup(group)
            navigate("/group_page")
          }}
          onMouseOver={() => {
            store.setSelectedGroup(group)
          }}
        >
          <h5>{group.name}</h5>
        </Button>
      )}
    </div>
  )
})

export default GroupBar