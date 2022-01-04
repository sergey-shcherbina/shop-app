import React, {useState, useContext} from "react"
import {Modal, Form, Button} from "react-bootstrap"
import {createGroup, fetchGroups} from "../../http/flowerAPI"
import {Context} from "../.."

const CreateGroup = ({show, onHide}) => {
	const {store} = useContext(Context)
	const [name, setName] = useState("")
	const [file, setFile] = useState(null) 
	const addGroup = () => {
		const formData = new FormData()
		formData.append("name", name)
		formData.append("img", file)
		createGroup(formData).then(() => {
			fetchGroups().then(data => store.setGroups(data))
			setName("")
			onHide()
  	})
	}	
	return (
		<Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>
          Добавление группы
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
					<Form.Control
						value={name}
						onChange={event => setName(event.target.value)}
						placeholder={"Название группы"}
					/>
					<Form.Control
              className="mt-3"
              type="file"
              onChange={event => setFile(event.target.files[0])}
            />
            <hr/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button 
					variant="outline-success" size = "lg" 
					onClick={addGroup}>
						Добавить группу
					</Button>
			</Modal.Footer>
		</Modal>
  )
}  

export default CreateGroup