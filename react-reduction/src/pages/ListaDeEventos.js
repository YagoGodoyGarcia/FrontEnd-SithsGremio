import React from 'react';

import Page from 'components/Page';
import BtnCadastrar from '../components/CadastraEvento';
import Eventos from '../components/ListarEventosAdm';

class ListaDeEventos extends React.Component {
  render() {
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
