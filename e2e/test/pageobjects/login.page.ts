import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get inputEmail () {
        return $('#email');
    }

    public get inputSenha () {
        return $('#senha');
    }

    public get btnSubmit () {
        return $('#btnLogin');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public async login (email: string, senha: string) {
        await this.inputEmail.setValue(email);
        await this.inputSenha.setValue(senha);
        await this.btnSubmit.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('account/sign-in-psychologist');
    }
}

export default new LoginPage();
