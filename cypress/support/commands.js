Cypress.Commands.add('uiLogin', (username, password) => {
  cy.visit('/')

  cy.findByRole('button', {name: /register/i}).click()

  return cy.findByRole('dialog').within(() => {
    cy.findByRole('textbox', {name: /username/i}).type(username)
    cy.findByLabelText(/password/i).type(password)
    return cy.findByRole('button', {name: /register/i}).click()
  })
})

Cypress.Commands.add('getByCy', (selector, ...args) =>
  cy.get(`[data-cy="${selector}"]`, ...args),
)

Cypress.Commands.add('getByCyLike', (selector, ...args) =>
  cy.get(`[data-cy*=${selector}]`, ...args),
)

Cypress.Commands.add('getByClassLike', (selector, ...args) =>
  cy.get(`[class*=${selector}]`, ...args),
)
