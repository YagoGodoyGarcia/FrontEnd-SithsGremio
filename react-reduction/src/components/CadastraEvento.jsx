import React from 'react';
import axios from 'axios';
import { getColor } from 'utils/colors';

import {
    Card,
    Row,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    CardText,
    CardTitle,
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    FormFeedback,
} from 'reactstrap';

import {
    MdInsertChart,
    MdBubbleChart,
    MdPieChart,
    MdShowChart,
    MdPersonPin,
    MdRateReview,
    MdThumbUp,
    MdShare,
} from 'react-icons/lib/md';

import { NumberWidget, IconWidget } from 'components/Widget';


const today = new Date();
const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
);

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
    cadastrar() {
        var th = this
        let nomeEv = document.getElementById("nomeEvento").value
        let palestranteEv = document.getElementById("palestrante").value
        let dataEv = document.getElementById("data").value
        let horaEv = document.getElementById("hora").value
        let descricaoEv = document.getElementById("descricao").value
        let objSala = document.getElementById("sala");
        let salaEv = objSala.options[objSala.selectedIndex].value;

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
                    document.getElementById('status').innerHTML = 'Cadastro realizado com sucesso';
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            document.getElementById('status').innerHTML = 'Preencha todos os campos!';
        }

    }
    state = {
        modal: false,
        backdrop: true,
    };

    toggle = modalType => () => {
        if (!modalType) {
            return this.setState({
                modal: !this.state.modal,
            });
        }

        this.setState({
            [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
        });
    };

    render() {
        return (
            <div>


                <Button color="success" size="sm" onClick={this.toggle()}>Novo Evento</Button>


                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle()}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle()}>Evento</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="exampleUrl">Nome do Evento</Label>
                            <Input
                                type="url"
                                name="url"
                                id="nomeEvento"
                                placeholder="Digite o nome"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="exampleUrl">Palestrante</Label>
                            <Input
                                type="url"
                                name="url"
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
                        <Button color="success" onClick={this.cadastrar}>
                            Salvar
                    </Button>{' '}
                        <Button color="danger" onClick={this.toggle()}>
                            Cancel
                    </Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}


export default CadastraEvento;