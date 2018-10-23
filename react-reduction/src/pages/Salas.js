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
import BtnCadastrar from '../components/CadastraSala';
import SalasList from '../components/ListarSalas'


const today = new Date();
const lastWeek = new Date(
  today.getFullYear(),
  today.getMonth(),
  today.getDate() - 7
);

class Salas extends React.Component {
  render() {
    return (
      <Page
        className="ListaDeEventos"
        title="Salas ">
        <BtnCadastrar/>
        <SalasList/>
      </Page>
    );
  }
}
export default Salas;
