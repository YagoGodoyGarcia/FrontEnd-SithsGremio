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
<<<<<<< Updated upstream
            internoList: [],
            externoList: [],
=======
            customersListSalas: [],
            interno:[],
            externo:[]
>>>>>>> Stashed changes
        };
    }
    componentDidMount() {
        setInterval(() => {
            var th = this;
            axios.get(`http://localhost:8080/ListaSala`)
                .then(function (result) {
                    console.log(result)
                    th.setState({
                        customersListSalas: result.data
                    });
                });
<<<<<<< Updated upstream
            this.state.internoList = [];
            this.state.externoList = [];
            for (var i = 0; i < this.state.customersList.length; i++) {
                if (this.state.customersList[i].numero == 0) {
                    this.state.externoList.push(this.state.customersList[i])
                } else {
                    this.state.internoList.push(this.state.customersList[i])
                }
            }
            console.log("Ex")
            console.log(this.state.externoList)
            console.log("in")
            console.log(this.state.internoList)
            }, 5000)
=======
                this.state.interno=[];
                this.state.externo=[];
                console.log(this.state.customersListSalas)

                for(var i = 0;i<this.state.customersListSalas.length;i++){
                    if(this.state.customersListSalas[i].numero == 0){
                        this.state.externo.push(this.state.customersListSalas[i])
                    }
                    else{
                        this.state.interno.push(this.state.customersListSalas[i])
                    }

                }
                console.log(this.state.interno)
                console.log(this.state.externo)
        }, 5000)
        
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                    {this.state.externoList.map((dynamicData) =>
=======
                    {this.state.interno.map((dynamicData) =>
>>>>>>> Stashed changes
                        <Card className="CardContainerSala">
                            <Col md={12} sm={6} xs={12}>
                                <br></br>
                                <CardTitle className="text-center">Sala {dynamicData.numero}</CardTitle>
            
                                <Button color="danger" size="sm" block onClick={this.excluirSala(dynamicData.idSala)}>Remover Sala</Button>
                                <br></br>
                            </Col>
                        </Card>
                    )}
                    {this.state.internoList.map((dynamicData) =>
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
                    {this.state.externo.map((dynamicData) =>
                        <Card className="CardContainerSala">
                            <Col md={12} sm={6} xs={12}>
                            <br></br>
                                <CardTitle className="text-center"> {dynamicData.descricao}</CardTitle>
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