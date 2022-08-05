import * as React from 'react'
import ListItemTimeFrame from './list-item-time-frame'
const {listItems} = require('../../cypress/fixtures/list-items.json')

describe('ListItemTimeFrame', () => {
  it('should render start date', () => {
    cy.mount(<ListItemTimeFrame listItem={listItems[0]} />)
    cy.get('span').realHover()
    cy.contains('Start date')
  })
  it('should render start and finish dates', () => {
    cy.mount(<ListItemTimeFrame listItem={listItems[1]} />)
    cy.get('span').realHover()
    cy.contains('Start and finish date')
  })
})
