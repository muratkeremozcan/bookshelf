import React from 'react'
import {BookRow} from './book-row'
import {AuthProvider} from '../context/auth-context'
import {BrowserRouter as Router} from 'react-router-dom'
import '@reach/tooltip/styles.css'
const {book} = require('../../cypress/fixtures/book.json')

describe('BookRow', () => {
  it('should render', () => {
    cy.mount(
      <Router>
        <AuthProvider>
          <BookRow book={book} />
        </AuthProvider>
      </Router>,
    )

    cy.getByClassLike('BookRow').should('be.visible')
    cy.contains(book.title)
    cy.contains(book.author)
    cy.contains(book.publisher)
    cy.contains(book.synopsis)
    cy.get('img').should('have.attr', 'src').and('eq', book.coverImageUrl)
  })
})
