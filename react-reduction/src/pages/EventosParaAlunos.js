import React from 'react';


import Page from 'components/Page';
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
