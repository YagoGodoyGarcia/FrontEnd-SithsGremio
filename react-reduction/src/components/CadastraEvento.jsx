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
            customersList: [],
        };
    }
    componentDidMount() {
        
            var th = this;
            axios.get(`http://localhost:8080/ListaEvento`)
                .then(function (result) {
                    th.setState({
                        customersList: result.data
                    });
                });

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
                                id="exampleUrl"
                                placeholder="Digite o nome"
                            />
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="exampleUrl">Palestrante</Label>
                            <Input
                                type="url"
                                name="url"
                                id="exampleUrl"
                                placeholder="Digite o nome"
                            />
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="exampleDate">Date</Label>
                            <Input
                                type="date"
                                name="date"
                                id="exampleDate"
                                placeholder="date placeholder"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleTime">Time</Label>
                            <Input
                                type="time"
                                name="time"
                                id="exampleTime"
                                placeholder="time placeholder"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Descrição</Label>
                            <Input type="textarea" name="text" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Sala</Label>
                            <Input type="select" name="select" />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle()}>
                            Do Something
                    </Button>{' '}
                        <Button color="secondary" onClick={this.toggle()}>
                            Cancel
                    </Button>
                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}


export default CadastraEvento;