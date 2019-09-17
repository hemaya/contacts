import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from '@app/services/ui.service';
import { ContactService } from '@app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  CONTACT_DATA: any

  CONTACT_ID:  number

  constructor(    
    private route: ActivatedRoute,
    private contactService: ContactService,
    private ui: UIService,
    private router: Router,
) { 
  this.getItemTemplateData()
  this.getItemTemplateId()

}

  ngOnInit() {
  }
  getItemTemplateId(): void {
    this.CONTACT_ID = this.route.snapshot.params['id']
  }

  /** Get Edit data from resolver */
  getItemTemplateData() {
    const formData = this.route.snapshot.data['contactData']
    //formData.STATUS = formData.STATUS ? formData.STATUS.toString() : formData.STATUS;
    this.CONTACT_DATA = formData
  }

  /** Update Item template form */
  updateContact(formData2: any) {
     this.contactService.updateContact( formData2, this.CONTACT_ID).subscribe(
      data => {
        this.ui.createMessage('success', 'Updated contact')
        this.navigateToList()
      },
      error => this.ui.createMessage('error', 'Error while UPDATING contact'),
    ) 

  }

  /** Navigate to list on cancel */
  navigateToList(): void {
    this.router.navigate(['..'], { relativeTo: this.route })
  }

}
