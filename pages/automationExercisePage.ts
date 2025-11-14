import { Locator, Page, expect} from "@playwright/test";
import {requiredProducts, viewCartURL} from "../constants/automationExercise"

export class automationExercisePage{
    private readonly Cart: Locator;
    private readonly EmptyCart: Locator; 






    constructor(private readonly page: Page) {
        this.Cart = page.getByRole('link', { name: 'Cart' });
        this.EmptyCart = page.locator('.table-responsive.cart_info]');

    }

    async clickCart() : Promise<void>{
        await expect(this.Cart).toBeVisible();
        await this.Cart.click();
        await expect(this.page).toHaveURL(viewCartURL);
        
    }
}