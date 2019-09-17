import { Component, OnInit } from '@angular/core';
import { UIService } from '@app/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '@app/services/contact.service';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent implements OnInit {

  constructor(    private router: Router,
    private route: ActivatedRoute,
    private ContactService: ContactService,
    private ui: UIService,
) { }

ngOnInit() {}

addContact(formData:any): void {
   this.ContactService.addContact(formData).subscribe(
    data => {
      this.ui.createMessage('success', ' contact added')
      this.navigateToList()
    },
    error => this.ui.createMessage('error', 'Error while adding contact'),
  )

}

/** Navigate to list on cancel */
navigateToList(): void {
  this.router.navigate(['/contact/show-contact'], { relativeTo: this.route })
}


}
