import React from 'react'
import UnauthenticatedApp from 'unauthenticated-app'
import {AuthProvider} from './context/auth-context'

describe(
  'UnauthenticatedApp',
  {viewportHeight: 900, viewportWidth: 600},
  () => {
    it('should render Login and Register forms', () => {
      cy.mount(
        <AuthProvider>
          <UnauthenticatedApp />
        </AuthProvider>,
      )

      cy.contains('Button', /login/i).click()
      cy.getByCy('login-form').should('be.visible')

      cy.contains('Button', /register/i).click()
      cy.getByCy('register-form').should('be.visible')

      cy.getByClassLike('CircleButton')
        .should('have.length', 2)
        .click({multiple: true})

      cy.getByCy('login-form').should('not.exist')
      cy.getByCy('register-form').should('not.exist')
    })
  },
)
