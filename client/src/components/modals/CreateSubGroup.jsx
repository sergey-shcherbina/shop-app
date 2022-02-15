import React, {useState, useContext} from "react"
import {Modal, Form, Button} from "react-bootstrap"
import {createSubGroup, fetchSubGroups} from "../../http/flowerAPI"
import {Context} from "../.."

const CreateSubGroup = ({show, onHide}) => {
	const {store} = useContext(Context)
	const [name, setName] = useState("")
	const [file, setFile] = useState(null) 
	const addSubGroup = () => {
		if (!store.selectedGroup.id) {
			alert("Выберите группу!")
		}
		const formData = new FormData()
		formData.append("name", name)
    formData.append("groupId", store.selectedGroup.id)
		formData.append("img", file)
		createSubGroup(formData).then(() => {
			fetchSubGroups(store.selectedGroup.id).then(data => store.setSubGroups(data))
			setName("")
			onHide()
  	})
	}	
	return (
		<Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>
          Добавление подгруппы
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
					<Form.Control
						value={name}
						onChange={event => setName(event.target.value)}
						placeholder={"Название подгруппы"}
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
					onClick={addSubGroup}>
						Добавить подгруппу
					</Button>
			</Modal.Footer>
		</Modal>
  )
}  

export default CreateSubGroup