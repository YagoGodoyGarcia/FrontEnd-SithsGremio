import React from 'react';

import Page from 'components/Page';
import {
  Card,
  Col,
  Row,
  CardImgOverlay,
  CardTitle,
  CardText
} from 'reactstrap';

class Inicio extends React.Component {

  teste(){
      console.log("Hello World");
      let now = new Date()

      console.log("Hoje é " + now.getDay() + ", " + now.getDate() + " de " + now.getMonth() + " de " + now.getFullYear());
  }
  render() {
    return (
      <Page>
        <Row>

          <Col md={6} sm={6} xs={12}>
            <Card inverse className="text-center cardInicio" onClick={this.teste} >
              <CardImgOverlay>
                <CardTitle>Card Title</CardTitle>
                <CardText>inversed card</CardText>
                <CardText>
                      
                        <small className="text-muted"  id="lojaCard">
                          Loja do Grêmio
                        </small>
                </CardText>
              </CardImgOverlay>
            </Card>
          </Col>

          <Col md={6} sm={6} xs={12}>
            <Card inverse className="text-center cardInicio" id="eventoCard">
              <CardImgOverlay>
                <CardTitle>Card Title</CardTitle>
                <CardText>inversed card</CardText>
                <CardText>
                  <small className="text-muted">
                    Grêmio Eventos
                      </small>
                </CardText>
              </CardImgOverlay>
            </Card>
          </Col>

        </Row>
      </Page>
    );
  }
}
export default Inicio;
