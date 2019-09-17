import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { CONTACT_VALIDATION_MESSAGES } from './contact-form.validation.messages';
import { CONSTANTS } from '@app/services/constants.service';
import { ContactService } from '@app/services/contact.service';
import { UIService } from '@app/services/ui.service';
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit  {
  ContactForm: FormGroup;
  validation_messages: any = CONTACT_VALIDATION_MESSAGES;

  /** Formdata to patch . Used for edit mode */
  @Input() CONTACT_DATA: any = null;
  @Input() CONTACT_ID: any = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()

  constructor(private _fb: FormBuilder, private contactService: ContactService, private ui: UIService) { 

  }
  arrayItems :FormArray;
  ngOnInit() {
    this.checkIfEditModeAndPatchForm();

  }

  /** Create Form */
  createForm():void {

  }

  /***Check if edit mode and patch the form*/
  checkIfEditModeAndPatchForm():void {
      this.ContactForm = this._fb.group({
        NAME: [null, [Validators.required]],
        EMAIL: [null,[Validators.required,Validators.email]],
        PHONES: this._fb.array([this.createItem()]),
        CREATED_BY: [CONSTANTS.CREATED_BY, [Validators.required]]
      })    
      let isEditMode: boolean = this.CONTACT_DATA ? true : false
    if (isEditMode) {
      this.createDynamicArray()
      this.ContactForm.patchValue(this.CONTACT_DATA)
    } else
    
    {


    }
  }
  createItem(): FormGroup {
    return this._fb.group({
      MOBILE_NO: ''
    });
  }
  createDynamicArray(): void {
    this.CONTACT_DATA.PHONES.forEach((phone, index) => {
  if (index>0)this.addItem()
});
  } 
  
  get NAME() {
    return this.ContactForm.controls.NAME
  }
  get EMAIL() {
    return this.ContactForm.controls.EMAIL
  }


  get PHONES() {
    return this.ContactForm.get('PHONES') as FormArray;
 }
 addItem() {
  this.arrayItems = this.ContactForm.get('PHONES') as FormArray;
  this.arrayItems.push(this.createItem());
 }
 removeItem(i) {
    //this.arrayItems.re;
    this.PHONES.removeAt(i);
 }

  submitForm(): void {
    if (this.ContactForm.valid) {
      let body = {...this.ContactForm.value}
      console.log(body)
      this.onSubmit.emit(body)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }


}
