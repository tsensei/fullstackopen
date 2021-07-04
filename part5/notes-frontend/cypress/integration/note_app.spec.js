describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "haru",
      username: "haru",
      password: "password",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("login fails with wrong password", function () {
    cy.contains("log in").click();
    cy.get("#username").type("haru");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    // cy.get(".error").contains("wrong credentials");

    // cy.get(".error").should("contain", "wrong credentials");
    // cy.get(".error").should(
    //   "have.css",
    //   "background-color",
    //   "rgb(212, 212, 212)"
    // );
    // cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");

    cy.get(".error")
      .should("contain", "wrong credentials")
      .and("have.css", "background-color", "rgb(212, 212, 212)")
      .and("have.css", "color", "rgb(255, 0, 0)");

    cy.get("html").should("not.contain", "haru logged in");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2021"
    );
  });

  // it("front page contains random text", function () {
  //   cy.visit("http://localhost:3000");
  //   cy.contains("wtf is this app?");
  // });

  it("login form can be opened", function () {
    cy.contains("log in").click();
  });

  it("user can login", function () {
    cy.contains("log in").click();
    cy.get("#username").type("haru");
    cy.get("#password").type("password");
    cy.get("#login-button").click();
    cy.contains("haru logged in");
  });

  describe("when logged in", function () {
    // beforeEach(function () {
    //   cy.contains("log in").click();
    //   cy.get("#username").type("haru");
    //   cy.get("#password").type("password");
    //   cy.get("#login-button").click();
    // });

    // beforeEach(async function () {
    //   const res = await cy.request("POST", "http://localhost:3001/api/login", {
    //     username: "haru",
    //     password: "password",
    //   });
    //   localStorage.setItem("loggedNoteappUser", JSON.stringify(res.body));
    //   cy.visit("http://localhost:3000");
    // });

    beforeEach(function () {
      cy.login({ username: "haru", password: "password" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input").type("a new note created by cypress");
      cy.get("#save-btn").click();
      cy.get("#show-btn").click();
      cy.contains("a new note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        cy.createNote({
          content: "another note cypress",
          important: false,
        });
      });

      it("it can be made important", function () {
        cy.get("#show-btn").click();

        cy.contains("another note cypress")
          .parent()
          .contains("make important")
          .click();

        cy.contains("another note cypress")
          .parent()
          .contains("make not important");
      });
    });

    describe("and a several notes exist", function () {
      beforeEach(function () {
        cy.createNote({
          content: "first note",
          important: false,
        });
        cy.createNote({
          content: "second note",
          important: false,
        });
        cy.createNote({
          content: "third note",
          important: false,
        });
      });

      // it("one of those can be made important", function () {
      //   cy.contains("show all").click();

      //   cy.contains("second note").parent().contains("make important").click();

      //   cy.contains("second note").parent().contains("make not important");
      // });

      // it('other of those can be made important', function () {
      //   cy.contains('second note').parent().find('button').click()
      //   cy.contains('second note').parent().find('button')
      //     .should('contain', 'make not important')
      // })

      it("other of those can be made important", function () {
        cy.contains("show all").click();

        cy.contains("second note").parent().find("button").as("theButton");
        cy.get("@theButton").click();
        cy.get("@theButton").should("contain", "make not important");
      });
    });
  });
});
