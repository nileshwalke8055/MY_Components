import { LightningElement, track, wire } from 'lwc';
import getRecord from '@salesforce/apex/Apex_CreatePassangers.createPassRecords';

export default class LWC_CreatePassangers extends LightningElement {

    @track fname;
    @track lname;
    @track email;
    @wire(getRecord, { fname: '$fname', lname: '$lname', email: '$email' }) pass;


    PFName(event) {
        this.fname = event.target.value;
    }
    PLName(event) {
        this.lname = event.target.value;
    }
    PFEmail(event) {
        this.email = event.target.value;
    }
   ////Imperatively
    OnSave() {

        getRecord({
            fname: this.fname,
            lname: this.lname,
            email: this.email
        })
            .then(response => {
                alert(response)
            }).catch(error=>{
                alert(error.body.message);
            });
    }

}