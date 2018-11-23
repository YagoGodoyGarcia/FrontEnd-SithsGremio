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

class CadastraEvento extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customersListEventos: [],
            customersListSalas: [],
        };
    }
    componentDidMount() {
        var th = this;
        axios.get(`http://localhost:8080/ListaEvento`)
            .then(function (result) {
                th.setState({
                    customersListEventos: result.data
                });
            });
        setInterval(() => {
            var th = this;
            axios.get(`http://localhost:8080/ListaSala`)
                .then(function (result) {
                    th.setState({
                        customersListSalas: result.data
                    });
                });
        }, 5000)
    }
    cadastrar = modalType => () => {
        var th = this
        let nomeEv = document.getElementById("nomeEvento").value
        let palestranteEv = document.getElementById("palestrante").value
        let dataEv = document.getElementById("data").value
        let horaEv = document.getElementById("hora").value
        let descricaoEv = document.getElementById("descricao").value
        let objSala = document.getElementById("sala");
        let salaEv = objSala.options[objSala.selectedIndex].value;
        let atual = new Date()
        if (dataEv.ge < atual.getFullYear()) {
            alert("Data Invalida Fdp!")

        } else {
            if (nomeEv != "" && palestranteEv != "" && dataEv != "" && horaEv != "" && descricaoEv != "" && salaEv != "") {
                axios.post(`http://localhost:8080/EventoRegistration`, {
                    nome: nomeEv,
                    data: dataEv,
                    hora: horaEv,
                    descricao: descricaoEv,
                    palestrante: palestranteEv,
                    sala: salaEv
                })
                    .then(function (response) {
                        console.log("Cadastrado");
                        document.getElementById("nomeEvento").value = ""
                        document.getElementById("palestrante").value = ""
                        document.getElementById("data").value = ""
                        document.getElementById("hora").value = ""
                        document.getElementById("descricao").value = ""


                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                this.setState({
                    modal: !this.state.modal,
                });
            } else {
                document.getElementById('status').innerHTML = 'Preencha todos os campos!';
            }
        }
    }
    state = {
        modal: false,
        backdrop: true,
    };

    toggle = () => {
        if (this.state.customersListSalas != "") {
            this.setState({
                modal: !this.state.modal,
            });
        } else {
            alert("Cadastre uma sala primeiro!");
        }
    };

    render() {
        return (
            <div>
                <Button color="success" size="sm" onClick={this.toggle}>Novo Evento</Button>
                <Modal
                    id="modalSala"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Evento</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="text">Nome do Evento</Label>
                            <Input
                                type="text"
                                name="text"
                                id="nomeEvento"
                                placeholder="Digite o nome"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleUrl">Palestrante</Label>
                            <Input
                                type="text"
                                name="text"
                                id="palestrante"
                                placeholder="Digite o nome"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleDate">Data</Label>
                            <Input
                                type="date"
                                name="date"
                                id="data"
                                placeholder="date placeholder"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleTime">Horario</Label>
                            <Input
                                type="time"
                                name="time"
                                id="hora"
                                placeholder="time placeholder"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Descrição</Label>
                            <Input type="textarea" name="text" id="descricao" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Sala</Label>
                            <Input type="select" name="select" id="sala">
                                {this.state.customersListSalas.map((dynamicData) =>
                                    <option value={dynamicData.idSala}>{dynamicData.numero}</option>
                                )}
                            </Input>
                            <Label for="exampleNumber" id="status"></Label>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.cadastrar()}>
                            Salvar
                        </Button>
                        <Button color="danger" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}


export default CadastraEvento;