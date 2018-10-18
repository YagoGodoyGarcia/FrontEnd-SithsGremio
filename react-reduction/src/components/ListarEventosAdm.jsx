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

class ListarEventosAdm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customersList: [],
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
        }, 5000)
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
                {this.state.customersList.map((dynamicData) =>
                    <Card className="CardContainer">
                        <Col lg={12} md={6} sm={6} xs={12}>
                            <NumberWidget
                                title={dynamicData.nome}
                                subtitle={dynamicData.palestrante}
                                number={dynamicData.data}
                                color="secondary"
                                progress={{
                                    value: 60,
                                    label: 'Vagas Ocupadas',
                                }}
                                className="BorderCard"
                            />
                            <CardText className="descricao">

                                <p>Resumo: {dynamicData.descricao}</p>

                            </CardText>
                            <Button color="success" size="sm" block onClick={this.toggle()}>Ver Mais</Button>
                            <br />
                        </Col>
                    </Card>

                )}
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle()}
                  className={this.props.className}>
                  <ModalHeader toggle={this.toggle()}>Modal title</ModalHeader>
                  <ModalBody>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
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


export default ListarEventosAdm;