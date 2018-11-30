import React, { Component } from 'react'
import axios from 'axios';
import { Table } from 'reactstrap';


class ListaADM extends Component {

    constructor(props) {
            super(props);
            this.state = {  }
        }

        axios.post(`http://localhost:8080/ListaAluno`, {
            nome: nomeAluno,
            ra: raAluno,
            email: emailAluno,
            senha: senhaAluno,
            nivelPermissao: 1
        };
        render() { 
            return ( 
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>RA</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
             );
        }
    }
export default ListaADM;
