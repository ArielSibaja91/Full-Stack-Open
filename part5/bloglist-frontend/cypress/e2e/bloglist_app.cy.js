describe('Bloglist app', function() {
  beforeEach(function() {
    cy.createuser({
      name: 'Test User',
      username: 'testuser',
      password: 'testpassword'
    })
  })

  it('Login appears in the screen', function() {
    cy.contains('Log into the application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({username: 'testuser', password: 'testpassword'})
      cy.contains('testuser logged in')
    })
    it('fails with wrong credentials', function() {
      cy.login({username: 'testuser', password: 'wrongpassword'})
      cy.get('.error').contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({username: 'testuser', password: 'testpassword'})
      cy.contains('testuser logged in')
    })
    it('A blog can be created', function() {
      cy.newblog({ title: 'Test title', author: 'Test author', url: 'https://fullstackopen.com' })
      cy.contains('Test title Test author')
    })
  })

  describe('a blog was created', function() {
    beforeEach(function() {
      cy.login({username: 'testuser', password: 'testpassword'})
      cy.newblog({ title: 'Test title', author: 'Test author', url: 'https://fullstackopen.com' })
      cy.contains('Test title Test author')
    })
    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('0').contains('like').click()
      cy.contains('1')
    })
    it('a blog can be removed', function() {
      cy.contains('view').click()
      cy.get('#remove-button').click()
      cy.contains('remove').should('not.exist')
    })
  })
})