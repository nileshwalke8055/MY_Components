import { LightningElement } from 'lwc';
import loginToAmazon from '@salesforce/apex/Loginuser.loginToAmazon';
export default class Amazon_login extends LightningElement {
    email;
    password;
    errorMessage;
    handelusername(event) {
        this.email = event.target.value;
    }
    handelpassword(event) {
        this.password = event.target.value;
    }
    handlelogin() {
        if (this.email != null && this.password != null) {
            loginToAmazon({ username: this.email, password: this.password })
                .then((result) => {
                    window.location.href = result;

                }).catch((error) => {
                    this.error = error;
                    this.errorCheck = true;
                    this.errorMessage = error.body.message;
                });
        }
    }





}