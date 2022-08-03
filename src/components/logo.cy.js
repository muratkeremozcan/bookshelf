import {Logo} from './logo'
import React from 'react'

describe('Logo', () => {
  it('should render svg', () => {
    cy.mount(<Logo />)

    cy.get('svg')
      .should('have.attr', 'xmlns')
      .and('eq', 'http://www.w3.org/2000/svg')
  })
})
