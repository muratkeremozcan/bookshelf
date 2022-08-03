import React from 'react'
import AppRoutes from './app-routes'
import {BrowserRouter as Router} from 'react-router-dom'
import {AuthProvider} from './context/auth-context'
import '@reach/tooltip/styles.css'

describe('AppRoutes', () => {
  it('should nav through routes by links ', () => {
    cy.mount(
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>,
    )
    Cypress.on('uncaught:exception', () => false)
    cy.stub(window, 'fetch').resolves({ok: true}).as('fetch')

    cy.getByClassLike('NotFoundScreen')
    cy.contains('Go home').click()
    cy.url().should('contain', '/list')

    cy.contains('the Discover page').click()
    cy.url().should('contain', '/discover')
  })
})
