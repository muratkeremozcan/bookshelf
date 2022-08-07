import React from 'react'
import {ModalOpenButton, ModalContents, Modal} from './modal'
import {AuthProvider} from '../context/auth-context'
import '@reach/dialog/styles.css'

describe('Modal', () => {
  it('should render the modal', () => {
    const label = 'Modal Label'
    const title = 'Modal Title'
    cy.mount(
      <AuthProvider>
        <Modal>
          <ModalOpenButton>
            <button>Open</button>
          </ModalOpenButton>
          <ModalContents aria-label={label} title={title}>
            <div>Modal Content</div>
          </ModalContents>
        </Modal>
      </AuthProvider>,
    )

    cy.contains('button', /open/i).click()

    cy.getByClassLike('ModalContents').contains(title)
    cy.findByLabelText(label).should('be.visible')

    cy.getByClassLike('CircleButton').click()
    cy.getByClassLike('ModalContents').should('not.exist')
  })
})

// 1:1 RTL comparison src/components/__tests__/modal.js
