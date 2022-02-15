import React, {useContext} from 'react'
import {observer} from "mobx-react-lite"
import {Context} from ".."
import {Button} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {fetchFlowers} from "../http/flowerAPI"

const FlowerBar = observer(() => {
  const {store} = useContext(Context)
  const navigate = useNavigate()
  // const [hide, setHide] = useState(true)
  // store.selectedSubGroup.id
  // fetchFlowers().then(data => store.setFlowers(data))
  // .then(console.log(store.flowers))
  return (
		<div className="d-flex flex-column align-items-center">
      {store.flowers.map(flower =>
        <Button  
          key={flower.id}
          variant="outline-light" 
          style={{cursor: "pointer", marginTop: 2, border: "none"}}
          onClick={() => {
            store.setSelectedFlower(flower)
            navigate("/flower")
          }}
          // onMouseOver={() => {
          //   store.setSelectedGroup(group)
          // }}
        >
          <h5>{flower.name}</h5>
        </Button>
      )}
    </div>
  )
})

export default FlowerBar
    // <>
    // { hide &&
    //   <div className="d-flex flex-column align-items-center" 
    //       onMouseLeave={() => setHide(false)}
    //       >
    //        <Button 
    //       variant="outline-light" size="lg" style={{border: "none"}}
    //       onClick={() => navigate("/")}
    //     >
    //       Англиские
    //     </Button>
    //     <Button 
    //       variant="outline-light" size="lg" style={{border: "none"}}
    //       onClick={() => navigate("/home")}
    //     >
    //       Спреи
    //     </Button>
    //     <Button 
    //       variant="outline-light" size="lg" style={{border: "none"}}
    //       onClick={() => { 
    //         navigate("/gallery")
    //       }}
    //     >
    //       Флорибунда
    //     </Button>
    //   </div>
    // }
    // </>
  



