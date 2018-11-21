import React from 'react';

import Page from 'components/Page';
import BtnCadastrar from '../components/CadastraEvento';
import Eventos from '../components/ListarEventosAdm';
import {browserHistory} from 'react-router';
class ListaDeEventos extends React.Component {
  render() {
    if(localStorage.getItem("nome") == null){
      browserHistory.push('/Login')
    }
    return (
      <Page
        className="ListaDeEventos"
        title="Eventos ">
        <BtnCadastrar/>
        <Eventos />
      </Page>
    );
  }
}
export default ListaDeEventos;
