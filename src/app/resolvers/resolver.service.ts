
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ContactService } from '@app/services/contact.service';




@Injectable({
    providedIn: 'root'
})
export class EditContactResolver implements Resolve<any>{
    constructor(

        private contactService: ContactService
    ) { }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.contactService.getContactById(route.params.id)
    }
}

