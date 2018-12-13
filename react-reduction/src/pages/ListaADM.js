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
var lista = 0
var UseRemove
class ListaADM extends Component {

    constructor(props) {
            super(props);
            this.state = { 
                ListaUser:[],
            }
            this.value=[]

        }
        componentDidMount(){
            setInterval(() => {
                if(lista == 1){
                    this.state.ListaUser=[]
                    var th = this;
                    axios.get(`http://localhost:8080/ListaAlunos`)
                    .then(function (result) {
                        th.setState({
                            ListaUser: result.data
                        });
                    });
                }
                else if(lista == 2){
                    this.state.ListaUser=[]
                    var th = this;
                    axios.get(`http://localhost:8080/ListaAdms`)
                    .then(function (result) {
                        th.setState({
                            ListaUser: result.data
                        });
                    });

                }
                else{
                    this.state.ListaUser=[]
                    var th = this;
                    axios.get(`http://localhost:8080/ListaUsuarios`)
                    .then(function (result) {
                        th.setState({
                            ListaUser: result.data
                        });
                    });
                }
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
        cancelaModal = () => {
            this.setState({
                ModalRemove: !this.state.ModalRemove,
            });
        }
        RemoveSucess=()=>{
            console.log(UseRemove)
                if(UseRemove!=undefined && UseRemove != ""){
                    axios.post(`http://localhost:8080/DeletaAdm?id_adm=`+UseRemove)
                    console.log("Funcionou")
                    this.setState({
                        ModalRemove: !this.state.ModalRemove,
                    });
                }
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
                this.setState({
                    modal: !this.state.modal,
                });
            }
        }
        valida() {
            let separa
            let separa2
            var danger = 0
            let emailAluno = document.getElementById("Email").value
            separa = emailAluno.split('')
            for (var i = 0; i < separa.length; i++) {
              if (separa[i] == "@") {
                separa2 = emailAluno.split('@')
              }
              else {
                danger = danger + 1
                console.log(danger)
                if (danger == separa.length) {
                  var element = document.getElementById("Email");
                  var element2 = document.getElementById("emailInvalido");
                  element.classList.add("border-danger")
                  element2.classList.add("displayblock")
                  document.getElementById("sucessCadastro").disabled = true;
                }
              }
            }
            if (separa2 != undefined) {
              for (var i = 0; i < separa2.length; i++) {
                separa = separa2[i].split('.')
                if (separa[i] == 'com') {
                  var element = document.getElementById("Email");
                  var element2 = document.getElementById("emailInvalido");
                  element2.classList.remove("displayblock")
                  element.classList.remove("border-danger")
                  document.getElementById("sucessCadastro").disabled = false;
                }
              }
            }
          }
        deletaUser= RemoveUser => () => {
                if(RemoveUser == localStorage.idAluno){
                    alert("Você não pode excluir esse usuario")
                }
                else{
                    UseRemove = RemoveUser
                    this.setState({
                        ModalRemove: !this.state.ModalRemove,
                    });  
                }
            }
        tipoChamada(){
            lista = document.getElementById("userList").value
        }

        
        render() { 
                return ( 
                    <div>
                        <center>
                            <FormGroup>
                                <Input style={{width: "40%"}} type="select" name="select" id="userList" onClick={this.tipoChamada} >
                                    <option value="0">Escolha o nivel de Usuario</option>
                                    <option value="1">Comum</option>
                                    <option value="2">ADM</option>
                                </Input>
                            </FormGroup>
                        </center>

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
                                <tr>
                                    <th scope="row">{i+1}</th>
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
                                onBlur={this.valida}
                            />
                            <Label className="displaynone" id="emailInvalido" style={{ color: "red", fontWeight: "bold", marginBottom: "0px" }}>Email Invalido</Label>
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
                <Modal
                    id="Modalremove"
                    isOpen={this.state.ModalRemove}
                    toggle={this.remove}
                    className={this.props.className}>
                    <ModalHeader toggle={this.remove}>Confirmaçao de Excluçao</ModalHeader>
                    <ModalBody style={{width: "100%"}}>
                    <Label>Vocẽ tem certeza? </Label>
                        <div style={{float: "right"}}>
                            <button className="btn btn-success" style={{marginRight: '5px'}} onClick={this.RemoveSucess}>Confirma</button>
                            <button className="btn btn-danger" onClick={this.cancelaModal}>Cancela</button>
                        </div>
                    </ModalBody>
                    </Modal>
                </div>

             );
        }
    }
export default ListaADM;
