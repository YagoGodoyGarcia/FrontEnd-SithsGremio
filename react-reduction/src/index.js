import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Inicio from 'pages/Inicio'
import App from './App';
import EventosParaAlunos from 'pages/EventosParaAlunos';
import MeusEventos from 'pages/MeusEventos';
import Login from 'pages/AuthPage';
import ADM from 'pages/ADM';
import ListADM from 'pages/ListaADM'
import ALUNO from 'pages/ALUNO';
import Salas from 'pages/Salas';
import EventosADm from 'pages/ListaDeEventos';
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/inicio" component={Inicio} />
        </Route>
        <Route path="/EventosAlunos" component={EventosParaAlunos} />
        <Route path="/Login" component={Login} />
        <Route path="/ADM" component={ADM}>
            <Route path="/Salas" component={Salas} />
            <Route path="/EventosAdm" component={EventosADm} />
            <Route path="/ListaAdm" component={ListADM} />
        </Route>
        <Route path="/ALUNO" component={ALUNO}>
            <Route path="/AlunoEventos" component={EventosParaAlunos} />
            <Route path="/MeusEventos" component={MeusEventos} />
        </Route>
    </Router>

    , document.getElementById('root'));
