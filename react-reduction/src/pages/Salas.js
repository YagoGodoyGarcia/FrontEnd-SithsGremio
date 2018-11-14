import React from 'react';

import Page from 'components/Page';
import BtnCadastrar from '../components/CadastraSala';
import SalasList from '../components/ListarSalas'

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
