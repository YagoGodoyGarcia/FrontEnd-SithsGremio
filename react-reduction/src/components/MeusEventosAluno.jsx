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

class MeusEventosAluno extends React.Component {
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
            axios.get(`http://localhost:8080/EventosAluno?id_aluno=`+localStorage.idAluno)
                .then(function (result) {
                    th.setState({
                        customersList: result.data
                    });
                });
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
            {this.state.customersList.map((dynamicData) =>
                <Card className="CardContainer">
                    <Col lg={12} md={6} sm={6} xs={12}>
                        <NumberWidget
                            title={dynamicData.nome}
                            number={dynamicData.data}
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
                    <Button color="danger" size="sm" block onClick={this.toggle}>
                        Sair
                        </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
}


export default MeusEventosAluno;