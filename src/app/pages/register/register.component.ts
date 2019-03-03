import {Component, Input, OnInit} from '@angular/core';
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
        firstName: '',
        lastName: '',
        birthDate: {
            day: '',
            month: '',
            year: '',
        }
    };

    constructor(private apollo: Apollo) {
    }

    signUp() {
        this.apollo.mutate({
            mutation: gql`
                mutation signUp(
                  $email: String!
                  $password: String!
                  $firstName: String!
                  $lastName: String!
                  $birthDate: CustomDateInput!
                ) {
                  registerUser(
                    user: {
                      email: $email
                      password: $password
                      userInfo: {
                        privateName: $firstName
                        lastName: $lastName
                        dateOfBirth: $birthDate
                      }
                    }
                  )
                }
              `,
            variables: {
                email: this.newAccount.email,
                password: this.newAccount.password,
                firstName: this.newAccount.firstName,
                lastName: this.newAccount.lastName,
                birthDate: {
                    day: this.newAccount.birthDate.day,
                    month: this.newAccount.birthDate.month,
                    year: this.newAccount.birthDate.year,
                },
            },
        }).subscribe(({data}: { data: any }) => {
            console.log(data);
            if (data.signUp) {
                console.log('success');
            } else {
                alert('הייתה בעייה ביצירת המשתמש');
            }
        });
    }
}
