import React from 'react'
import {Rating} from './rating'
import {AuthProvider} from '../context/auth-context'
import {BrowserRouter as Router} from 'react-router-dom'
import '@reach/tooltip/styles.css'
const {book} = require('../../cypress/fixtures/book.json')

describe('Rating', {viewportWidth: 600}, () => {
  it('should render ', () => {
    cy.intercept('GET', /list-items/, {fixture: 'list-items'}).as('list-items')
    cy.intercept('POST', /profile/, {body: {success: true}}).as('profile')
    cy.intercept('GET', '**/book/*', {fixture: 'book'}).as('book')
    cy.intercept('PUT', /list-items/, {body: {success: true}}).as(
      'list-items-put',
    )
    cy.intercept('DELETE', /list-items/, {body: {success: true}}).as(
      'list-items-delete',
    )

    cy.mount(
      <Router>
        <AuthProvider>
          <Rating listItem={book} />
        </AuthProvider>
      </Router>,
    )

    cy.getByClassLike('Rating')
      .should('be.visible')
      .within(() => cy.get('label').should('have.length', 5))
  })
})
