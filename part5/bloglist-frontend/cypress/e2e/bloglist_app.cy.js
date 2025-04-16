describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test user',
      username: 'testuser',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit("http://localhost:5173/")
  })

  it('Login appears in the screen', function() {
    cy.contains('Log into the application')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
      cy.contains('testuser logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
      cy.contains('testuser logged in')
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('https://fullstackopen.com')
      cy.get('#create-button').click()
      cy.contains('Test title Test author')
    })
  })

  describe('a blog was created', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpassword')
      cy.get('#login-button').click()
      cy.contains('create new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test author')
      cy.get('#url').type('https://fullstackopen.com')
      cy.get('#create-button').click()
      cy.contains('Test title Test author')
    })

    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.contains('0').contains('like').click()
      cy.contains('1')
    })
  })
})