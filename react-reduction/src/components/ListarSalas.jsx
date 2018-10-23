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
            axios.get(`http://localhost:8080/ListaSalaDisponivel`)
                .then(function (result) {
                    th.setState({
                        customersList: result.data
                    });
                });
        }, 5000)
        setInterval(() => {
            var th2 = this;
            axios.get(`http://localhost:8080/ListaSalaNDisponivel`)
                .then(function (result) {
                    th2.setState({
                        customersListN: result.data
                    });
                });
        }, 5000)

    }
    
    
    function(id) {
        var th3= this;
        axios.post(`http://localhost:8080/DeleteSala`, {
            id_sala: id
        })
        .then(function (response) {
            console.log("Deletado");
        })
        .catch(function (error) {
            console.log(error);
        });  
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
                                <CardTitle className="text-center">Sala {dynamicData.numero}</CardTitle>
                                <CardText>
                                    Capacidade: {dynamicData.capacidade}
                                </CardText>
                                <Button color="danger" size="sm" block onclick = {this.function(dynamicData.idSala)}>Remover Sala</Button>
                                <br />
                            </Col>
                        </Card>
                    )}
                </div>
                {/* <div className="divAEsquerda">
                    <br />
                    <CardTitle>Não Disponiveis</CardTitle>
                    {this.state.customersListN.map((dynamicData) =>
                        <Card className="CardContainerSala">
                            <Col md={12} sm={6} xs={12}>
                                <CardTitle className="text-center">Sala {dynamicData.numero}</CardTitle>
                                <CardText>
                                    Capacidade: {dynamicData.capacidade}
                                </CardText>
                            </Col>
                        </Card>
                    )}
                </div> */}
            </div>
        )
    }
}


export default ListarSalas;