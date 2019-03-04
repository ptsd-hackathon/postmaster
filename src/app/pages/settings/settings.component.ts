import {Component, Input, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {Address, UserInformation} from "../../types";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

    places;

    slideOpts = {
        effect: 'flip'
    };

    userInformation: UserInformation = {
        gender: 0,
        phoneNumber: '',
        initialPanicAttackDate: {
            day: '',
            month: '',
            year: ''
        },
        sleep: {
            bedHour: undefined,
            wakingHour: undefined
        },
        emergencyContacts: [undefined],
        isShabbatKeeper: undefined,
        isSmoking: undefined,
        familyStatus: {
            isMarried: false,
            numberOfChildren: 1
        },
        traumaType: 0,
        medicalInformation: {
            isTaking: undefined,
            drugs: undefined
        },
        address: {
            apartment: '',
            city: '',
            state: '',
            street: ''
        },
        stressHours: [undefined],
        stressfullPlaces: ['']
    };

    constructor(private apollo: Apollo) {
    }

    ngOnInit() {
        this.apollo.query({
            query: gql`
        query placesTypes {
          placesTypes {
            type
            title
          }
        }
        `
        }).subscribe(({data}: { data: any }) => {
            if (data.placesTypes) {
                this.places = data.placesTypes;
            }
        });
    }

    submit() {
        this.apollo.mutate({
            mutation: gql`
        mutation updateUserSettings(
          $gender: Gender
          $phoneNumber: String
          $initialPanicAttackDate: CustomDateInput
          $sleep: SleepingHoursInput
          $familyStatus: FamilyStatusInput
          $isSmoking: Boolean
          $isShabbatKeeper: Boolean
          $address: AddressInput
          $traumaType: TraumaType
        ) {
          setUserSettings(
            userInfo: {
              gender: $gender
              phoneNumber: $phoneNumber
              initialPanicAttackDate: $initialPanicAttackDate
              sleep: $sleep
              familyStatus: $familyStatus
              isSmoking: $isSmoking
              isShabbatKeeper: $isShabbatKeeper
              address: $address
              traumaType: $traumaType
            }
          )
        }
      `,
            variables: {
                gender: this.userInformation.gender,
                phoneNumber: this.userInformation.phoneNumber,
                initialPanicAttackDate: {
                    day: (this.userInformation.initialPanicAttackDate as any).split("-")[1],
                    month: (this.userInformation.initialPanicAttackDate as any).split("-")[2],
                    year: (this.userInformation.initialPanicAttackDate as any).split("-")[0]
                },
                sleep: {
                    bedHour: this.userInformation.sleep.bedHour,
                    wakingHour: this.userInformation.sleep.wakingHour
                },
                familyStatus: {
                    isMarried: this.userInformation.familyStatus.isMarried,
                    numberOfChildren: this.userInformation.familyStatus.numberOfChildren
                },
                isSmoking: this.userInformation.isSmoking,
                isShabbatKeeper: this.userInformation.isShabbatKeeper,
                address: {
                    apartment: this.userInformation.address.apartment,
                    city: this.userInformation.address.city,
                    state: this.userInformation.address.state,
                    street: this.userInformation.address.street
                },
                traumaType: this.userInformation.traumaType
            },
        }).subscribe(({data}: { data: any }) => {
            if (data.setUserSettings) {
                alert('פרטי משתמש נשמרו בהצלחה !');
            } else {
                alert('שמירת פרטי משתמש נכשלו ):');
            }
        });
    }
}
