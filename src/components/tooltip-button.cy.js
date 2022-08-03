import TooltipButton from './tooltip-button'
import React from 'react'
import * as colors from 'styles/colors'
import {FaPlusCircle} from 'react-icons/fa'

describe('TooltipButton', () => {
  it('should render', () => {
    const label = 'Add to list'
    cy.mount(
      <TooltipButton
        label={label}
        highlight={colors.indigo}
        onClick={cy.stub().as('onClick').resolves(true)}
        icon={<FaPlusCircle />}
      />,
    )

    cy.get('button').realHover()
    cy.contains(label)
    cy.get('button').click()
    cy.get('@onClick').should('have.been.calledOnce')
  })
})
