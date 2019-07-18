describe('Question 2 - Automated Scenarios', () => {
    beforeEach(function () {

       // Cypress.Cookies.defaults({
          //  whitelist: ['ASP.NET_SessionId', 'SC_ANALYTICS_GLOBAL_COOKIE', 'TS011777e6', '__atuvc']
       // });
        cy.clearCookies();
        cy.clearLocalStorage();
    });


    it('Automated scenarios', () => {
        
        //requesting the url
        cy.visit('http://www.willistowerswatson.com/ICT');

        //If site cookie pops up, accept it and proceed
        //To accept the cookie, there has to be a wait of 5 seconds.
        //There is no other way around this.
        cy.wait(5000);
        cy.get('body').then(($body) =>{
            if($body.find("iframe[src^='https://consent-pref.trustarc.com/?type=willistowerswatson1&site=willistowerswatson.com&action=notice&country=gb&locale=en&behavior=expressed&layout=default_eu&from=https://consent.trustarc.com/']")){

            console.log("cookies exist");
            cy.get("iframe[src^='https://consent-pref.trustarc.com/?type=willistowerswatson1&site=willistowerswatson.com&action=notice&country=gb&locale=en&behavior=expressed&layout=default_eu&from=https://consent.trustarc.com/']").then($iframe => {
                const iframe = $iframe.contents();
                const myInput = iframe.find('body > div:nth-child(16) > div.mainContent > div > div:nth-child(2) > div.pdynamicbutton > a.call');
                cy.wrap(myInput).click({ force: true });
            });
        } else{
            console.log('no cookies poped up');
        }
        });

        //confirming the language is US English
        cy.get('span.sr-only').contains('Menu, current location and language selection is United States   English, use this menu to select a new location and language');

        //Click search and type 'IFRS 17' and hit enter
        cy.get('.material-icons').contains('search').click();
        cy.get('input').should('have.attr', 'aria-label', 'Search box').type('IFRS 17');
        cy.get('a.CoveoSearchButton').should('have.attr', 'aria-label', 'Search').click();

        //Confirm that there are results
        cy.get('.CoveoQuerySummary > :nth-child(1)').contains('Results');
        cy.get(':nth-child(1) > a.CoveoResultLink > .coveo-result-frame > :nth-child(1) > .coveo-title > h3 > .CoveoResultLink > :nth-child(1)').contains('IFRS');
        
        //Sort by date and Article
        cy.get('#coveo9de96e90').click();
        cy.get('[data-value="Article"] > .coveo-facet-value-label > .coveo-facet-value-label-wrapper > .coveo-facet-value-checkbox').click();
        
        //confirm that each article starts with “https://www.willistowerswatson.com/en-US/”

        cy.get('#coveoc9f4bcfb > div:nth-child(2) > div > div.container.search-listings > div.coveo-results-column.col.col-lg-8 > div:nth-child(4) > div > div.coveo-result-list-container.coveo-list-layout-container')
            .then((result) => {
                expect(result[0].children[0].baseURI).to.contain('https://www.willistowerswatson.com/en-US/');
                expect(result[0].children[1].baseURI).to.contain('https://www.willistowerswatson.com/en-US/');
                expect(result[0].children[2].baseURI).to.contain('https://www.willistowerswatson.com/en-US/');
                expect(result[0].children[3].baseURI).to.contain('https://www.willistowerswatson.com/en-US/');
                expect(result[0].children[4].baseURI).to.contain('https://www.willistowerswatson.com/en-US/');
                expect(result[0].children[5].baseURI).to.contain('https://www.willistowerswatson.com/en-US/');
                expect(result[0].children[6].baseURI).to.contain('https://www.willistowerswatson.com/en-US/');
                expect(result[0].children[7].baseURI).to.contain('https://www.willistowerswatson.com/en-US/');

            });
    });
});