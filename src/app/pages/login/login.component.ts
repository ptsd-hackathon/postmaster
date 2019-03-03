import {Component, Input} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

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

    constructor(private apollo: Apollo) {
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
                console.log('success');
            }else{
                alert('אימייל או סיסמא לא נכונים');
            }
        });
    }
}
