import React from 'react'
import {ReadingListScreen} from './reading-list'
import {AuthProvider} from '../context/auth-context'
import {BrowserRouter as Router} from 'react-router-dom'
import '@reach/tooltip/styles.css'

describe('ReadingListScreen', () => {
  it('should render ', () => {
    cy.intercept('GET', /list-items/, {fixture: 'list-items'}).as('list-items')
    cy.intercept('POST', /profile/, {body: {success: true}}).as('profile')

    cy.mount(
      <Router>
        <AuthProvider>
          <ReadingListScreen />
        </AuthProvider>
      </Router>,
    )

    cy.contains('p', 'Hey')
    cy.wait('@list-items')
    cy.getByClassLike('BookListUL').should('be.visible')
  })
})
