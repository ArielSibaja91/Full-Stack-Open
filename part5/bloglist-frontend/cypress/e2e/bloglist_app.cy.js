describe('Bloglist app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173')
  })

  it('Login appears in the screen', function() {
    cy.contains('Log into the application')
    cy.contains('username')
    cy.contains('password')
  })
})