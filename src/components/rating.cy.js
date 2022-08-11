import React from 'react'
import {Rating} from './rating'
import {AuthProvider} from '../context/auth-context'
import {BrowserRouter as Router} from 'react-router-dom'
import '@reach/tooltip/styles.css'
const {listItems} = require('../../cypress/fixtures/list-items.json')

describe('Rating', {viewportWidth: 600, defaultCommandTimeout: 10000}, () => {
  it('should update the rating ', () => {
    cy.intercept('PUT', /list-items/, {body: {success: true}}).as(
      'list-items-put',
    )

    cy.mount(
      <Router>
        <AuthProvider>
          <Rating listItem={listItems[1]} />
        </AuthProvider>
      </Router>,
    )

    cy.getByClassLike('Rating')
      .should('be.visible')
      .within(() => cy.get('label').should('have.length', 5))

    cy.wrap(Cypress._.range(1, 6)).each(star => {
      cy.getByCy(`rating-${star}`).click()
      cy.get('@list-items-put').its('request.body.rating').should('eq', star)
    })
  })
})
