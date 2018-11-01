import React from 'react';
import axios from 'axios';

import {
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    FormGroup,
    Label,
    Input
} from 'reactstrap';

class CadastraSala extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customersList: [],
        };
    }
    cadastrar = modalType => () => {
        let numeroSala = document.getElementById("numeroSala").value
        let objSala = document.getElementById("capacidadeSala");
        let capacideSala = objSala.options[objSala.selectedIndex].value;

        if (numeroSala !== "" && capacideSala !== "") {
            axios.post(`http://localhost:8080/SalaRegistration`, {
                numero: numeroSala,
                capacidade: capacideSala,
                disponibilidade: true
            })
                .then(function (response) {
                    console.log("Cadastrado");
                    document.getElementById("numeroSala").value = ""
                })
                .catch(function (error) {
                    console.log(error);
                });
                this.setState({
                    modal: !this.state.modal,
                });
        } else {
            document.getElementById('statusModal').innerHTML = 'Preencha todos os campos!';
        }

    }
    state = {
        modal: false,
        backdrop: true,
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };
    render() {
        return (
            <div>
                <Button color="success" size="sm" onClick={this.toggle}>Nova Sala</Button>
                <Modal
                    id="modalSala"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Sala</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="exampleNumber">Numero da Sala</Label>
                            <Input
                                type="number"
                                name="number"
                                id="numeroSala"
                                placeholder="numero da sala"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Sala</Label>
                            <Input type="select" name="select" id="capacidadeSala">
                                <option value="20">20</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                                <option value="60">60</option>
                            </Input>
                            <Label for="exampleNumber" id="status"></Label>
                            <spam id="spamId"></spam>
                        </FormGroup>
                        <Label for="exampleNumber" id="statusModal"></Label>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.cadastrar()} >
                            Cadastrar
                        </Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}


export default CadastraSala;