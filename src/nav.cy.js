import Nav from './nav'
import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'

describe('Nav', () => {
  it('should click through navigation links', () => {
    cy.mount(
      <Router>
        <Nav />
      </Router>,
    )

    cy.contains('Reading List').click()
    cy.url().should('contain', '/list')

    cy.contains('Finished Books').click()
    cy.url().should('contain', '/finished')

    cy.contains('Discover').click()
    cy.url().should('contain', '/discover')
  })
})
