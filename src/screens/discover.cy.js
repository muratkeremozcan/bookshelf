import React from 'react'
import {DiscoverBooksScreen} from './discover'
import {AuthProvider} from '../context/auth-context'
import {BrowserRouter as Router} from 'react-router-dom'

describe('DiscoverBooksScreen', () => {
  it('should render books', () => {
    cy.intercept('GET', /list-items/, {fixture: 'list-items'}).as('list-items')
    cy.intercept('GET', /query/, {fixture: 'books'}).as('books')
    cy.intercept('POST', /profile/, {body: {success: true}}).as('profile')

    cy.mount(
      <Router>
        <AuthProvider>
          <DiscoverBooksScreen />
        </AuthProvider>
      </Router>,
    )
    cy.getByCy('search-spinner').should('exist')
    cy.getByCy('spinner').should('exist')
    cy.wait('@list-items')

    cy.getByCy('book-list').should('be.visible')
  })
})
