/**
 * confirmationModal v2
 * author: Lucas Serafim 
 * */ 
import { LightningElement, api, track } from 'lwc';

export default class ConfirmationModal extends LightningElement {

    @api modalHeight = 'fit-content';
    @api modalWidth = '50%';
    @api showSpinner;
    
    confirmationResult;
    showModal = false;

    title_;
    @api 
    get title(){
        return this.title_;
    }
    set title(value){
        this.title_ = value;
    }

    @track buttons_ = [
        {label: 'Ok', value: true},
        {label: 'Cancel', value: false},
    ];
    @api 
    get buttons(){
        return this.buttons_;
    }
    set buttons(value){
        this.buttons_ = value;
    }

    @api get name(){
        return this.name;
    }
    set name(value){
        this.setAttribute('name', value);
        this.setAttribute('class', value);
    }

    setStyle(value){        
        document.documentElement.style.setProperty('--modal-height', value.height);
        document.documentElement.style.setProperty('--modal-width', value.width);
    }
    
    handleCloseClick(){
        this.confirmationResult(false);
    }

    handleButtonClick(event){
        this.confirmationResult(event.target.value);
    }


    @api openModal(){
        let scope = this;
        scope.comboboxValue = undefined;
        scope.showModal = true;
        return new Promise((resolve) => {
            scope.confirmationResult = (result) => {
                resolve(result);
            }
        }).then(response => {
            scope.showModal = false;
            return response;
        });
    }

    isFirstRender = true;
    renderedCallback() {
        if (!this.isFirstRender) {
            return;
        }
        this.isFirstRender = false;
        this.setStyle({height: this.modalHeight, width: this.modalWidth});
    }
}

export const confirmationModal = (scope, name) => {
    if(!!name){
        return scope.template.querySelector(`c-confirmation-modal.${name}`)?.openModal();
    }else{
        return scope.template.querySelector(`c-confirmation-modal`)?.openModal();
    }
}