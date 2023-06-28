import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, Container, Row } from 'react-bootstrap';

import Food from './Food';
import FoodForm from './FoodForm';
import ClientForm from './ClientForm';

const Main = () => {
  //variáveis de estado com funções modificadoras que iniciam com uma lista vazia e setam para um array vazio que espera a resposta que vai vim da api 
  let [clients, setClients] = useState([]);
  let [foods, setFoods] = useState([]);

 
  //variável de estado(inica com uma string vazia) nome e uma função modificadora pra atualizar o valor
  let [nome, setNome] = useState('');

//variáveis para controlar a exibiçao do formulário
  // variáveis de estado 'show' e 'showClient' que se iniciam com o valor false indicando que os formulários estão ocultos
  const [show, setShow] = useState(false);
  const [showClient, setShowClient] = useState(false);

  // Funções para atualizar os estados das variáveis 'show' e 'showClient' por meio das funçães modificadoras de ambos, podendo fechar o modal
  const handleClose = () => setShow(false);
  const handleCloseClient = () => setShowClient(false);

  // variáveis de estado 'handleShow' e 'handleShowClient' que se iniciam com o valor true para abrir o modal
  const handleShow = () => setShow(true);
  const handleShowClient= () => setShowClient(true);

  let buttonAdd = useRef(null);

//Função getComidas usando async await pra pegar os dados das comidas em formato json 
  async function getComidas() {
    //faz requisições assíncronas através do endpoint usando o metodo get 
    const response = await fetch('http://localhost:4000/comidas', {
      method: 'GET',
    });
    const data = await response.json();

    return data;
  }

  //Função handleClick usando async await que retornar o resultado da função getComidas quando o botão de pequisar for clicado
   const handleClick = async (event) => {
    console.log('Antes do fecth');
    const data = await getComidas();
    console.log(data);
    console.log('Depois do fetch!');
  };


//Função usando o hook useEffect para executa-lá uma vez quando o componente é montado
  useEffect(() => {

    fetch('http://localhost:3000/foods') //faz requisições através desse caminho

    //promise, pega a resposta e transforma ela em json, retorna json
      .then((response) => {
        return response.json();
      })
    //modifica o estado do hook, pega os dados em json e coloca no setFoods
      .then((data) => {
        setFoods([...data]);
      })
    //Imprime um erro que pode dar enventualmente  
      .catch();
  }, []);
  
  //Função usando o hook useEffect para executa-lá uma vez quando o componente é montado
  useEffect(() => {
    fetch('http://localhost:3000/Clien')//faz requisições através desse caminho

    //promise, pega a resposta e transforma ela em json, retorna json
      .then((response) => {
        return response.json();
      })
      //promise para modifica o estado do hook, pega os dados em json e coloca no setFoods
      .then((data) => {
        setClients([...data]);
      })
      //Imprime um erro que pode dar enventualmente
      .catch();
  }, []);

//Função para alterar o estado nome com o novo valor digitado, quando o valor do input é alterado ela é chamada
  const nomeHandleChange = (event) => {
    setNome(event.target.value);
  };

  return (
    <main>
      <Container>
        <h1>Menu</h1>
        <div className="text-right">
        {/* Botão para adicionar uma comida, quando vc clica ele chama a função handleShow que atualiza o setShow de false para true*/}
          <Button
            variant="secondary"
            className="mr-4 font-weight-bold"
            onClick={handleShow}
            ref={buttonAdd}
          >
            +  Adicionar Preparação
          </Button>
          {/* Botão para adicionar o cliente, quando vc clica ele chama a função handleShowClient que atualiza o setShowClient de false para true*/}
          <Button
            variant="secondary"
            className="mr-4 font-weight-bold"
            onClick={handleShowClient}
            ref={buttonAdd}
          >
            +  Adicionar Cliente
          </Button>
        </div>
        {/* Component Button do bootstrap. */}

        <Form.Group className="mb-3">
          <Form.Label>Alimento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Café"
            value={nome}
            onChange={nomeHandleChange}
          />
        </Form.Group>
        
      {/* botão de pesquisa, quando vc clicar ele vai chamar a função handleClick */}
        <Button onClick={handleClick} variant="primary">
          Pesquisar
        </Button>

      {/* exibir as comidas, quando o map percorrer e acessar uma comida, ele retorna a lista atualizada com a nova comida na forma de linha*/}
        <Row className="my-2">
          {foods.map((food) => (
            <Food key={food.id} food={food}></Food>
          ))}
        </Row>

        <FoodForm
          show={show}
          handleClose={handleClose}
          foods={foods}
          setFoods={setFoods}
        ></FoodForm>
        {/* rederiza o  componente e passa as props que foram passadas pro clientForm */}
        <ClientForm
          showClient={showClient}
          handleCloseClient={handleCloseClient}
          clients={clients}
          setClients={setClients}
        ></ClientForm>

      </Container>
    </main>
  );
};

export default Main;