import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NgZorroAntdModule, NZ_I18N, ar_EG, NzFormModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import ar from '@angular/common/locales/ar';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ContactService } from './services/contact.service';
import { AppInterceptorService } from './http/app-interceptor.service';
import { ShowContactComponent } from './pages/contacts/show-contact/show-contact.component';
import { EditContactComponent } from './pages/contacts/edit-contact/edit-contact.component';
import { AddContactComponent } from './pages/contacts/add-contact/add-contact.component';
import { ContactFormComponent } from './pages/contacts/contact-form/contact-form.component';
import { EditContactResolver } from './resolvers/resolver.service';

registerLocaleData(ar);
const Providers = [
  ContactService, EditContactResolver,
  
]
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ContactFormComponent,
    ShowContactComponent,
    EditContactComponent,
    AddContactComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzFormModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: ar_EG },{
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptorService,
    multi: true
  }, ...Providers],
  bootstrap: [AppComponent]
})
export class AppModule { }
