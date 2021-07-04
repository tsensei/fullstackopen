describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users", {
      name: "haru",
      username: "haru",
      password: "password",
    });
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Username");
    cy.contains("Password");
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("input:first").type("haru");
      cy.get("input:last").type("password");
      cy.get("button").click();
      cy.contains("haru logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("input:first").type("haru");
      cy.get("input:last").type("wrong");
      cy.get("button").click();

      cy.contains("Wrong username or password").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "haru", password: "password" });
    });

    // it("bypass successful", function () {
    //   cy.contains("haru logged in");
    // });

    it("A blog can be created", function () {
      cy.contains("Create new blog").click();
      cy.get("#title-input").type("tenken");
      cy.get("#author-input").type("sojiro");
      cy.get("#url-input").type("www.rrk.com");
      cy.contains("create").click();

      cy.contains("tenken");
      cy.contains("sojiro");
    });

    describe("a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "a blog cypress",
          author: "cypress",
          url: "www.cypressjs.com",
        });
      });

      it("a blog can be liked", function () {
        cy.contains("a blog cypress").contains("view").click();
        cy.contains("likes 0").get(".likeBtn").click();
        cy.contains("likes 1");
      });

      it("blog can be deleted by user", function () {
        cy.contains("a blog cypress").contains("view").click();
        cy.get(".deleteBtn").click();
        cy.should("not.contain", "a blog cypress");
      });

      describe("logged in as other user", function () {
        beforeEach(function () {
          cy.request("POST", "http://localhost:3001/api/users", {
            name: "testUser",
            username: "testUser",
            password: "testword",
          });
          cy.contains("logout").click();
          cy.login({ username: "testUser", password: "testword" });
        });

        it("blog cant be deleted", function () {
          cy.contains("testUser logged in");
          cy.contains("a blog cypress").contains("view").click();
          cy.should("not.contain", "Delete");
        });
      });
    });

    describe("many blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "blog 1 blog cypress",
          author: "cypress",
          url: "www.cypressjs.com",
          likes: 100,
        });
        cy.createBlog({
          title: "blog 2 blog cypress",
          author: "cypress",
          url: "www.cypressjs.com",
          likes: 200,
        });
        cy.createBlog({
          title: "blog 3 cypress",
          author: "cypress",
          url: "www.cypressjs.com",
          likes: 50,
        });
        cy.createBlog({
          title: "blog 4 cypress",
          author: "cypress",
          url: "www.cypressjs.com",
          likes: 150,
        });
        cy.createBlog({
          title: "most liked cypress",
          author: "cypress",
          url: "www.cypressjs.com",
          likes: 300,
        });
      });

      it("blogs are ordered according to likes", function () {
        let likeArr = [];
        cy.get(".view-btn").click({ multiple: true });
        cy.get(".like-num").then((result) => {
          for (let i in result) {
            if (result[i].textContent) {
              likeArr.push(Number(result[i].textContent));
            }
          }
          let sorted = true;
          for (let j = 1; j < likeArr.length; j++) {
            if (likeArr[j] > likeArr[j - 1]) {
              sorted = false;
              break;
            }
          }
          expect(sorted).to.eq(true);
        });
      });
    });
  });
});
