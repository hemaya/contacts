import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import {  EditContactResolver } from './resolvers/resolver.service';
import { EditContactComponent } from './pages/contacts/edit-contact/edit-contact.component';
import { ShowContactComponent } from './pages/contacts/show-contact/show-contact.component';
import { AddContactComponent } from './pages/contacts/add-contact/add-contact.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact/add', component: AddContactComponent },
  { path: 'contact/show-contact', component: ShowContactComponent },
  { path: 'contact/show-contact/:id', component: EditContactComponent,
  resolve: {
    contactData: EditContactResolver,
   } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
