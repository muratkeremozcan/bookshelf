import React from 'react'
import UnauthenticatedApp from 'unauthenticated-app'
import {AuthProvider} from './context/auth-context'

describe('UnauthenticatedApp', () => {
  it('should render', () => {
    cy.mount(
      <AuthProvider>
        <UnauthenticatedApp />
      </AuthProvider>,
    )
  })
})
