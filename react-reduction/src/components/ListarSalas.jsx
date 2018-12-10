import React from 'react';
import axios from 'axios';

import {
    Card,
    Col,
    Button,
    CardText,
    CardTitle
} from 'reactstrap';
class ListarSalas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customersList: [],
            customersListSalas: [],
            interno: [],
            externo: []
        };
    }
    componentDidMount() {
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
        }, 5000)
    }
    excluirSala = idSalaClick => () => {
        axios.post(`http://localhost:8080/DeleteSala?id_sala=` + idSalaClick)
            .then(function (response) {
                alert("Sala excluida com sucesso!");
            })
            .catch(error => {
                alert(error.response.data)
            });
    }
    render() {
        return (
            <div>
                <div className="divAEsquerda">
                    <br />
                    {this.state.interno.map((dynamicData) =>
                        <Card className="CardContainerSala">
                            <Col md={12} sm={6} xs={12}>
                                <br></br>
                                <CardTitle className="text-center">Sala {dynamicData.numero}</CardTitle>
                                <CardTitle className="text-center">Capacidade {dynamicData.capacidade}</CardTitle>
                                <Button color="danger" size="sm" block onClick={this.excluirSala(dynamicData.idSala)}>Remover Sala</Button>
                                <br></br>
                            </Col>
                        </Card>
                    )}
                    {this.state.externo.map((dynamicData) =>
                        <Card className="CardContainerSala">
                            <Col md={12} sm={6} xs={12}>
                                <br></br>
                                <CardTitle className="text-center"> {dynamicData.descricao}</CardTitle>
                                <Button id="cancel" color="danger" size="sm" block onClick={this.excluirSala(dynamicData.idSala)}>Remover Sala</Button>
                                <br></br>
                            </Col>
                        </Card>
                    )}
                </div>
            </div>
        )
    }
}


export default ListarSalas;