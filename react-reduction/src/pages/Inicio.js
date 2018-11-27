import React from 'react';
import '../styles/CardEventos.css';
import ecommerce from '../styles/image/ecommerce.jpg';
import eventos from '../styles/image/eventos.png';


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
class Inicio extends React.Component {

  Chamada(){
    browserHistory.push('/Login')
  }
  render() {
    return (
      <Page className="body-inicio">
        <Row>
          <Col className="card-item">
            <Card  inverse className="text-center cardInicio"  >
              <img className="card-item"src={ecommerce}/>
              <CardImgOverlay>
                <CardTitle className="text-loja">
                  <label className="text-title"  id="lojaCard">Loja do Grêmio</label>
                </CardTitle>
              </CardImgOverlay>
            </Card>
          </Col>

          <Col className="card-item">
            <Card inverse className="text-center cardInicio" onClick={this.Chamada}>
            <img className="card-item"src={eventos}/>
              <CardImgOverlay>
              <CardTitle className="text-lojaL">
                  <label className="text-titleR"  id="lojaCard">Eventos</label>
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
