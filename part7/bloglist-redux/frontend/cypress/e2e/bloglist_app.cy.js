describe("Bloglist app", function () {
  beforeEach(function () {
    cy.resetDB();
    cy.createuser({
      name: "Test User",
      username: "testuser",
      password: "testpassword",
    });
    cy.createuser({
      name: "Test User2",
      username: "testuser2",
      password: "testpassword2",
    });
    cy.visit("");
  });

  it("Login appears in the screen", function () {
    cy.contains("Log into the application");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.login({ username: "testuser", password: "testpassword" });
      cy.contains("testuser logged in");
    });
    it("fails with wrong credentials", function () {
      cy.login({ username: "testuser", password: "wrongpassword" });
      cy.get(".error").contains("Wrong username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "testpassword" });
      cy.contains("testuser logged in");
    });
    it("A blog can be created", function () {
      cy.newblog({
        title: "Test title",
        author: "Test author",
        url: "https://fullstackopen.com",
      });
      cy.contains("Test title Test author");
    });
  });

  describe("a blog was created", function () {
    beforeEach(function () {
      cy.login({ username: "testuser", password: "testpassword" });
      cy.newblog({
        title: "Test title",
        author: "Test author",
        url: "https://fullstackopen.com",
      });
      cy.contains("Test title Test author");
    });
    it("A blog can be liked", function () {
      cy.contains("view").click();
      cy.contains("0").contains("like").click();
      cy.contains("1");
    });
    it("a blog can be removed", function () {
      cy.contains("view").click();
      cy.get("#remove-button").click();
      cy.contains("remove").should("not.exist");
    });
  });

  describe("when there are different users", function () {
    beforeEach(function () {
      cy.login({ username: "testuser2", password: "testpassword2" });
      cy.contains("testuser2 logged in");
      cy.newblog({
        title: "Test title2",
        author: "Test author2",
        url: "https://fullstackopen.com",
      });
      cy.contains("Test title2 Test author2");
    });

    it("only the creator can remove the blog", function () {
      cy.contains("logout").click();
      cy.wait(2000);
      cy.login({ username: "testuser", password: "testpassword" });
      cy.contains("testuser logged in");

      cy.contains("view").click();
      cy.get("#remove-button").should("not.exist");
    });

    it("blog list is ordered by likes", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Blog with least likes");
      cy.get("#author").type("Author with least likes");
      cy.get("#url").type("https://fullstackopen.com");
      cy.get("#create-button").click();

      cy.contains("Blog with least likes Author with least likes");
      cy.contains("view").click();
      cy.contains("0").contains("like").click();
      cy.contains("1").contains("like").click();
      cy.contains("2");

      cy.get(".blog").eq(0).should("contain", "Test title2 Test author2");
      cy.get(".blog")
        .eq(1)
        .should("contain", "Blog with least likes Author with least likes");
    });
  });
});
