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

    type_ = 'standard';
    @api 
    get type(){
        return this.type_;
    }
    set type(value){
        this.type_ = (value || 'standard');
    }

    get isCombobox(){
        return this.type === 'combobox';
    }

    get isInput(){
        return this.type === 'input';
    }

    textLabel_;
    @api 
    get textLabel(){
        return this.textLabel_;
    }
    set textLabel(value){
        this.textLabel_ = value;
    }

    @track buttons_ = [
        {label: 'Ok', value: true, variant: 'brand', type: 'standard'},
        {label: 'Cancel', value: false, variant: 'base', type: 'standard'},
    ];
    @api 
    get buttons(){
        return this.buttons_;
    }
    set buttons(value){
        this.buttons_ = value;
    }

    comboboxLabel_;
    @api 
    get comboboxLabel(){
        return this.comboboxLabel_;
    }
    set comboboxLabel(value){
        this.comboboxLabel_ = value;
    }

    comboboxValue;
    @track comboboxOptions_;
    @api
    get comboboxOptions(){
        return this.comboboxOptions_;
    }
    set comboboxOptions(value){
        this.comboboxOptions_ = value;
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

    handleComboboxChange(event){
        this.comboboxValue = event.detail.value;
        this.buttons_ = this.buttons_.map( buttom => {
            if(buttom.type == 'combobox'){
                buttom.value = event.detail.value;
            }
            return buttom;
        });
    }

    timeout;
    handleInputChange(event){
        let scope = this;
        if(this.timeout){
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            scope.buttons_ = scope.buttons_.map( buttom => {
                if(buttom.type == 'input'){
                    buttom.value = event.detail.value;
                }
                return buttom;
            });
        }, 100);
    }

    @api setValues(value){
        Object.keys(value).forEach( key => {
            if(key !== 'style'){
                this[key] = value[key];
            }
        })
        if(value.style != undefined){
            this.setStyle(value.style);
        }
    }

    @api openModal(values){
        let scope = this;
        scope.comboboxValue = undefined;
        scope.showModal = true;
        if(values != undefined){
            scope.setValues(values);
        }
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