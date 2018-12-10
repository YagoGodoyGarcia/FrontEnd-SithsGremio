import React from 'react';
import bn from 'utils/bemnames';
import PropTypes from 'prop-types';
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
  Navbar,
  // NavbarToggler,
  Nav,
  CardTitle,
  Card,
  Col
} from 'reactstrap';
import axios from 'axios';
import { browserHistory } from 'react-router';

import {
  MdClearAll,
} from 'react-icons/lib/md';


const bem = bn.create('header');


class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();
    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };
  state = {
    modal: false,
    backdrop: true,
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };
  alterarSenha = modalType => () => {
    let senha = document.getElementById("senha").value
    let senhaConfirma = document.getElementById("senhaConfirma").value
    if (senha == senhaConfirma) {
      axios.post(`http://localhost:8080/alterarSenha`, {
        id_aluno: localStorage.idAluno,
        senha: senha
      })
        .then(function (response) {

        })
      this.setState({
        modal: !this.state.modal,
      });
    } else {
      document.getElementById('statusModal').innerHTML = 'As senhas não são iguais!'
    }
  }
  render() {
    return (
      <div>
        <Navbar light className={bem.b('bg-white')}>
          <Nav navbar className="mr-2">
            <Button id="header" outline onClick={this.handleSidebarControlButton}>
              <MdClearAll size={25} />
            </Button>
          </Nav>
          <CardTitle id="ola" innerHTML="Ola" onClick={this.toggle}>{"Olá " + localStorage.getItem('nome')}</CardTitle>
        </Navbar>
        <Modal
          id="modalSala"
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Evento</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="exampleUrl">Senha</Label>
              <Input
                type="password"
                name="password"
                ref="senha"
                id="senha"
                placeholder="password"
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleUrl">Confirmar Senha</Label>
              <Input
                type="password"
                name="password"
                ref="senha"
                id="senhaConfirma"
                placeholder="password"
              />
            </FormGroup>
            <Label for="exampleNumber" id="statusModal"></Label>
          </ModalBody>
          <ModalFooter>
            <Button id="valid" color="success" onClick={this.alterarSenha()}>
              Cadastrar
            </Button>
            <Button id="cancel" color="danger" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Header;
