import React, { Component } from 'react'
import axios from 'axios';
import { 
    Table,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Button,
    FormGroup,
    Label,
    Input 
} from 'reactstrap';


class ListaADM extends Component {

    constructor(props) {
            super(props);
            this.state = { 
                ListaUser:[]
             }
        }
        componentDidMount(){
            setInterval(() => {
                var th = this;
                axios.get(`http://localhost:8080/ListaAluno`)
                .then(function (result) {
                    th.setState({
                        ListaUser: result.data
                    });
                });
            },500)
        }
        toggle = () => {
            if (this.state.customersListSalas != "") {
                this.setState({
                    modal: !this.state.modal,
                });
            } else {
                alert("Cadastre uma sala primeiro!");
            };
        }
        cadastraUser= modalType => () => {
            let nomeU = document.getElementById("nomeUser").value
            let emailU = document.getElementById("Email").value
            let raU = document.getElementById("Ra").value
            let senhaU = document.getElementById("Senha").value
            let nivelU = document.getElementById("NivelUser").value
            if(nomeU !=""&&emailU !=""&&raU !=""&&senhaU !=""&&nivelU !=""){
                axios.post(`http://localhost:8080/AlunoRegistration`, {
                    nome: nomeU,
                    ra: raU,
                    email: emailU,
                    senha: senhaU,
                    nivelPermissao: nivelU
                })
            }
        }
        deletaUser= RemoveUser => () => {
            console.log(RemoveUser)
                // this.state.ListaUser.forEach((user)=>{
                //     if(user.idAluno == RemoveUser){
                //         axios.DELETE(`http://localhost:8080/AlunoRegistration`, {
                //             idAluno:user.idAluno,
                //             nome: user.nome,
                //             ra: user.ra,
                //             email: user.email,
                //             senha: user.senha,
                //             nivelPermissao: user.nivelPermissao
                //         })
                //     }
                // })
            }
        render() { 
                return ( 
                    <div>
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>RA</th>
                                <th>Permissao</th>
                                <td><button id="adicionaUser"type="button" class="btn btn-success" onClick={this.toggle}>Adicionar</button></td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.ListaUser.map((Lista,i) =>
                            <tr id="usuario">
                                <th scope="row">{i}</th>
                                <td>{Lista.nome}</td>
                                <td>{Lista.email}</td>
                                <td>{Lista.ra}</td>
                                <td>{Lista.nivelPermissao}</td>
                                <td><button id="removeUser" type="button" class="userDados btn btn-danger" onClick={this.deletaUser(Lista.idAluno)}>Remover</button></td>
                            </tr>
                            )}
                        </tbody>
                    </Table>
                    <Modal
                    id="modalSala"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                    className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Cadastro de Usuarios</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="text">Nome do Usuario</Label>
                            <Input
                                type="text"
                                name="text"
                                id="nomeUser"
                                placeholder="Digite o nome"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleUrl">Email do Usuario</Label>
                            <Input
                                type="text"
                                name="email"
                                id="Email"
                                placeholder="Digite o Email"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleDate">RA</Label>
                            <Input
                                type="number"
                                name="ra"
                                id="Ra"
                                placeholder="Ra do aluno"

                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleTime">Senha</Label>
                            <Input
                                type="password"
                                name="senha"
                                id="Senha"
                                placeholder="Digite a senha"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleText">Nivel de Usuario</Label>
                            <Input type="select" name="select" id="NivelUser" onClick={this.nivelUser} >
                                <option value="">Escolha o nivel de Usuario</option>
                                <option value="1">Comum</option>
                                <option value="2">ADM</option>
                                <option value="3">ADM Master</option>
                            </Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button id="sucessCadastro"color="success" onClick={this.cadastraUser()}>
                            Salvar
                        </Button>
                        <Button id="cancel" color="danger" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                </div>

             );
        }
    }
export default ListaADM;
