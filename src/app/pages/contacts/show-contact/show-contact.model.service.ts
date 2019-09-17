import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base'

@Injectable()
export class ContactModelService extends TableBase {

  constructor() {
    super()
  }


  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {
    if (searchText) {
      let isTextInid = (item: any) =>
        item.id.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1
      let isTextInNAME = (item: any) =>
        item.NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1
      let isTextInEMAIL = (item: any) =>
        item.EMAIL.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1

      let isTextInPHONE = (item: any) =>
        item.PHONE.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1
      let isTextInCREATED_BY = (item: any) =>
        item.CREATED_BY.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1

      this.displayData = this.savedData.filter(
        item => isTextInNAME(item) ||isTextInid(item)  || isTextInEMAIL(item) || isTextInPHONE(item)
        ||  isTextInCREATED_BY(item),
      )
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }
}
