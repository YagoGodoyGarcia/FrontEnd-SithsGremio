import React from 'react';
import Page from 'components/Page';
import MeusEventosAluno from '../components/MeusEventosAluno'

class MeusEventos extends React.Component {
    render() {
        return (
            <Page
                className="ListaDeEventos"
                title="Meus Eventos ">
                    <MeusEventosAluno/>                
            </Page>        
        );
    }
}
export default MeusEventos;
