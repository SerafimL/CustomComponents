import { LightningElement } from 'lwc';
import { confirmationModal } from 'c/confirmationModal';

export default class ModalTest extends LightningElement {
    result;

    async handleOpenModal(){
        let value = await confirmationModal(this);
        console.log(value);
        this.result = value;
    }

    picklistValue = '';
    handlePicklistChange(event){
        this.picklistValue = event.detail.value;
    }

    picklistOptions = [
        {label: 'one', value: 'one'},
        {label: 'two', value: 'two'},
        {label: 'three', value: 'three'},
        {label: 'four', value: 'four'},
    ];

    get buttonModal(){
        return [
            {label: 'Ok', variant: 'brand', value: this.picklistValue},
            {label: 'cancel', value: 'você cancelou o modal'},
        ];
    }
}