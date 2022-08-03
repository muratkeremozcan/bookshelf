import React from 'react'
import {ListItemList} from './list-item-list'
import {AuthProvider} from '../context/auth-context'
import {BrowserRouter as Router} from 'react-router-dom'
import '@reach/tooltip/styles.css'
const {book} = require('../../cypress/fixtures/book.json')

describe('ListItemList', {viewportWidth: 600}, () => {
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
          <ListItemList
            filterListItems={li => Boolean(li.finishDate)}
            noListItems={<p>foo</p>}
          />
        </AuthProvider>
      </Router>,
    )

    cy.getByClassLike('BookRow').should('be.visible')

    cy.getByClassLike('TooltipButton').first().click()
    cy.wait('@list-items-put')

    cy.getByClassLike('TooltipButton').last().click()
    cy.wait('@list-items-delete')
  })
})
