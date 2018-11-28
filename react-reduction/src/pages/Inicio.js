import React from 'react';
import '../styles/CardEventos.css';
import ecommerce from '../styles/image/ecommerce.jpeg';
import eventos from '../styles/image/eventos.jpeg';


import Page from 'components/Page';
import {
  Card,
  Col,
  Row,
  CardImgOverlay,
  CardTitle,
  CardText
} from 'reactstrap';
import {browserHistory} from 'react-router';
  var toque = 0
class Inicio extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        eventos: props.text,
        gremio: props.text
        }
    }
  componentDidMount(){
    setInterval(()=>{
      if(toque == 1){
      this.setState({eventos: 'Eventos' })
      this.setState({gremio: '' })

      }
      else if(toque == 2){
        this.setState({gremio: 'Loja Do Gremio' })
        this.setState({eventos: '' })
        }
    },5)
  }
  moveR(){
    var element = document.getElementById("evento");
    element.classList.add("text-lojaL")
    var elementR = document.getElementById("evento");
    elementR.classList.add("text-titleR")
    toque =1
  }
  move(){
    let element = document.getElementById("LojadoGrêmio");
    element.classList.add("text-loja")
    let elementR = document.getElementById("LojadoGrêmio");
    elementR.classList.add("text-title")
    toque =2
  }
  displayNoneR(){
    let element = document.getElementById("evento");
    element.classList.remove("text-lojaL");
    let elementR = document.getElementById("evento");
    elementR.classList.remove("text-titleR");
  }
  displayNone(){
    let element = document.getElementById("LojadoGrêmio");
    element.classList.remove("text-loja");
    let elementR = document.getElementById("LojadoGrêmio");
    elementR.classList.remove("text-title");
  }
  Chamada(){
    browserHistory.push('/Login')
  }
  render() {
    return (
      <Page className="body-inicio">
        <Row>
          <Col className="card-item">
            <Card  inverse className="text-center cardInicio" onMouseLeave={this.displayNone} onMouseOver={this.move}  >
              <img className="card-item"src={ecommerce}/>
              <CardImgOverlay>
                <CardTitle id='LojadoGrêmio'>
                  <h3 id="lojaCard">{this.state.gremio}</h3>
                </CardTitle>
              </CardImgOverlay>
            </Card>
          </Col>

          <Col className="card-item">
            <Card inverse className="text-center cardInicio" onMouseLeave={this.displayNoneR} onMouseOver={this.moveR} onClick={this.Chamada}>
            <img className="card-item"src={eventos}/>
              <CardImgOverlay>
              <CardTitle id="evento">
                  <h3 id="lojaCard">{this.state.eventos}</h3>
              </CardTitle>
              </CardImgOverlay>
            </Card>
          </Col>

        </Row>
      </Page>
    );
  }
}
export default Inicio;
