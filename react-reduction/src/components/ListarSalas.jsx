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
            customersListN: [],
        };
    }
    componentDidMount() {
        setInterval(() => {
            var th = this;
            axios.get(`http://localhost:8080/ListaSala`)
                .then(function (result) {
                    th.setState({
                        customersList: result.data
                    });
                });
        }, 5000)
    }
    excluirSala = idSalaClick => () => {
        axios.post(`http://localhost:8080/DeleteSala?id_sala=` + idSalaClick)
            .then(function (response) {
                console.log(response.data)
                if (response.data !== "Ok") {
                    alert('Sala esta cadastrada em um evento');
                } else {
                    alert("Sala excluida com sucesso!");
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    render() {
        return (
            <div>
                <div className="divAEsquerda">
                    <br />
                    {/* <CardTitle>Disponiveis</CardTitle> */}
                    {this.state.customersList.map((dynamicData) =>
                        <Card className="CardContainerSala">
                            <Col md={12} sm={6} xs={12}>
                            <br></br>
                                <CardTitle className="text-center">Sala {dynamicData.numero}</CardTitle>
                                <CardText>
                                    Capacidade: {dynamicData.capacidade}
                                </CardText>
                                <Button color="danger" size="sm" block onClick={this.excluirSala(dynamicData.idSala)}>Remover Sala</Button>
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