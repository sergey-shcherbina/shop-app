import React, {useContext, useState} from "react"
import {Container, Form, Button, Card, Row} from "react-bootstrap"
import {NavLink, useLocation, useNavigate} from "react-router-dom"
import {login, registration} from "../http/userAPI"
import {observer} from "mobx-react-lite"
import {Context} from ".."

const Auth = observer(() => {
	const {store} = useContext(Context)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
	const location = useLocation()
	const isLogin = location.pathname === "/login"
	const navigate = useNavigate()

	const signUser = async () => {
		 try {
			let data;
			if (isLogin) {
				data = await login(email, password)
				store.setUser(data)
			} else {
				data = await registration (email, password, name)
        store.setUser(data)
			}
			navigate("/")
		 } catch (err) {
		 	alert(err.response.data.message)
		}
	}

	return (
		<Container className="d-flex justify-content-center align-items-center">
			<Card style={{width: 600, border: "none", marginTop: "10vh"}} className="p-3">
				<h1 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h1>
				<Form className="d-flex flex-column mt-3">
    {!isLogin &&
						<Form.Control
							className="mt-3"
							style={{border: "none", borderBottom: "1px solid"}}
							placeholder="Введите имя и фамилию..."
							value={name}
							onChange={event => setName(event.target.value)}
						/>
					}		
					<Form.Control
						className="mt-3"
						style={{border: "none", borderBottom: "1px solid"}}
						placeholder="Введите  email..."
						value={email}
						onChange={event => setEmail(event.target.value)}
					/>
					<Form.Control
						type="password"
						className="mt-3"
						style={{border: "none", borderBottom: "1px solid"}}
						placeholder="Введите пароль..."
						value={password}
						onChange={event => setPassword(event.target.value)}
					/>
					<Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
						{isLogin ?
							<div className="d-flex justify-content-around">
								Нет аккаунта? 
								<NavLink to={"/registration"}> Зарегистрируем!? </NavLink>
							</div>
							:
							<div className="d-flex justify-content-around">
								Уже есть аккаунт?<NavLink to={"/login"}>Войдите!</NavLink>
							</div>
						}
						<Button
							variant={"outline-success"}
							className="mt-3"
							onClick={signUser}
						>
							{isLogin ? "Войти" : "Регистрация"}
						</Button>
						<Button
							variant={"outline-success"}
							className="mt-3"
							// onClick={click}
						>
							{"Войти c Google"}
						</Button>
						<Button
							variant={"outline-success"}
							className="mt-3"
							//onClick={click}
						>
							{"Войти c Facebook"}
						</Button>
					</Row>
				</Form>
			</Card>
		</Container>		
	);
})        

export default Auth
