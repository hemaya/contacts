import { Component, OnInit, Input } from '@angular/core';
import { UIService } from 'src/app/services/ui.service';
import { ContactModelService } from './show-contact.model.service';
import { ContactService } from '@app/services/contact.service';

@Component({
  selector: 'app-show-contact',
  templateUrl: './show-contact.component.html',
  providers: [ContactModelService]
})
export class ShowContactComponent implements OnInit {

  mapOfExpandData: { [key: string]: boolean } = {};

  searchText = '';

  searchValue = '';

  /** Table loader */
  isDataLoading: boolean = false;
  @Input() formData = null;
  @Input() CONTACT_ID = null;

  constructor(
    public contactModelService: ContactModelService,
    private ui: UIService,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  /** Fetch table data from the server and save the data in the data model */
  fetchData(): void {
    this.isDataLoading = true
    
    this.contactService.getall().subscribe(
      data => {
        this.contactModelService.savedData = data
        this.contactModelService.displayData = data
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting  CONTACTS list')
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.contactModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.contactModelService.sortData(sort)
  }

  /** Deletes item template */
  deleteContact(ID:number):void{
    this.contactService.deleteContact(ID).subscribe(
      data => {
        this.ui.createMessage('success', 'Contact deleted')
        this.contactModelService.displayData=this.contactModelService.displayData.filter(item => item.id !== ID);
      },
      error => this.ui.createMessage('error', 'Error while Deleting contact'),
    ) 
  }

  /**Search English name and filter from the table*/
  searchName(): void {
    this.contactModelService.searchName(this.searchValue);
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.contactModelService.searchName(this.searchValue);
  }


}
