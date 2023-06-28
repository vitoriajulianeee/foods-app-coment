import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const FoodForm = ({ show, handleClose, foods, setFoods }) => {
  

  let [food, setFood] = useState({ name: '', image: '' });

  //Ele seta o Food, pega o name do input e adiciona o valor que vc digitar/ name: suco
//exemplo com console
  const handleChange = (event) => {
    setFood({ ...food, [event.target.name]: event.target.value });
  };

  //Forma de enviar os dados
  const handleOnSubmit = (event) => {
    event.preventDefault();
    // Enviar os dados para o servidor backend. Manda os dados por essa rota
    fetch('http://localhost:4000/foods', {
      method: 'POST', // Método de envio.
      body: JSON.stringify(food), // Converte o Json em string
      // Especifica o tipo do conteúdo da requisição/ tipo  da comunicação
      headers: {
        'Content-Type': 'application/json', // Especifica o tipo do conteúdo da requisição.
      },
    })
    //fetch retorna uma promise 
      .then((response) => {
        if (response.ok === true) {
          // Fechar modal.
          handleClose();
          //transforma resposta em json
          return response.json();
        }
      })
    //fetch retorna uma promise 
    //Pega os dados retornados em json e coloca no hook setClients alterando a lista 
      .then((data) => {
        setFoods([...foods, data]);
      })
    //Para possivel erro no cervidor
      .catch((error) => {});
    // Atualizar a lista dos itens do cardápio.
  };

  return (
  // showCliente que é um state que se inicia com false para que o modal nao seja exibido assim que a aplicação carrega
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de Comida</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleOnSubmit}>
      {/* Modal dentro do formulario */}
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome"
              name="name"
              onChange={handleChange}
              value={food.name}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Imagem</Form.Label>
            <Form.Control
              type="text"
              placeholder="Imagem"
              name="image"
              onChange={handleChange}
              value={food.image}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="Descrição"
              name="description"
              onChange={handleChange}
              value={food.description}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {/* Botão, para qundo vc clicar fechar o modal  */}
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          {/* Botão do tipo submit para submeter o modal */}
          <Button type="submit" variant="primary">
            Salvar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default FoodForm;
