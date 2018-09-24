import React from 'react';

import { getColor } from 'utils/colors';

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardGroup,
  CardDeck,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
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

  render() {
    return (
      <Page
        className="ListaDeEventos"
        title="Lista de Eventos ">
        <Row>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Nome do Evento"
              subtitle="Tema"
              number="00/00"
              color="secondary"
              progress={{
                value: 75,
                label: 'Vagas Ocupadas',
              }}
            />
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Nome do Evento"
              subtitle="Tema"
              number="00/00"
              color="secondary"
              progress={{
                value: 75,
                label: 'Vagas Ocupadas',
              }}
            />
          </Col>
          <Col lg={3} md={6} sm={6} xs={12}>
            <NumberWidget
              title="Nome do Evento"
              subtitle="Tema"
              number="00/00"
              color="secondary"
              progress={{
                value: 75,
                label: 'Vagas Ocupadas',
              }}
            />
          </Col>    
        </Row>
        </Page>
    );
  }
}
export default ListaDeEventos;
