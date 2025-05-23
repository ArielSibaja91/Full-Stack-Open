// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("resetDB", () => {
  cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
});

Cypress.Commands.add("createuser", ({ name, username, password }) => {
  cy.request("POST", `${Cypress.env("BACKEND")}/users/`, {
    name,
    username,
    password,
  });
});

Cypress.Commands.add("login", ({ username, password }) => {
  cy.get("#username").type(username);
  cy.get("#password").type(password);
  cy.get("#login-button").click();
});

Cypress.Commands.add("newblog", ({ title, author, url }) => {
  cy.contains("create new blog").click();
  cy.get("#title").type(title);
  cy.get("#author").type(author);
  cy.get("#url").type(url);
  cy.get("#create-button").click();
});
