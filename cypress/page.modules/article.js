export function addPostAndComment(user){
    user.post = Math.random().toString(36).slice(2)
    user.postTitle = 'title'+user.post
    user.comment = Math.random().toString(36).slice(2)
}
export function clicklikeButton(){
    cy.get('.ion-heart').first().click()
    cy.wait(2000)
    cy.get('li.nav-item > a.nav-link').contains('Favorited Articles').click()
}
export function checkLike(status){
    cy.url().should('include', '/favorites')
    cy.get('.ion-heart ').should(status)
}
export function createPost(post){
    cy.get('form').within(($form)=>{
        cy.get('input').first().type('title'+post)
        cy.get('input').eq(1).type('subject'+post) 
        cy.get('textarea').last().type('body'+post)
        cy.get('button[type="button"]').contains('Publish Article').should('be.visible').click()
    }) 
}
export function postComment(comment){
    cy.get('div.article-preview > a.preview-link').first().click()
    cy.get('textarea.form-control').type(comment)
    cy.get('button[type="submit"]').contains('Post Comment').click()
}
