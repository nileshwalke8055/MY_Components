import { LightningElement, wire } from 'lwc';
import getBooks from '@salesforce/apex/Books.getAllBooks';

export default class Amazon_Books extends LightningElement
{
bookInfo;
  @wire(getBooks)
    books({error,data}){
        if(data){
            console.log("Book Records:",data);
            this.bookInfo=data;
    }
    else if(error){
        console.log('error',error);

    }
}
}