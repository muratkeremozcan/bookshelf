import * as React from 'react'
import {ErrorMessage} from './lib'

describe('ErrorMessage', () => {
  it('should render stacked', () => {
    cy.mount(<ErrorMessage error={{message: 'foo'}} />)
    cy.contains('span', 'There was an error:')

    cy.contains('pre', 'foo')
  })

  it('should render inline', () => {
    cy.mount(<ErrorMessage error={{message: 'foo'}} variant="inline" />)
    cy.contains('There was an error: foo')
  })
})
