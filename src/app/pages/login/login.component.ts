import {Component, Input} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import { SessionService } from 'src/app/session/session.service';
import {GeolocationDataService} from "../../device-information/geolocation-data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'page-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})

export class LoginComponent {
    @Input() email: string;
    @Input() password: string;

    account = {
        username: '',
        fullname: '',
        email: '',
        password: ''
    };


    constructor(private apollo: Apollo, private geolocationService: GeolocationDataService, private sessionService: SessionService, private router: Router) {
    }

    login() {
        this.apollo.mutate({
            mutation: gql`
        mutation logIn($email: String!, $password: String!) {
          login(email: $email, password: $password)
        }
      `,
            variables: {
                email: this.account.email,
                password: this.account.password,
            },
        }).subscribe(({data}: { data: any }) => {
            if(data.login){
                this.sessionService.setSessionValue('userEmail', this.account.email);
                this.sessionService.setSessionValue('userPassword', this.account.password);
                this.geolocationService.getCurrentPositionEveryTenSeconds();
                this.router.navigateByUrl('/home');
            } else {
                alert('אימייל או סיסמא לא נכונים');
            }
        });
    }
}
