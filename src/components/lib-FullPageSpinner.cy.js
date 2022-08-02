import {FullPageSpinner} from './lib'
import * as React from 'react'

describe('FullPageSpinner', () => {
  it('should spin', () => {
    cy.mount(<FullPageSpinner />)
    cy.get('path').should('be.visible')
  })
})
