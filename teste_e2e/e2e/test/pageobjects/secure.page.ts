import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    /**
     * define selectors using getter methods
     */
    public get flashAlert () {
        return $('#titulo');
    }

    public get flashAlert2 () {
        return $('#titulo2');
    }
}

export default new SecurePage();
