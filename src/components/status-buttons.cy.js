import {StatusButtons} from './status-buttons'
import React from 'react'
import {BookRow} from './book-row'
import {AuthProvider} from '../context/auth-context'
import {BrowserRouter as Router} from 'react-router-dom'
import '@reach/tooltip/styles.css'
const {book} = require('../../cypress/fixtures/book.json')

describe('StatusButtons', () => {
  it('should show status buttons', () => {
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
      <AuthProvider>
        <StatusButtons book={book} />
      </AuthProvider>,
    )

    cy.getByClassLike('TooltipButton').should('have.length', 2)

    cy.getByClassLike('TooltipButton').first().click()
    cy.wait('@list-items-put')

    cy.getByClassLike('TooltipButton').last().click()
    cy.wait('@list-items-delete')
  })
})
