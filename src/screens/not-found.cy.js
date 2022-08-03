import React from 'react'
import {NotFoundScreen} from './not-found'
import {AuthProvider} from '../context/auth-context'
import {BrowserRouter as Router} from 'react-router-dom'

describe('NotFoundScreen', () => {
  it('should render ', () => {
    cy.intercept('GET', /list-items/, {fixture: 'list-items'}).as('list-items')
    cy.intercept('POST', /profile/, {body: {success: true}}).as('profile')

    cy.mount(
      <Router>
        <AuthProvider>
          <NotFoundScreen />
        </AuthProvider>
      </Router>,
    )

    cy.getByClassLike('NotFoundScreen').should('be.visible')
    cy.getByClassLike('Link').click()
    cy.url().should('contain', 'list')
  })
})
