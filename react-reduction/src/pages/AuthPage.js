import TelaLogin, { STATE_LOGIN } from 'components/TelaLogin';
import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import login from"../styles/image/login.jpeg"
import "../styles/CardEventos.css"

class AuthPage extends React.Component {
  handleAuthState = authState => {
    if (authState === STATE_LOGIN) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/signup');
    }
  };

  handleLogoClick = () => {
    this.props.history.push('/');
  };

  render() {
    return (
      <Row
        style={{
          width: '100%',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <img className="imgLogin" src={login}/>
        <Col md={6} lg={4}>
          <Card body style={{opacity: 0.9}}>
            <TelaLogin
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
            />
          </Card>
        </Col>
      </Row>
    );
  }
}

export default AuthPage;
