import React from 'react'
import LoginForm from './login-form'
import {buildUser} from '../test/generate'
import {Button} from './lib'
import * as hooks from '../utils/hooks'

describe('LoginForm', () => {
  it('should submit username and password on login', () => {
    const stub = cy.stub().as('onSubmit').resolves(true)
    cy.mount(
      <LoginForm
        onSubmit={stub}
        submitButton={<Button variant="primary">Login</Button>}
      />,
    )

    const user = buildUser()
    cy.findByRole('textbox', {name: /username/i}).type(user.username)
    cy.findByLabelText(/password/i).type(user.password)
    cy.get('[type="submit"]').click()

    cy.get('@onSubmit').should('have.been.calledWith', {
      username: user.username,
      password: user.password,
    })
  })

  it('should render Spinner when isLoading', () => {
    // TODO: find out how we would stub what the hook returns so that we can test isLoading and isError cases
    cy.stub(hooks, 'useAsync').returns({isLoading: true, isError: true})

    cy.mount(
      <LoginForm submitButton={<Button variant="secondary">Login</Button>} />,
    )
  })
})
