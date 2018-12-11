import PropTypes from 'prop-types';
import React from 'react';
import '../styles/components/_content.scss'
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import '../styles/CardEventos.css'
import axios from 'axios';
import { browserHistory } from 'react-router';
class TelaLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true,
    };
  }
  valida() {
    let separa
    let separa2
    var danger = 0
    let emailAluno = document.getElementById("emailCadastrar").value
    separa = emailAluno.split('')
    for (var i = 0; i < separa.length; i++) {
      if (separa[i] == "@") {
        separa2 = emailAluno.split('@')
      }
      else {
        danger = danger + 1
        console.log(danger)
        if (danger == separa.length) {
          var element = document.getElementById("emailCadastrar");
          var element2 = document.getElementById("emailInvalido");
          element.classList.add("border-danger")
          element2.classList.add("displayblock")
          document.getElementById("valid").disabled = true;
        }
      }
    }
    if (separa2 != undefined) {
      for (var i = 0; i < separa2.length; i++) {
        separa = separa2[i].split('.')
        if (separa[i] == 'com') {
          var element = document.getElementById("emailCadastrar");
          var element2 = document.getElementById("emailInvalido");
          element2.classList.remove("displayblock")
          element.classList.remove("border-danger")
          document.getElementById("valid").disabled = false;
        }
      }
    }
  }
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
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  auth() {
    var th = this
    let emailAt = document.getElementById('email').value
    let senhaAt = document.getElementById('senha').value

    axios.post(`http://localhost:8080/LoginAuth`, {
      email: emailAt,
      senha: senhaAt
    })
      .then(function (response) {
        console.log(response.data.nivelPermissao)
        if (response.data !== "Login Incorreto") {
          localStorage.setItem('idAluno', response.data.idAluno);
          localStorage.setItem('nome', response.data.nome);
          localStorage.setItem('ra', response.data.ra);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('senha', response.data.senha);
          localStorage.setItem('permissao', response.data.nivelPermissao);
          if (localStorage.getItem('permissao') == 3) {
            browserHistory.push('/ADMaster')
          }
          else if (localStorage.getItem('permissao') == 2) {
            browserHistory.push('/ADM')
          } else {
            browserHistory.push('/ALUNO')
          }
        } else {
          document.getElementById('statusModal').innerHTML = 'Senha ou Email invalidos!'
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  cadastrarAluno = modalType => () => {
    let nomeAluno = document.getElementById("nome").value
    let raAluno = document.getElementById("ra").value
    let emailAluno = document.getElementById("emailCadastrar").value
    let senhaAluno = document.getElementById("senhaCadastro").value
    if (nomeAluno !== "" && raAluno !== "" && emailAluno !== "" && senhaAluno !== "") {
      axios.post(`http://localhost:8080/AlunoRegistration`, {
        nome: nomeAluno,
        ra: raAluno,
        email: emailAluno,
        senha: senhaAluno,
        nivelPermissao: 1
      })
        .then(function (response) {
          nomeAluno = document.getElementById("nome").value = ""
          raAluno = document.getElementById("ra").value = ""
          emailAluno = document.getElementById("emailCadastrar").value = ""
          senhaAluno = document.getElementById("senhaCadastro").value = ""
        })
        .catch(function (error) {
          console.log(error);
        });
      this.setState({
        modal: !this.state.modal,
      });
    } else {
      document.getElementById('statusModal').innerHTML = 'Email ou senha Invalida!';
    }
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
    } = this.props;
    localStorage.clear();
    return (

      <div>
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
          <Label for="exampleNumber" id="statusModal"></Label>
          <center><button id="loginUser" type="button" class="buttonlogin btn btn-primary" onClick={this.auth} style={{width: '80%'}}>Login</button></center>
          <hr />
          <center><button id="CadastraUser" type="button" class="buttonlogin btn btn-success" onClick={this.toggle} style={{width: '80%'}}>Cadastrar</button></center>
          {children}
        </Form>
        <Modal
          id="modalSala"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Evento</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="text">Nome</Label>
              <Input
                type="text"
                name="text"
                id="nome"
                ref="name"
                placeholder="Digite o nome"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="EmailInput">Email</Label>
              <Input
                type="email"
                name="email"
                ref="Email"
                id="emailCadastrar"
                placeholder="Email"
                onBlur={this.valida}
              />
              <Label className="displaynone" id="emailInvalido" style={{ color: "red", fontWeight: "bold", marginBottom: "0px" }}>Email Invalido</Label>
            </FormGroup>
            <FormGroup>
              <Label for="exampleNumber">RA</Label>
              <Input
                type="number"
                name="number"
                ref="num"
                id="ra"
                placeholder="RA"
                maxLength='8'
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleUrl">Senha</Label>
              <Input
                type="password"
                name="password"
                ref="senha"
                id="senhaCadastro"
                placeholder="password"
                maxLength='8'

              />
            </FormGroup>
            <Label for="exampleNumber" id="statusModal"></Label>
          </ModalBody>
          <ModalFooter>
            <Button id="valid" color="success" onClick={this.cadastrarAluno()}>
              Cadastrar
            </Button>
            <Button id="cancel"color="danger" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
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
