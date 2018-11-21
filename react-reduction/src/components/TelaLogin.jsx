import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import axios from 'axios';
import {browserHistory} from 'react-router';
class TelaLogin extends React.Component {
  get isLogin() {
    return this.props.authState === STATE_LOGIN;
  }

  get isSignup() {
    return this.props.authState === STATE_SIGNUP;
  }

  changeAuthState = authState => event => {
    event.preventDefault();

    this.props.onChangeAuthState(authState);
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  renderButtonText() {
    const { buttonText } = this.props;

    if (!buttonText && this.isLogin) {
      return 'Login';
    }

    if (!buttonText && this.isSignup) {
      return 'Signup';
    }

    return buttonText;
  }
 
  auth() {
    console.log("Click")
    var th = this
    let emailAt = document.getElementById('email').value
    let senhaAt = document.getElementById('senha').value
    
    axios.post(`http://localhost:8080/LoginAuth`, {
      email: emailAt,
      senha: senhaAt
    })
      .then(function (response) {
        localStorage.setItem('Info', response.data.idAluno);
        localStorage.setItem('nome',  response.data.nome);
        localStorage.setItem('ra', response.data.ra);
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('senha', response.data.senha);
        localStorage.setItem('permissao', response.data.nivelPermissao);     
        if(localStorage.getItem('permissao') == 2){
          browserHistory.push('/ADM')
        }else{
          browserHistory.push('/ALUNO')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const {
      usernameLabel,
      usernameInputProps,
      passwordLabel,
      passwordInputProps,
      confirmPasswordLabel,
      confirmPasswordInputProps,
      children,
      onLogoClick,
    } = this.props;
    localStorage.clear();
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for={usernameLabel}>{usernameLabel}</Label>
          <Input id="email"{...usernameInputProps} />
        </FormGroup>
        <FormGroup>
          <Label for={passwordLabel}>Senha</Label>
          <Input id="senha"{...passwordInputProps} />
        </FormGroup>
        {this.isSignup && (
          <FormGroup>
            <Label for={confirmPasswordLabel}>{confirmPasswordLabel}</Label>
            <Input {...confirmPasswordInputProps} />
          </FormGroup>
        )}
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.auth}>
          {this.renderButtonText()}
        </Button>

        <div className="text-center pt-1">
          <h6>or</h6>
          <h6>
            {this.isSignup ? (
              <a href="#login" onClick={this.auth}>
                Login
              </a>
            ) : (
                <a href="#signup" onClick={this.changeAuthState(STATE_SIGNUP)}>
                  Signup
              </a>
              )}
          </h6>
        </div>

        {children}
      </Form>
    );
  }
}

export const STATE_LOGIN = 'LOGIN';
export const STATE_SIGNUP = 'SIGNUP';

TelaLogin.propTypes = {
  authState: PropTypes.oneOf([STATE_LOGIN, STATE_SIGNUP]).isRequired,
  showLogo: PropTypes.bool,
  usernameLabel: PropTypes.string,
  usernameInputProps: PropTypes.object,
  passwordLabel: PropTypes.string,
  passwordInputProps: PropTypes.object,
  confirmPasswordLabel: PropTypes.string,
  confirmPasswordInputProps: PropTypes.object,
  onLogoClick: PropTypes.func,
};

TelaLogin.defaultProps = {
  authState: 'LOGIN',
  showLogo: true,
  usernameLabel: 'Email',
  usernameInputProps: {
    type: 'email',
    placeholder: 'your@email.com',
  },
  passwordLabel: 'Password',
  passwordInputProps: {
    type: 'password',
    placeholder: 'your password',
  },
  confirmPasswordLabel: 'Confirm Password',
  confirmPasswordInputProps: {
    type: 'password',
    placeholder: 'confirm your password',
  },
  onLogoClick: () => { },
};

export default TelaLogin;
