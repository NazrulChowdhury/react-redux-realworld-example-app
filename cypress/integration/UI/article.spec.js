import user from "../../fixtures/userInfo"
import * as article from "../../page.modules/article";

describe('create post/ mark unmark as favorite/ add and delete comment/ delete post', ()=>{
    before(()=>{
        cy.logIn();
        article.addPostAndComment(user) // adds unique post and comment to the user object      
    })
    it('create a post', ()=>{ 
        cy.menu('New Post').click()
        cy.url().should('include','/editor')
        article.createPost(user.post)
        cy.url().should('contain', '/article')
        cy.contains(user.postTitle)
    })  
    it('like a post', ()=>{
        cy.menu(user.name).click()
        article.clicklikeButton() 
        article.checkLike('exist')   
    }) 
    it('unlike a post',()=>{
        cy.menu(user.name).click()
        article.clicklikeButton() 
        article.checkLike('not.exist')
    }) 
    it('comment on an post', ()=>{
        cy.menu(user.name).click()
        article.postComment(user.comment)
        cy.get('p.card-text').first().contains(user.comment)
    })
    it('delete a comment', ()=>{
        cy.menu(user.name).click()
        cy.get('a.preview-link').first().should('contain',user.postTitle).click()
        cy.get('span.mod-options > i.ion-trash-a').first().click()
        cy.wait(500)
        cy.contains(user.comment).should('not.exist')
    })
    it('delete a post', ()=>{
        cy.menu(user.name).click()
        cy.get('a.preview-link').first().should('contain',user.postTitle).click()
        cy.get('i.ion-trash-a').first().click()
        cy.menu(user.name).click()
        cy.contains(user.postTitle).should('not.exist')
    })
})
