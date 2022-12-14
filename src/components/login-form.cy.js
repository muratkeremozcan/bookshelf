import React from 'react'
import LoginForm from './login-form'
import {buildUser} from '../test/generate'
import {Button} from './lib'

describe('LoginForm', () => {
  let stub
  const user = buildUser()
  beforeEach(() => {
    stub = cy.stub().as('onSubmit').resolves(true)
  })

  it('should submit username and password on login', () => {
    cy.mount(
      <LoginForm
        onSubmit={stub}
        submitButton={<Button variant="primary">Login</Button>}
      />,
    )

    cy.findByRole('textbox', {name: /username/i}).type(user.username)
    cy.findByLabelText(/password/i).type(user.password)
    cy.get('[type="submit"]').click()

    cy.get('@onSubmit').should('have.been.calledWith', {
      username: user.username,
      password: user.password,
    })
  })

  it('should submit username and password on register', () => {
    cy.mount(
      <LoginForm
        onSubmit={stub}
        submitButton={<Button variant="secondary">Register</Button>}
      />,
    )

    cy.findByRole('textbox', {name: /username/i}).type(user.username)
    cy.findByLabelText(/password/i).type(user.password)
    cy.get('[type="submit"]').click()

    cy.get('@onSubmit').should('have.been.calledWith', {
      username: user.username,
      password: user.password,
    })
  })
})
