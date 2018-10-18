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

class CadastraSala extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customersList: [],
            numero: '',
            capacide: ''
        };
    }
    cadastra() {
        {
            var th = this;
            console.log(this.numero,this.capacide)
            axios.get(`http://localhost:8080/ListaEvento`)
                .then(function (result) {
                    th.setState({
                        customersList: result.data
                    });
                });

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

        NumeroChange (evt) {
            this.setState({ numero: evt.target.value });
          }
          
         CapacidadeChange (evt) {
            this.setState({ capacide: evt.target.value });
          }
        render() {
            return (
                <div>


                    <Button color="success" size="sm" onClick={this.toggle()}>Nova Sala</Button>


                    <Modal
                        isOpen={this.state.modal}
                        toggle={this.toggle()}
                        className={this.props.className}>
                        <ModalHeader toggle={this.toggle()}>Sala</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="exampleNumber">Numero da Sala</Label>
                                <Input
                                    type="number"
                                    name="number"
                                    id="numeroSala"
                                    placeholder="numero da sala"
                                    onChange={this.NumeroChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleNumber">Capacidade da Sala</Label>
                                <Input
                                    type="number"
                                    name="number"
                                    id="capacidadeSala"
                                    placeholder="Capacidade da sala"
                                    onChange={this.CapacidadeChange}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.cadastra()}>
                                Cadastrar
                            </Button>
                        </ModalFooter>
                    </Modal>

                </div>
            )
        }
    }


    export default CadastraSala;