import * as React from 'react'
import NotesTextarea from './notes-text-area'
import {AuthProvider} from '../context/auth-context'
const {listItems} = require('../../cypress/fixtures/list-items.json')

describe('NotesTextarea', () => {
  it('should render text area', () => {
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
        <NotesTextarea listItem={listItems} />
      </AuthProvider>,
    )

    cy.get('#notes').should('be.visible')
    // TODO: look into typing into the notes and seeing
    // There was an error: Cannot read properties of undefined (reading 'map')
  })
})
