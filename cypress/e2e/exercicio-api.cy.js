/// <reference types="cypress" />

import contrato_usuarios from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response => {
      return contrato_usuarios.validateAsync(response.body)
    })
  });


  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });


  it('Deve cadastrar um usuário com sucesso', () => {
    let valor_random = 'Joao' + Math.floor(Math.random() * 1000)
    cy.cadastrarUsuario(valor_random, valor_random + '@gmail.com', 'teste', 'true')
      .should((response) => {
        expect(response.status).equal(201)
        expect(response.body.message).equal('Cadastro realizado com sucesso')
      });
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.cadastrarUsuario('Joao', 'joao@gmail.com', 'teste', 'true')
      .should((response) => {
        expect(response.status).equal(400)
        expect(response.body.message).equal('Este email já está sendo usado')
      });
  });
  
  it('Deve editar um usuário previamente cadastrado', () => {
    let valor_random = 'Joao' + Math.floor(Math.random() * 1000)
    cy.cadastrarUsuario(valor_random, valor_random + '@gmail.com', 'teste', 'true')
      .then(response => {
        let id = response.body._id
        cy.request({
          method: 'PUT',
          url: `usuarios/${id}`,
          body: {
            "nome": valor_random,
            "email": valor_random + '@gmail.com',
            "password": "teste2",
            "administrador": 'true'
          }
        }).should(response => {
          expect(response.body.message).to.equal('Registro alterado com sucesso')
          expect(response.status).to.equal(200)
        })
      })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    let valor_random = 'Joao' + Math.floor(Math.random() * 1000)
    cy.cadastrarUsuario('Usuario que sera deletado', valor_random + '@gmail.com', 'teste', 'true')
    .then(response => {
      let id = response.body._id
      cy.request({
        method: 'DELETE',
        url: `usuarios/${id}`,
      })
    })

  })
})
