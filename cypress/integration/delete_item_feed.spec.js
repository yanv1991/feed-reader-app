describe('Delete a feed item', () => {
    it('Remove the item from list', () => {
      cy.visit('http://localhost:3000');
        
      // we want to remove first item
      cy.get('[data-testid="delete-0"]')
        .click();
    
      // once button is clicked we should see a confirmation message
      cy.contains('Are you sure you want to delete this item?')

      // click on yes
      cy.get('[data-testid="yes-button')
        .click();
        
      // we should see a success message
      cy.contains('Item removed successfully');
    });
  });