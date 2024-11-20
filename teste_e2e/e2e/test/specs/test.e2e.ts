import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()
        await LoginPage.login('joao@gmail.com', 'senha123')
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveText(
            expect.stringContaining('Histórico de Consultas'))
        await expect(SecurePage.flashAlert).toMatchSnapshot('Histórico de Consultas')
    })
})

describe('My Login application', () => {
    it('should not login with invalid password', async () => {
        await LoginPage.open()
        await LoginPage.login('joao@gmail.com', 'senha12345')
        await browser.pause(3000);
        const messageToastr = await LoginPage.getMessageToastr();
        const text = await messageToastr.getText();
        expect(text).toContain('Dados inválidos');
        await browser.pause(3000);
    })
    
    it('should not login with invalid email', async () => {
        await LoginPage.open()
        await LoginPage.login('joaooo@gmail.com', 'senha123')
        await browser.pause(3000);
        const messageToastr = await LoginPage.getMessageToastr();
        const text = await messageToastr.getText();
        expect(text).toContain('Dados inválidos');
        await browser.pause(3000);
    })
})


describe('My Login application', () => {
    it('should have the submit button disabled when the form is incomplete', async () => {
        await LoginPage.open(); 
        await LoginPage.inputEmail.setValue('joao@gmail.com');
        await LoginPage.inputSenha.setValue('');
        const isButtonDisabled = await LoginPage.btnSubmit.getAttribute('disabled');
        await expect(isButtonDisabled).toBe('true');
    });
});

