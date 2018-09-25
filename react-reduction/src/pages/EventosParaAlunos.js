import React from 'react';

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


import {
    supportTicketsData,
    productsData,
    userProgressTableData,
    avatarsData,
    todosData,
    chartjs,
} from 'demos/dashboardPage';

import Page from 'components/Page';

import { NumberWidget, IconWidget } from 'components/Widget';


const today = new Date();
const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
);

class EventosParaAlunos extends React.Component {
    componentDidMount() {
        // this is needed, because InfiniteCalendar forces window scroll
        window.scrollTo(0, 0);
    }
    state = {
        modal: false,
        modal_backdrop: false,
        modal_nested_parent: false,
        modal_nested: false,
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
            <Page
                className="ListaDeEventos"
                title="Eventos ">
                <Row>
                    <Card className="CardContainer">
                        <Col lg={12} md={6} sm={6} xs={12}>
                            <NumberWidget
                                title="Nome do Evento"
                                subtitle="Tema"
                                number="00/00"
                                color="secondary"
                                progress={{
                                    value: 60,
                                    label: 'Vagas Ocupadas',
                                }}
                                className="BorderCard"
                            />
                            <Button color="success" size="sm" block onClick={this.toggle('nested_parent')} >Ver Mais</Button>
                            <br />
                        </Col>
                    </Card>
                    <Card className="CardContainer">
                        <Col lg={12} md={6} sm={6} xs={12}>
                            <NumberWidget
                                title="Nome do Evento"
                                subtitle="Tema"
                                number="00/00"
                                color="secondary"
                                progress={{
                                    value: 60,
                                    label: 'Vagas Ocupadas',
                                }}
                                className="BorderCard"
                            />
                            <Button color="success" size="sm" block onClick={this.toggle('nested_parent')} >Ver Mais</Button>
                            <br />
                        </Col>
                    </Card>

                    <Modal
                        isOpen={this.state.modal_nested_parent}
                        toggle={this.toggle('nested_parent')}
                        className={this.props.className}
                    >
                        <ModalHeader toggle={this.toggle('nested_parent')} >
                            Informações do Evento
            </ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <CardTitle>Nome</CardTitle>
                                    <CardText>
                                            Java para programadores GO
                                    </CardText>
                                </FormGroup>
                                <FormGroup>
                                    <CardTitle>Palestrante</CardTitle>
                                    <CardText>
                                            Catatau toma mingual
                                    </CardText>
                                </FormGroup>
                                <FormGroup>
                                    <CardTitle >Descrição: </CardTitle>
                                    <CardText>
                                            Esse Evento é Vida loucaEsse Evento é Vida loucaEsse Evento é Vida loucaEsse 
                                        Evento é Vida loucaEsse Evento é Vida loucaEsse Evento é Vida 
                                        loucaEsse Evento é Vida louca
                                    </CardText>
                                </FormGroup>
                                
                                <FormGroup>
                                    <CardText>Sala: 1 </CardText>
                                    <CardText >Data: 01/02/2002</CardText>
                                    <CardText >Hora: 03:50:PM</CardText>
                                </FormGroup>
                            </Form>
                            <Button color="success" size="sm" block>Participar</Button>
                        </ModalBody>
                    </Modal>
                </Row>
            </Page>
        );
    }
}
export default EventosParaAlunos;
