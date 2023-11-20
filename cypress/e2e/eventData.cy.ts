describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:4321/events/2023-12-02-weihnachtsmarkt')
    cy.get('script[type="application/ld+json"]').then(($script) => {
      const jsonData = JSON.parse($script.text())
      expect(jsonData).to.have.property('@context', 'https://schema.org')
      expect(jsonData).to.have.property('@type', 'Event')
      expect(jsonData).to.have.property('name').and.to.be.a('string')
      expect(jsonData.location.name).to.equal('Dorfgemeinschaftshaus Rössing')
      expect(jsonData.organizer.name).to.equal('Dorfpflege Rössing e.V.')
    })
  })
})
