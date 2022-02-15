import React, {useState, useContext} from "react"
import {Modal, Form, Button, Container, Dropdown} from "react-bootstrap"
import {Context} from "../.."
import {observer} from "mobx-react-lite"
import {createFlower, fetchFlowers, fetchSubGroups} from "../../http/flowerAPI"
import CreateGroup from "./CreateGroup"
import CreateSubGroup from "./CreateSubGroup"

const CreateFlower = observer(({show, onHide}) => {
	const {store} = useContext(Context)
	const [groupVisible, setGroupVisible] = useState(false)
	const [subGroupVisible, setSubGroupVisible] = useState(false)
	const [name, setName] = useState("")
  const [text, setText] = useState("")
	const [price, setPrice] = useState("100")

	const addFlower = () => {
		createFlower({name, text, price, subGroupId: store.selectedSubGroup.id})
			.then(data => {
				store.setFlowers(data)
				store.setSelectedGroup({})
				store.setSelectedSubGroup({})
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
					<Modal.Title >Описание растения</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Control
							value={name}
							placeholder={"Заголовок (название растения)"}
							onChange={event => setName(event.target.value)}
						/>	
						<div className="d-flex justify-content-around" >
							<Dropdown>
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
											onClick={() => {
												store.setSelectedGroup(group)
												store.setSelectedSubGroup({})
												fetchSubGroups(store.selectedGroup.id).then(data => store.setSubGroups(data))
											}}
										>
											{group.name}
										</Dropdown.Item> 
									)}
								</Dropdown.Menu>
							</Dropdown>
							<Dropdown>
								<Dropdown.Toggle 
									variant="outline-dark" 
									style={{border: "none"}}
									// onClick={() => fetchSubGroups(store.selectedGroup.id).then(data => {
									// 	store.setSubGroups(data)
									// 	console.log(store.subGroups)
									// })}
								>
									{store.selectedSubGroup.name || "Выбрать подгруппу"} 
								</Dropdown.Toggle>
								<Dropdown.Menu>
									{store.subGroups.map(subGroup =>
										<Dropdown.Item 
											key={subGroup.id}	
											onClick={() => store.setSelectedSubGroup(subGroup)}
										>
											{subGroup.name}
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
							<Button
								variant="outline-dark" c
								style={{border:"none"}}
								onClick={() => setSubGroupVisible(true)}
							>
								Добавить подгруппу
							</Button>
              <div className="d-flex justify-content-between align-items-center" style={{width: "18vw"}}>
                Цена:
                <Form.Control
                	style={{width: "5wv"}}
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
			<CreateSubGroup show={subGroupVisible} onHide={() => setSubGroupVisible(false)} />
		</Container>
  )
})  

export default CreateFlower