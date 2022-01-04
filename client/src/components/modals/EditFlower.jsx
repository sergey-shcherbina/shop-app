import React, {useState, useContext} from "react"
import {Modal, Form, Button, Container, Dropdown} from "react-bootstrap"
import {Context} from "../.."
import CreateGroup from "./CreateGroup"
import {observer} from "mobx-react-lite"
import {editFlower, removeFlower, fetchFlowers} from "../../http/flowerAPI"

const EditFlower = observer(({show, onHide}) => {
	const {store} = useContext(Context)
  const [price, setPrice] = useState("100")
	const [groupVisible, setGroupVisible] = useState(false)

	const addChanges = () => {
		editFlower(store.selectedFlower.id, {name: store.selectedFlower.name, text: store.selectedFlower.text, 
			price: store.selectedFlower.price, groupId: store.selectedGroup.id}).then(() => {
			fetchFlowers().then(data => store.setFlowers(data))
			onHide()
		})
	}
	const deleteFlower = () => {
		removeFlower(store.selectedFlower.id).then(() => {
			fetchFlowers().then(data => 
				store.setFlowers(data))
				onHide()
				
		})
	}
	
  return (
		<Container>
    	<Modal show={show} onHide={onHide} size="lg" >
				<Modal.Header closeButton onClick={onHide}>
					<Modal.Title >
						Редактирование описания
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
            <Form.Control
							value={store.selectedFlower.name}
							onChange={event => store.setSelectedFlower({...store.selectedFlower, ...{name: event.target.value}})}
						/>	
						<div className="d-flex justify-content-around" >
							<Dropdown drop="end">
								<Dropdown.Toggle 
									variant="outline-dark" 
									style={{border: "none"}}
								>
									{store.selectedGroup.name || "Изменить группу"} 
								</Dropdown.Toggle>
								<Dropdown.Menu>
									{store.groups.map(group =>
										<Dropdown.Item 
											key={group.id}	
											onClick={() => store.setSelectedGroup(group)}
										>
											{group.name}
										</Dropdown.Item> 
									)}
								</Dropdown.Menu>
							</Dropdown>
							<Button
								variant="outline-dark" 
								style={{border:"none"}}
								onClick={() => setGroupVisible(true)}
							>
								Добавить группу
							</Button>
              <div className="d-flex justify-content-between align-items-center" style={{width: "18vw"}}>
                Стоимость:
                <Form.Control
                	style={{width: "10vw"}}
                	type="number"
                  value={price}
                  onChange={event => setPrice(event.target.value)}
                />
              </div>
						</div>	
						<Form.Control
							style={{height: '60vh', marginTop: 5}}
							as="textarea"
							value={store.selectedFlower.text}
							onChange={event => store.setSelectedFlower({...store.selectedFlower, ...{text: event.target.value}})}
						/>		
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-danger" size="lg" onClick={deleteFlower}>Удалить описание</Button>
					<Button variant="outline-success" size="lg" onClick={addChanges}>Сохранить изменения</Button>
				</Modal.Footer>
			</Modal>
			<CreateGroup show={groupVisible} onHide={() => setGroupVisible(false)} />
		</Container>
  )
})  

export default EditFlower
