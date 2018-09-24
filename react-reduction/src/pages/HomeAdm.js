import React from 'react';

import { getColor } from 'utils/colors';
import EventosOpcao  from 'components/Card/EventosOpcao';
import Salaopcao  from 'components/Card/Salaopcao';
import PalestranteOpcao  from 'components/Card/PalestranteOpcao';
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
  todosData,
} from 'demos/dashboardPage';

import Page from 'components/Page';


const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7
);

class HomeAdm extends React.Component {
  componentDidMount() {
    // this is needed, because InfiniteCalendar forces window scroll
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <Page>
          <Row>
            <Col lg="4" md="12" sm="12" xs="12">
                <EventosOpcao />
            </Col>
            <Col lg="4" md="12" sm="12" xs="12">
                <Salaopcao />
            </Col>
            <Col lg="4" md="12" sm="12" xs="12">
                <PalestranteOpcao />
            </Col>
          </Row>            
      </Page>
    );
  }
}
export default HomeAdm;
