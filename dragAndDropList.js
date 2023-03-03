import { api, LightningElement } from 'lwc';
export default class DragAndDropList extends LightningElement
{
    @api records
    @api stage


    handleItemdrag(evt){
        const event =new CustomEvent('listitemdrag',{
            detail: evt.detail
        })
        this.dispatchEvent(event)

    }
    handledragover(evt){
        evt.preventDefault() 

    }
    handledrop(evt){
        const event =new CustomEvent('itemdrop',{
            detail: this.stage
        })
        this.dispatchEvent(event)
    }
}