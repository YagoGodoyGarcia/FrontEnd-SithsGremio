import React from 'react';
import axios from 'axios';

import {
    Card,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    Label,
    CardText,
    CardBody
} from 'reactstrap';

import { NumberWidget } from 'components/Widget';

var ListaPresent = [];
var EventoPresent = [];
class ListarEventosAlunos extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            customersList: [],
            customersListSalas: [],
        };
    }
    componentDidMount() {
        setInterval(() => {
            var th = this;
            axios.get(`http://localhost:8080/ListaEvento`)
                .then(function (result) {
                    th.setState({
                        customersList: result.data
                    });
                });

            if (EventoPresent.length == 0 || EventoPresent == undefined) {
                this.state.customersList.map(function (element, i) {
                    for (var i = 0; i < element.alunos.length; i++) {
                        if (element.alunos[i].idAluno) {
                            if (element.alunos[i].idAluno != localStorage.idAluno) {
                                ListaPresent.push(element.idEvento)
                            }
                        }
                    }

                }
                )
                console.log(ListaPresent)
                var th = this;
                for (var i = 0; i < ListaPresent.length; i++) {
                    axios.get(`http://localhost:8080/OneEvento?id_evento=` + ListaPresent[i])
                        .then(function (result) {
                            EventoPresent.push(result.data)
                        });
                }
            }
        }, 5000)
    }
    state = {
        modal: false,
        backdrop: true,
    };
    verMaisEv = idEventoClick => (modalType) => {
        axios.get(`http://localhost:8080/OneEvento?id_evento=` + idEventoClick)
            .then(function (result) {
                document.getElementById("nomeEvento").innerHTML = result.data.nome
                document.getElementById("palestrante").innerHTML = "Palestrate: " + result.data.palestrante
                document.getElementById("data").innerHTML = "Data: " + result.data.data.split('-').reverse().join('/')
                document.getElementById("hora").innerHTML = " Hora: " + result.data.hora
                document.getElementById("descricao").innerHTML = result.data.descricao
                document.getElementById("sala").innerHTML = "Sala: " + result.data.sala.idSala
                document.getElementById("participar").value = result.data.idEvento
            });
        this.setState({
            modal: !this.state.modal,
        });
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    };

    entrarNoEvento() {
        let idEvento = document.getElementById("participar").value
        let idAuno = localStorage.getItem("idAluno")
        axios.post(`http://localhost:8080/AlunoNoEvento`, {
            id_evento: idEvento,
            id_aluno: idAuno
        })
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>

                {EventoPresent.map((dynamicData) =>
                    <Card className="CardContainer">
                        <Col lg={12} md={6} sm={6} xs={12}>
                            <NumberWidget
                                title={dynamicData.nome}
                                number={dynamicData.data.split('-').reverse().join('/')}
                                color="secondary"
                                progress={{
                                    value: 60,
                                    label: 'Vagas Ocupadas',
                                }}
                                className="BorderCard"
                            />
                            <Button color="success" className="verMaisEventAluno" size="sm" block onClick={this.verMaisEv(dynamicData.idEvento)} >Ver Mais</Button>
                            <br />
                        </Col>
                    </Card>
                )}
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        <Label id="nomeEvento"></Label>
                    </ModalHeader>
                    <ModalBody>
                        <Label id="palestrante"></Label> <p />
                        <Label>Descrição: </Label>
                        <CardBody className="term-style">
                            <CardText id="descricao" className="register">

                            </CardText>
                        </CardBody>
                        <Label id="data"></Label> <p />
                        <Label id="hora"></Label> <p />
                        <Label id="sala"></Label>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" id="participar" onClick={this.entrarNoEvento}>
                            Participar
                        </Button>
                        <Button color="danger" onClick={this.toggle}>
                            Sair
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}


export default ListarEventosAlunos;