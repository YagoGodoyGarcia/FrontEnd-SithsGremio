import React from 'react';

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

import Page from 'components/Page';

import {
    supportTicketsData,
    productsData,
    userProgressTableData,
    avatarsData,
    todosData,
    chartjs,
} from 'demos/dashboardPage';

import Eventos from '../components/ListarEventosAlunos'

class EventosParaAlunos extends React.Component {
    render() {
        return (
            <Page
                className="ListaDeEventos"
                title="Eventos ">
                    <Eventos/>                
            </Page>        
        );
    }
}
export default EventosParaAlunos;
