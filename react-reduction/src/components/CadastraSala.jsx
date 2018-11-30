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
            error:'',
            local: props.texto
        };
    }
    cadastrar = modalType => () => {
        let numeroSala = document.getElementById("numeroSala").value
        let objSala = document.getElementById("capacidadeSala");
        let capacideSala = objSala.options[objSala.selectedIndex].value;
        let descricaoEvento = document.getElementById("localExterno").value;
        var ambiente = document.getElementById("ambiente").value ;
        if(ambiente ==='Interno'){
            if (numeroSala !== "" && capacideSala !== "" && numeroSala != 0) {
                axios.post(`http://localhost:8080/SalaRegistration`, {
                    numero: numeroSala,
                    capacidade: capacideSala,
                    disponibilidade: true,
                    descricao: ""
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
                this.setState({error: "Preencha todos os campos!"})
            }
        }
        else if(ambiente ===''){
            this.setState({error: "Escolha o local!"})
        }
        else{
            if (descricaoEvento !== "") {
                axios.post(`http://localhost:8080/SalaRegistration`, {
                    numero: 0,
                    capacidade: 0,
                    disponibilidade: true,
                    descricao: descricaoEvento
                })
                    .then(function (response) {
                        document.getElementById("numeroSala").value = ""
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                    this.setState({
                        modal: !this.state.modal,
                    });
            } else {
                this.setState({error: "Preencha todos os campos!"})
            }
        }
    }
    tipoAmbiente(){
        const ambiente = document.getElementById("ambiente").value ;
        if(ambiente ==='Interno'){
            document.getElementById("idSala").style.display="block";
            document.getElementById("idExterno").style.display="none";

        }
        else if(ambiente ===''){
            document.getElementById("idSala").style.display="none";
            document.getElementById("idExterno").style.display="none";
        }
        else{
            document.getElementById("idSala").style.display="none";
            document.getElementById("idExterno").style.display="block";
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
                            <Label for="exampleText">Tipo</Label>
                            <Input type="select" name="select" id="ambiente" onClick={this.tipoAmbiente} >
                                <option value="">Escolha</option>
                                <option value="Interno">Interno</option>
                                <option value="Externo">Externo</option>
                            </Input>
                        </FormGroup>
                        <FormGroup id="idSala" style={{display: 'none'}}>
                            <Label for="exampleText">Capacidade de Pessoas</Label>
                                <Input type="select" name="select" id="capacidadeSala">
                                    <option value="20">20</option>
                                    <option value="40">40</option>
                                    <option value="50">50</option>
                                    <option value="60">60</option>
                                </Input>
                             <Label for="exampleNumber" style={{marginTop: '10px'}}>Numero da Sala</Label>
                            <Input
                                type="number"
                                name="number"
                                id="numeroSala"
                                placeholder="numero da sala"
                            />
                        </FormGroup>
                        <FormGroup id="idExterno" style={{display: 'none'}}>
                        <Label for="exampleText">Descreva o Local</Label>
                            <Input
                                type="text"
                                name="externo"
                                id="localExterno"
                                placeholder="Local"
                            />
                        </FormGroup>
                        <Label for="exampleNumber" id="status"></Label>
                        <spam id="spamId"></spam>
                        <Label for="exampleNumber" id="statusModal">{this.state.error}</Label>
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