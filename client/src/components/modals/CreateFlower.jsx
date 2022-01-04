import React, {useState, useContext} from "react"
import {Modal, Form, Button, Container, Dropdown} from "react-bootstrap"
import {Context} from "../.."
import {observer} from "mobx-react-lite"
import {createFlower, fetchFlowers} from "../../http/flowerAPI"
import CreateGroup from "./CreateGroup"

const CreateFlower = observer(({show, onHide}) => {
	const {store} = useContext(Context)
	const [groupVisible, setGroupVisible] = useState(false)
	const [name, setName] = useState("")
  const [text, setText] = useState("")
	const [price, setPrice] = useState("100")

	const addFlower = () => {
		createFlower({name, text, price, groupId: store.selectedGroup.id}).then(() => {
			fetchFlowers().then(data => store.setFlowers(data))
			store.setSelectedGroup("")
			setText("")
			setName("")
			setPrice("100")
			onHide()
		})
  }
	return (
		<Container>
    	<Modal show={show} onHide={onHide} size="lg" >
				<Modal.Header closeButton onClick={onHide}>
					<Modal.Title >
						Описание растения
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Control
							value={name}
							placeholder={"Заголовок (название растения)"}
							onChange={event => setName(event.target.value)}
						/>	
						<div className="d-flex justify-content-around" >
							<Dropdown drop="end">
								<Dropdown.Toggle 
									variant="outline-dark" 
									style={{border: "none"}}
								>
									{store.selectedGroup.name || "Выбрать группу"} 
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
							value={text}
							onChange={event => setText(event.target.value)}
						/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-success" size="lg" onClick={addFlower}>Добавить растение</Button>
				</Modal.Footer>
			</Modal>
			<CreateGroup show={groupVisible} onHide={() => setGroupVisible(false)} />
		</Container>
  )
})  

export default CreateFlower