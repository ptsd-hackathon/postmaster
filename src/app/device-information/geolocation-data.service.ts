import { Geolocation } from '@ionic-native/geolocation/ngx';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GeolocationDataService {
  constructor(private geolocation: Geolocation) {}
}
