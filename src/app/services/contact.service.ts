// products.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'
import { contact } from '@app/models/contact.model';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  uri = `${environment.baseUri}contacts`;

  constructor(private http: HttpClient) { }

  addContact(obj: contact): Observable <any> {
   return this.http.post(`${this.uri}/`, obj )
  }
  updateContact(obj: contact,id: number): Observable <any> {
   return this.http.put(`${this.uri}/${id}`, obj )
  }

  getall(): Observable<contact[]> {
    return this.http.get<contact[]>(`${this.uri}/`)
  }
  getContactById(id): Observable<contact> {
    return this.http.get<contact>(`${this.uri}/`+ id)
   
  }
  deleteContact(id: number): Observable <any> {
   return this.http.delete(`${this.uri}/${id}` )
  }

}