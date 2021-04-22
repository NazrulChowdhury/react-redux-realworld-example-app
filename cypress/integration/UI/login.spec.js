
describe('login',function(){
    before(()=>{
        cy.fixture('userInfo').then(userinfo=>{
            window.user = userinfo
        })
    })
    beforeEach(()=>{
        cy.visit('/#/login?_k=fkl125')
    })
    it('sign in attempt fails with wrong email',function(){      
        cy.signIn(user.wrongEmail, user.password)
        cy.contains('email or password is invalid')
    })
    it('sign in attempt fails with wrong password',function(){       
        cy.signIn(user.email, user.wrongPassword)
        cy.contains('email or password is invalid')
    })
    it.only('sign in attempt successful with correct credentials',function(){
        cy.signIn(user.email, user.password)
        cy.contains('Your Feed').should('be.visible')
    })
    it('login via api', ()=>{ 
        cy.logIn()
    })
})