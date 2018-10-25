describe('Hello world', () => {
    it('should say "Hello, World!"', () => {
        cy.visit('./index.html');

        cy.get('h1').contains('Calculator');
    });
});
