// sign in via UI
Cypress.Commands.add('signIn', (email, password) => {
    cy.title().should('eq', 'Conduit')
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').contains('Sign in').should('be.visible').click()
})
//sign in via api 
Cypress.Commands.add('logIn', ()=>{
    cy.fixture('userInfo').then(user =>{
        cy.request({
            url : 'https://conduit.productionready.io/api/users/login',
            method : 'POST',
            body: { user: {email: user.email, password : user.password} }
        }).then(res =>{
            localStorage.setItem('jwt',res.body.user.token)
            cy.visit('https://react-redux.realworld.io')
            cy.contains('Your Feed').should('be.visible')
        })
    })  
}) 
// menu item selection
Cypress.Commands.add('menu', (pageName) => {
    cy.get('ul.navbar-nav').children().contains(pageName)
})