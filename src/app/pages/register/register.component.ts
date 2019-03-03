import {Component, Input} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    @Input() email: string;
    @Input() password: string;
    @Input() firstName: string;
    @Input() lastName: string;
    @Input() birthDate: {
        day: string,
        month: string,
        year: string
    };

    newAccount = {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    };

    constructor(private apollo: Apollo) {
    }

    signUp() {
        if(!this.newAccount.email || !this.newAccount.password || !this.newAccount.confirmPassword||
            !this.newAccount.firstName || !this.newAccount.lastName) {
            alert('אנא מלא את כל השדות');
        }
        else if (this.newAccount.password !== this.newAccount.confirmPassword) {
            alert('אימות הסיסמאות נכשל');
        } else {
            this.apollo.mutate({
                mutation: gql`
                mutation signUp(
                  $email: String!
                  $password: String!
                  $firstName: String!
                  $lastName: String!
                ) {
                  registerUser(
                    user: {
                      email: $email
                      password: $password
                      privateName: $firstName
                      lastName: $lastName
                    }
                  )
                }
              `,
                variables: {
                    email: this.newAccount.email,
                    password: this.newAccount.password,
                    firstName: this.newAccount.firstName,
                    lastName: this.newAccount.lastName,
                },
            }).subscribe(({data}: { data: any }) => {
                console.log(data);
                if (data.registerUser) {
                    console.log('success');
                } else {
                    alert('הייתה בעייה ביצירת המשתמש');
                }
            });
        }
    }
}
