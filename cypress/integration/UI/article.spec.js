describe('create article and mark unmark as favorite',function(){
    before(()=>{
        cy.logIn();
        cy.fixture('userInfo').then(userinfo=>{
            window.user = userinfo
        })
    })
    it('create a post', function(){ 
        cy.menu('New Post').click()
        cy.hash().should('include','#/editor')
        const post = Math.random().toString(36).slice(2)
        cy.get('form').within(($form)=>{
            cy.get('input').first().type('title'+post)
            cy.get('input').eq(1).type('subject'+post) 
            cy.get('textarea').last().type('body'+post)
            cy.get('button[type="button"]').contains('Publish Article').should('be.visible').click()
        }) 
        cy.hash().should('contain', '#/article')
        cy.contains('title'+post)
    })  
    it('likes an article',function(){
        cy.menu(user.name).click()
        cy.contains('My Articles').should('be.visible')
        cy.get('.btn-outline-primary',{timeout:10000}).first().click() 
    }) 
    it('unlikes an article',()=>{
        cy.reload()
        cy.get('.btn-outline-primary',{timeout:10000}).first().click()

    }) 
    it.only('comment on an article then delete it',()=>{
        cy.menu(user.name).click()
        cy.contains('My Articles').should('be.visible')
        cy.get('div.article-preview > a.preview-link').first().click()
        const myComment = Math.random().toString(36).slice(2)
        cy.get('textarea.form-control').type(myComment)
        cy.get('button[type="submit"]').contains('Post Comment').click()
        cy.get('p.card-text').first().as('comment')
        cy.get('@comment').contains(myComment)
        cy.get('span[class="mod-options"] > i.ion-trash-a').first().click()
        //cy.wait(3000)
        //cy.reload()
        // cy.get('p.card-text').should('not.exist')
  })
})
