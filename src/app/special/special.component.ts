import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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
  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getSpecialEvents().subscribe(
      (res) => (this.specialEvents = res),
      (err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      }
    );
  }
}
