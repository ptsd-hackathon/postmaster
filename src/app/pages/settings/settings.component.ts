import {Component, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import { UserInformation } from "../../types";
import {SessionService} from "../../session/session.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {

    private places;
    private weathers;
    private selectedPlaces;

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
        stressfullPlaces: this.selectedPlaces
    };

    constructor(private apollo: Apollo, private sessionService: SessionService) {
    }

  onChange(x) {
      this.selectedPlaces = x.detail.value;
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

        this.apollo.query({
            query: gql`
        query weatherPrefrences {
          weatherPreferences {
            families {
              type
              title
            }
            range {
              min
              max
            }
          }
        }
        `
        }).subscribe(({data}: { data: any }) => {
            if (data.weatherPreferences) {
                this.weathers = data.weatherPreferences.families;
                console.log(this.weathers);
            }
        });
    }

    submit() {
        this.sessionService.getSessionValue('userEmail').then(email => {
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
          $stressfullPlaces: [String]
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
              stressfullPlaces: $stressfullPlaces
            }
          )
        }
      `,
                variables: {
                    email: email,
                    gender: this.userInformation.gender,
                    phoneNumber: this.userInformation.phoneNumber,
                    initialPanicAttackDate: {
                        day: typeof this.userInformation.initialPanicAttackDate === 'string' ? (this.userInformation.initialPanicAttackDate as string).split("-")[1] : this.userInformation.initialPanicAttackDate.day,
                        month: typeof this.userInformation.initialPanicAttackDate === 'string' ? (this.userInformation.initialPanicAttackDate as string).split("-")[2] : this.userInformation.initialPanicAttackDate.month,
                        year: typeof this.userInformation.initialPanicAttackDate === 'string' ? (this.userInformation.initialPanicAttackDate as string).split("-")[0] : this.userInformation.initialPanicAttackDate.year
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
                    traumaType: this.userInformation.traumaType,
                stressfullPlaces: this.userInformation.stressfullPlaces
                },
            }).subscribe(({data}: { data: any }) => {
                if (data.setUserSettings) {
                    alert('פרטי משתמש נשמרו בהצלחה !');
                } else {
                    alert('שמירת פרטי משתמש נכשלו ):');
                }
            });
        });
    }
}
