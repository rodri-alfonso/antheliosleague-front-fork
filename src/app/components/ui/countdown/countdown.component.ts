import { Component, Input, OnInit, ViewRef } from '@angular/core';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { interval, map } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [InputSwitchModule, FormsModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent implements OnInit {
  @Input({ required: true }) date: Date = new Date();
  @Input() label: string = '';
  @Input() loading: boolean = false;

  counterTimer$: any = null;

  countdown!: {
    days: {
      firstDigit: number;
      secondDigit: number;
    };
    hours: {
      firstDigit: number;
      secondDigit: number;
    };
    minutes: {
      firstDigit: number;
      secondDigit: number;
    };
  };

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.parseDate();

    this.counterTimer$ = this.start().subscribe((_) => {
      if (!(this.changeDetector as ViewRef).destroyed) {
        this.changeDetector.detectChanges();
      }
      if (
        this.countdown.days.firstDigit < 0 &&
        this.countdown.days.secondDigit < 0
      ) {
        this.countdown = {
          days: {
            firstDigit: 0,
            secondDigit: 0,
          },
          hours: {
            firstDigit: 0,
            secondDigit: 0,
          },
          minutes: {
            firstDigit: 0,
            secondDigit: 0,
          },
        };
        this.counterTimer$.unsubscribe();
      }
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy() {
    this.counterTimer$.unsubscribe();
  }

  parseDate() {
    this.countdown = {
      days: {
        firstDigit: 0,
        secondDigit: 0,
      },
      hours: {
        firstDigit: 0,
        secondDigit: 0,
      },
      minutes: {
        firstDigit: 0,
        secondDigit: 0,
      },
    };

    const currentDate = new Date();
    const timeDifference = this.date.getTime() - currentDate.getTime();

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    if (days < 0 && hours < 0 && minutes < 0) {
      window.location.reload();
      return;
    }

    this.countdown.days.firstDigit = Math.floor(days / 10);
    this.countdown.days.secondDigit = days % 10;

    this.countdown.hours.firstDigit = Math.floor(hours / 10);
    this.countdown.hours.secondDigit = hours % 10;

    this.countdown.minutes.firstDigit = Math.floor(minutes / 10);
    this.countdown.minutes.secondDigit = minutes % 10;
  }

  start() {
    return interval(60000).pipe(
      map((x: number) => {
        this.parseDate();
        return x;
      })
    );
  }
}
