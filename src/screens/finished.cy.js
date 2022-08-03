import React from 'react'
import {FinishedScreen} from './finished'
import {AuthProvider} from '../context/auth-context'
import {BrowserRouter as Router} from 'react-router-dom'
import '@reach/tooltip/styles.css'

describe('FinishedScreen', () => {
  it('should render list once ready', () => {
    cy.intercept('GET', /list-items/, {fixture: 'list-items'}).as('list-items')
    cy.intercept('POST', /profile/, {body: {success: true}}).as('profile')

    cy.mount(
      <Router>
        <AuthProvider>
          <FinishedScreen />
        </AuthProvider>
      </Router>,
    )
    cy.getByClassLike('Link').should('be.visible')

    cy.wait('@list-items')
    cy.getByClassLike('ListItemList').should('be.visible')
  })
})
