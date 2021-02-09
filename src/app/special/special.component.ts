import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss'],
})
export class SpecialComponent implements OnInit {
  specialEvents = [
    {
      title: '',
      about: '',
      registered: '',
      picture: '',
    },
  ];
  constructor(private _eventService: EventService) {}

  ngOnInit() {
    this._eventService.getSpecialEvents().subscribe(
      (res) => (this.specialEvents = res),
      (err) => console.log(err)
    );
  }
}
