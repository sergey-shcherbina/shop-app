import React from "react"
import {Modal, Image, CloseButton} from "react-bootstrap"

const FullScreen = ({show, onHide, im}) => {
	return (
		<Modal show={show} onHide={onHide} im={im} fullscreen={true}>
      
      <div  className="p-2"
        style={{margin: "0 0 -50px auto", position: "relative", zIndex: "1"}}
        onClick={() => onHide()}
      >
        <CloseButton variant="white"></CloseButton>
      </div>
      <Image src={process.env.REACT_APP_API_URL + im} style={{width: "100vw"}} />
		</Modal>
  )
}  

export default FullScreen