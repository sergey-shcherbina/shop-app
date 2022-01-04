import React, {useState, useContext} from "react"
import {Modal, Form, Button} from "react-bootstrap"
import {createImage, fetchImages} from "../../http/flowerAPI"
import {Context} from "../.."
import {observer} from "mobx-react-lite"

const AddImage = observer(({show, onHide}) => {

	const {store} = useContext(Context)
	const [file, setFile] = useState(null)
  const [order, setOrder] = useState("0") 
	const addImg = () => {
    const formData = new FormData()
    formData.append("flowerId", store.selectedFlower.id)
    formData.append("order", order)
    formData.append("img", file)
    createImage(formData).then(() => {
		  fetchImages().then(data => store.setImages(data))
			onHide()
    })}	
	return (
		<Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title>
          Добавление фото
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
					onClick={addImg}>
						Добавить фото
					</Button>
			</Modal.Footer>
		</Modal>
  )
})  

export default AddImage