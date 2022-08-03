import React from 'react'
import {BookScreen} from './book'
import {AuthProvider} from '../context/auth-context'
import '@reach/tooltip/styles.css'
const {book} = require('../../cypress/fixtures/book.json')

describe('BookScreen', {viewportHeight: 900}, () => {
  it('should render ', () => {
    cy.intercept('GET', /list-items/, {fixture: 'list-items'}).as('list-items')
    cy.intercept('POST', /profile/, {body: {success: true}}).as('profile')
    cy.intercept('GET', '**/books/*', {fixture: 'book'}).as('book')
    cy.mount(
      <AuthProvider>
        <BookScreen />
      </AuthProvider>,
    )

    cy.getByClassLike('BookScreen').should('be.visible')
    cy.contains(book.title)
    cy.contains(book.author)
    cy.contains(book.publisher)
    cy.contains(book.synopsis)
    cy.get('img').should('have.attr', 'src').and('include', book.coverImageUrl)
  })
})
