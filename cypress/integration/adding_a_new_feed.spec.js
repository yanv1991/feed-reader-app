describe('Adding a feed', () => {
    it('Displays the feed in the list', () => {
      cy.visit('http://localhost:3000');
  
      cy.get('[data-testid="urlFeed"]')
        .type('https://www.reddit.com/.rss');
  
      cy.get('[data-testid="sendButton"]')
        .click();
  
      cy.get('[data-testid="urlFeed"]')
        .should('have.value', '');
  
      cy.contains('reddit: the front page of the internet');
    });
  });