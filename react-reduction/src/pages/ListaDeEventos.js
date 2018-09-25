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
  Table,
  CardBody,
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

class ListaDeEventos extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }
  state = {
    modal: false,
    modal_backdrop: false,
    modal_nested_parent: false,
    modal_nested: false,
    modal_chamada:false,
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
        <Button outline color="success" size="lg" onClick={this.toggle('nested_parent')}>+ Adicionar</Button>
        <br /><br />
        <Row>
          <Card className="CardContainer">
            <Col lg={12} md={6} sm={6} xs={12} >
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

              <Button color="success" size="sm" block>Editar Evento</Button>
              <Button color="danger" size="sm" block onClick={this.toggle('chamada')}>Remover Evento</Button>
              <br/>
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

              <Button color="success" size="sm" block>Editar Evento</Button>
              <Button color="danger" size="sm" block>Remover Evento</Button>
              <br />
            </Col>
          </Card>

          <Modal
            isOpen={this.state.modal_nested_parent}
            toggle={this.toggle('nested_parent')}
            className={this.props.className}
          >
            <ModalHeader toggle={this.toggle('nested_parent')} >
              Eventos
            </ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>Nome do Evento</Label>
                  <Input
                    type="text"
                    name="nome"
                    placeholder="Digite o nome"
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Nome do Palestrante</Label>
                  <Input
                    type="text"
                    name="nome"
                    placeholder="Digite o nome"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleText">Descrição</Label>
                  <Input type="textarea" name="text" />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleSelect">Selecione a Sala</Label>
                  <Input type="select" name="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="exampleDate">Data</Label>
                  <Input
                    type="date"
                    name="date"
                    id="exampleDate"
                    placeholder="date placeholder"
                  />
                
                  <Label for="exampleTime">Hora</Label>
                  <Input
                    type="time"
                    name="time"
                    id="exampleTime"
                    placeholder="time placeholder"
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="success"
                onClick={this.toggle('nested_parent')}>
                Salvar
                    </Button>{' '}
              <Button
                color="danger"
                onClick={this.toggle('nested_parent')}>
                Cancelar
                    </Button>
            </ModalFooter>
          </Modal>
        </Row>
      </Page>
    );
  }
}
export default ListaDeEventos;
