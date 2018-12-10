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
            interno: [],
            externo: [],
            valida: '',
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
            this.state.interno = [];
            this.state.externo = [];
            for (var i = 0; i < this.state.customersListSalas.length; i++) {
                if (this.state.customersListSalas[i].numero == 0) {
                    this.state.externo.push(this.state.customersListSalas[i])
                }
                else {
                    this.state.interno.push(this.state.customersListSalas[i])
                }

            }
        }, 500)
    }
    cadastrar = modalType => () => {
        var th = this
        let nomeEv = document.getElementById("nomeEvento").value
        let palestranteEv = document.getElementById("palestrante").value
        let dataEv = document.getElementById("data").value
        let horaEv = document.getElementById("hora").value
        let descricaoEv = document.getElementById("descricao").value
        let atual = new Date()
        let objSala
        let sala
        const ambiente = document.getElementById("Ambiente").value;
        if (ambiente === 'Interno') {
            objSala = document.getElementById("sala");
            sala = objSala.options[objSala.selectedIndex].value;
        }
        else if (ambiente === 'Externo') {
            objSala = document.getElementById("salaEx");
            sala = objSala.options[objSala.selectedIndex].value;
        }
        // if (document.getElementById('data') !== null) {
        //     var splitData = []
        //     splitData = dataEv.split('-')
        //     console.log(splitData)
        // }
        if (ambiente === '') {
            document.getElementById('status').innerHTML = 'Escolha um local!';
        } else {
            if (nomeEv !== "" && palestranteEv !== "" && dataEv !== "" && horaEv !== "" && descricaoEv !== "" && sala != undefined) {
         axios.post(`http://localhost:8080/Data`, {
                    data: dataEv,
                    idSala: sala
                })
                    .then(function (response) {
                        th.setState({
                            valida: response.data,
                          });
                    })
                    console.log(this.state.valida)       
             if(this.state.valida === true){
                 axios.post(`http://localhost:8080/EventoRegistration`, {
                     nome: nomeEv,
                     data: dataEv,
                     hora: horaEv,
                     descricao: descricaoEv,
                     palestrante: palestranteEv,
                     sala: sala
                 })
                     .then(function (response) {
                        
                             document.getElementById("nomeEvento").value = ""
                             document.getElementById("palestrante").value = ""
                             document.getElementById("data").value = ""
                             document.getElementById("hora").value = ""
                             document.getElementById("descricao").value = ""
                     })
                     this.setState({
                         modal: !this.state.modal,
                     });
             }else{
                document.getElementById('status').innerHTML = 'Esse local já possui um evento na data escolhida!';
             }
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
    tipoAmbiente() {
        const ambiente = document.getElementById("Ambiente").value;
        if (ambiente === 'Interno') {
            document.getElementById("idSala").style.display = "block";
            document.getElementById("idExterno").style.display = "none";

        }
        else if (ambiente === '') {
            document.getElementById("idSala").style.display = "none";
            document.getElementById("idExterno").style.display = "none";
        }
        else {
            document.getElementById("idSala").style.display = "none";
            document.getElementById("idExterno").style.display = "block";
        }
    }

    render() {
        return (
            <div>
                <Button id="cadastroEvent" color="success" size="sm" onClick={this.toggle}>Novo Evento</Button>
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
                            <Label for="exampleText">Tipo</Label>
                            <Input type="select" name="select" id="Ambiente" onClick={this.tipoAmbiente} >
                                <option value="">Escolha o Ambiente do Evento</option>
                                <option value="Interno">Interno</option>
                                <option value="Externo">Externo</option>
                            </Input>
                        </FormGroup>
                        <FormGroup id="idSala" style={{ display: 'none' }}>
                            <Label for="exampleText">Sala</Label>
                            <Input type="select" name="select" id="sala">
                                {this.state.interno.map((dynamicData) =>
                                    <option value={dynamicData.idSala}>{dynamicData.numero}</option>
                                )}
                            </Input>
                        </FormGroup>
                        <FormGroup id="idExterno" style={{ display: 'none' }}>
                            <Label for="exampleText">Externo</Label>
                            <Input type="select" name="select" id="salaEx">
                                {this.state.externo.map((dynamicData) =>
                                    <option value={dynamicData.idSala}>{dynamicData.descricao}</option>
                                )}
                            </Input>
                        </FormGroup>
                        <Label for="exampleNumber" id="status"></Label>
                    </ModalBody>
                    <ModalFooter>
                        <Button id="sucessCadastro"color="success" onClick={this.cadastrar()}>
                            Salvar
                        </Button>
                        <Button id="cancel" color="danger" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}


export default CadastraEvento;