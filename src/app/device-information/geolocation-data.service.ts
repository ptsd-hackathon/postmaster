import {Injectable} from "@angular/core";
import {Apollo} from "apollo-angular";
import gql from "graphql-tag";
import {SessionService} from "../session/session.service";

@Injectable({
    providedIn: 'root'
})
export class GeolocationDataService {

    constructor(private apollo: Apollo, private sessionService: SessionService) {
    }

    public getCurrentPositionEveryTenSeconds() {
        const options = {
            maximumAge: 3600000,
            enableHighAccuracy: true,
        };
        setInterval(() => {
            navigator.geolocation.getCurrentPosition(
                pos => {
                    this.sessionService.getSessionValue('userEmail').then(email => {
                        this.onSuccess(email, pos);
                    });
                },
                err => this.onError(err),
                options);
        }, 10000);
    }

    onSuccess(email, position) {
        this.apollo.mutate({
            mutation: gql`
                    mutation sendLocation($email: String!, $location: LocationInput!) {
                      sendUserLocation(
                        email: $email,
                        location: $location
                      )
                    }
                  `,
            variables: {
                email: email,
                location: {lat: position.coords.latitude, long: position.coords.longitude},
            },
        }).subscribe(({data}: { data: any }) => {
            if (data.sendUserLocation) {
                console.log('מיקום נשלח');
            } else {
                alert('הייתה בעיה בזמן שליחת המיקום נוכחי');
            }
        });
    }

    onError(error) {
        console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    }
}
