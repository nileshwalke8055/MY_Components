import {LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import { getPicklistValues, getObjectInfo } from 'lightning/uiObjectInfoApi';
import OPPORTUNITY_OBJECT from '@salesforce/schema/Opportunity';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';
import ID_FIELD from '@salesforce/schema/Opportunity.Id';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { updateRecord } from 'lightning/uiRecordApi';
import {refreshApex} from '@salesforce/apex'

export default class Lwc_dragAndDrop extends LightningElement {

    records
    pickVals
    recordId    //Fething Opportunities data
    @wire(getListUi, {
        objectApiName: OPPORTUNITY_OBJECT,
        listViewApiName: 'Allopportunities'
    }) wiredListView({ error, data }) {
        screenTop
        if (data) {
            console.log("getListUi", data);
            this.records = data.records.records.map(item => {
                let field = item.fields
                let account = field.Account.value.fields
                return { 'Id': field.Id.value, 'Name': field.Name.value, 'AccountId': account.Id.value, 'AccountName': account.Name.value, 'CloseDate': field.CloseDate.value, 'StageName': field.StageName.value, 'Amount': field.Amount.value }
            })
        }
        if (error) {
            console.log(error);
        }
    }
    //Fetch REcordType
    @wire(getObjectInfo, { objectApiName: OPPORTUNITY_OBJECT }) objectInfo
    //geting picklistVlaues
    @wire(getPicklistValues, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: STAGE_FIELD
    })
    stagePicklistValues({ error, data }) {
        if (data) {
            console.log("Stage PickList", data);
            this.pickVals = data.values.map(item => item.value);
        }
        if (error) {
            console.log(error);
        }
    }
    get calcWidth() {
        let len = this.pickVals.length +1
        return 'width: calc(100vw/ ${len})'
    }

1

    handleListItemDrag(event){
        this.recordId =event.detail
    }
    handleItemDrop(event){
        let stage =event.detail
     //    this.records=this.records.map(item=>{
    //        return item.id === this.recordId ? {...item, StageName}:{...item}
     //    })
     this.updateHandler(stage)
    }

    updateHandler(stage){
        const fields ={};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[STAGE_FIELD.fieldApiName]=stage;
        const recordInput ={fields};
        updateRecord(recordInput)
        .then(()=>{
            console.log("update Successfully")
            this.showToast()
            return refreshApex(this.wiredListView)
        }).catch(error=>{
            console.log(error);
        })
    }
    showToast() {
    const evt = new ShowToastEvent({
        title: 'Success',
        message: 'Stage updated Successfully',
        variant: 'success',
        mode: 'dismissable',
    });
    this.dispatchEvent(evt);
    }


}