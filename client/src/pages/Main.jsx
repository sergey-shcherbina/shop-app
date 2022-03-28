import React from "react"
import {Carousel, Container, Image} from "react-bootstrap"
import {baseURL} from "../http"
import {observer} from "mobx-react-lite"

const Main = () => {
  return (
    <Container className="d-flex justify-content-center mt-4" style={{width: "80%"}}>
      {/* <Container style={{maxHeight: "70vh"}}> */}
      <Carousel style={{border: "7px solid white"}}>
        <Carousel.Item interval={5000}>
          <Image
            className="d-block w-100" 
            // width={1000}
            // height={700}
            src={baseURL + "4000.jpg"}
          />
          <Carousel.Caption>
          <div style={{marginTop: "-50vh"}}>
              <h1>ЛЮБ0Й ТЕКСТ ЛЮБЫМ ШРИФТОМ</h1>
              <h3>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</h3>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <Image 
            className="d-block w-100"
              // height={700}
              // width={1000}
            // src={baseURL + "api/" + "2000.jpg"}
            src={baseURL + "2000.jpg"}
          />
          <Carousel.Caption>
            <div style={{marginTop: "-50vh"}}>
              <h1>ЛЮБ0Й ТЕКСТ ЛЮБЫМ ШРИФТОМ</h1>
              <h3>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</h3>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image 
            className="d-block w-100"
              // height={700}
              // width={1000}
            src={baseURL + "3000.jpg"}
            />
          <Carousel.Caption>
            <div style={{marginTop: "-50vh"}}>
              <h1>ЛЮБ0Й ТЕКСТ ЛЮБЫМ ШРИФТОМ</h1>
              <h3>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</h3>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image 
            className="d-block w-100"
              // height={700}
              // width={1000}
            src={baseURL + "5000.jpg"}
            />
          <Carousel.Caption>
            <div style={{marginTop: "-50vh"}}>
              <h1>ЛЮБ0Й ТЕКСТ ЛЮБЫМ ШРИФТОМ</h1>
              <h3>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</h3>
            </div>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    </Container>
  )
}

export default Main
