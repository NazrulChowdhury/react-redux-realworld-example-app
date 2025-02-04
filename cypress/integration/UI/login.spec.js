import * as user from '../../fixtures/userInfo'

describe('login test with diffferent credentials',()=>{
    beforeEach(()=>{
        cy.visit('/login')
    })
    it('sign in attempt fails with wrong email',()=>{      
        cy.signIn(user.wrongEmail, user.password)
        cy.contains('email or password is invalid')
    })
    it('sign in attempt fails with wrong password',()=>{       
        cy.signIn(user.email, user.wrongPassword)
        cy.contains('email or password is invalid')
    })
    it('sign in attempt successful with correct credentials',()=>{
        cy.signIn(user.email, user.password)
        cy.wait(1000)
        cy.menu(user.name).should('exist')
    })
    it('login via the login api', ()=>{ 
        cy.logIn()
    })
})