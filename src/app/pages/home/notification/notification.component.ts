import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() severity: string;

  constructor() { }

  ngOnInit() {}

}
