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
        await expect(SecurePage.flashAlert2).toBeExisting()
        await expect(SecurePage.flashAlert2).toHaveText(
            expect.stringContaining('Área do Psicólogo'))
        await expect(SecurePage.flashAlert2).toMatchSnapshot('Área do Psicólogo')

    })
    
    it('should not login with invalid email', async () => {
        await LoginPage.open()
        await LoginPage.login('joaoo@gmail.com', 'senha123')
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveText(
            expect.stringContaining('You did not log into a secure area!'))
        await expect(SecurePage.flashAlert).toMatchSnapshot('flashAlert')
    })
})

