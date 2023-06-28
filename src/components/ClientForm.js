import React, { useState } from 'react';
import { Button, Form ,Modal } from 'react-bootstrap';

//Função 
const ClientForm = ({ showClient, handleCloseClient, clients, setClients }) => {

  let [cliente, setCliente] = useState({ nome: '', email: '', nascimento: '', cep: ''});
//Função para atualizar o estado cliente com o novo valor digitado, pega o name do input e adiciona o valor que vc digitar/ nome: Matheus
//exemplo com console
  const handleChange = (event) => {
    setCliente({ ...cliente, [event.target.name]: event.target.value });
  };

//Forma de enviar os dados
  const handleOnSubmit = (event) => {
    //impede que o evento padrão ocorra, que é enviar o mentodo e retornar a pagina 
    event.preventDefault();

    // Enviar os dados para o servidor backend. Manda os dados por essa rota
    fetch('http://localhost:3000/Clien', {
      method: 'POST', // Método de envio.
      body: JSON.stringify(cliente), // Converte o Json em string
      // Especifica o tipo do conteúdo da requisição/ tipo  da comunicação
      headers: {
        'Content-Type': 'application/json', 
      },
    })
    //fetch retorna uma promise 
      .then((response) => {
        if (response.ok === true) {
          // Fechar modal.
          handleCloseClient();
          //transforma resposta em json
          return response.json();
        }
      })
      //pega os dados em json e coloca no hook setClients alterando a lista 
      .then((data) => {
        setClients([...clients, data]);
      })
      //Para possivel erro no cervidor
      .catch((error) => {});
    // Atualizar a lista de clientes.
  };

  return (
    // showCliente que é um state que se inicia com false para que o modal nao seja exibido assim que a aplicação carrega
    <Modal show={showClient} onHide={handleCloseClient}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Cliente</Modal.Title>
        </Modal.Header>
    {/* Formulario  */}
      <Form onSubmit={handleOnSubmit}>
      {/* Modal dentro do formulario */}
        <Modal.Body>
              <Form.Group className="mb-3" controlId="formBasicNome">
                <Form.Label>Nome</Form.Label>
                <Form.Control 
                  required type="text" 
                  placeholder="Digite seu Nome" 
                  name="nome"
                  onChange={handleChange}
                  value={cliente.nome}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  required type="email" 
                  placeholder="E-mail" 
                  name="email"
                  onChange={handleChange}
                  value={cliente.email}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicNacimento">
                <Form.Label>Nacimento</Form.Label>
                <Form.Control 
                  required type="text" 
                  placeholder="Data De Nacimento" 
                  name="nascimento"
                  onChange={handleChange}
                  value={cliente.nascimento}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCep">
                <Form.Label>Cep</Form.Label>
                <Form.Control 
                  required type="text" 
                  placeholder="cep" 
                  name="cep"
                  onChange={handleChange}
                  value={cliente.cep}/>
              </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          {/* Botão, para qundo vc clicar fechar o modal  */}
          <Button variant="secondary" onClick={handleCloseClient}>
            Fechar
          </Button>
          {/* Botão do tipo submit para submeter o modal */}
          <Button variant="primary" type="submit">
            Salvar
          </Button>
        </Modal.Footer>
      </Form> 
    </Modal>
  );
}

export default ClientForm;