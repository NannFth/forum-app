describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should display the login page correctly', () => {
    cy.get('a').contains('Masuk').click();

    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains('Login').should('be.visible');
  });

  it('should display an alert when the email is not registered', () => {
    cy.get('a').contains('Masuk').click();

    cy.get('input[placeholder="Email"]').type('user_yang_tidak_terdaftar@example.com');
    cy.get('input[placeholder="Password"]').type('password_sembarangan');

    cy.on('window:alert', (text) => {
      expect(text).to.be.a('string');
    });

    cy.get('button').contains('Login').click();
  });

  it('should display an alert when the password is wrong', () => {
    cy.get('a').contains('Masuk').click();

    cy.get('input[placeholder="Email"]').type(Cypress.env('EMAIL'));
    cy.get('input[placeholder="Password"]').type('password_yang_salah_pasti');

    cy.on('window:alert', (text) => {
      expect(text).to.be.a('string');
    });

    cy.get('button').contains('Login').click();
  });

  it('should display the homepage with a "Keluar" button after successful login', () => {
    cy.get('a').contains('Masuk').click();

    cy.get('input[placeholder="Email"]').type(Cypress.env('EMAIL'));
    cy.get('input[placeholder="Password"]').type(Cypress.env('PASSWORD'));
    cy.get('button').contains('Login').click();

    cy.get('button').contains('Keluar').should('be.visible');
    cy.get('a').contains('Masuk').should('not.exist');
  });
});
