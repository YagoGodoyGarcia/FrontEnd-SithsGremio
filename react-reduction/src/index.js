import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Inicio from 'pages/Inicio'
import App from './App';
import EventosParaAlunos from 'pages/EventosParaAlunos';
import Login from 'pages/AuthPage';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="/inicio" component={Inicio}/>
        </Route>
        <Route path="/EventosAlunos" component={EventosParaAlunos}/>
        <Route path="/LoginG" component={Login}/>
    </Router>

    ,document.getElementById('root'));
