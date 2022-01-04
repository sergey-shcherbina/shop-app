import React, {useState, useContext} from "react"
import {Modal, Form, Button} from "react-bootstrap"
import {createPhoto, fetchPhotos} from "../../http/flowerAPI"
import {Context} from "../.."
import {observer} from "mobx-react-lite"

const AddPhoto = observer(({show, onHide}) => {
  const {store} = useContext(Context)
	const [file, setFile] = useState(null)
  const [order, setOrder] = useState("0") 
	const addPhoto = () => {
    const formData = new FormData()
    formData.append("userId", store.user.id)
    formData.append("order", order)
    formData.append("img", file)
    createPhoto(formData).then(() => {
		  fetchPhotos().then(data => store.setPhotos(data))
			onHide()
    })}	
	return (
		<Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>
          Добавление фото в галерею
        </Modal.Title>
      	  </Modal.Header>
      		<Modal.Body>
        	<Form>
            <Form.Control
              placeholder="Укажите номер фотографии"
              type="number"
              onChange={event => setOrder(event.target.value)}
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
					onClick={addPhoto}>
						Добавить фото
					</Button>
			</Modal.Footer>
		</Modal>
  )
})  

export default AddPhoto