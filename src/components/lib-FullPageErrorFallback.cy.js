import * as React from 'react'
import {FullPageErrorFallback} from './lib'

describe('FullPageErrorFallback', () => {
  it('should render error page', () => {
    cy.mount(<FullPageErrorFallback error={{message: 'foo'}} />)

    cy.contains('p', "Uh oh... There's a problem. Try refreshing the app.")
    cy.contains('pre', 'foo')
  })
})
