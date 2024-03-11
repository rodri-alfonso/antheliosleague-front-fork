import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { SIMPLIFIED_LAYOUT_PATHS } from 'utils/constants';
import { BurguerMenuViewComponent } from '../burguer-menu-view/burguer-menu-view.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [BurguerMenuViewComponent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent {
  isMobile: boolean = window.innerWidth < 650;
  isRoundPath: boolean = false;
  isHomePath: boolean = false;
  isSimpifiedLayout: boolean = false;
  isBurguerMenuVisible: boolean = false;
  @Input() isBlueLayout: boolean = false;
  @Input() isDarkBlue: boolean = false;

  resizeObservable$: Observable<Event> = new Observable();
  resizeSubscription$: Subscription = new Subscription();

  ngOnInit() {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt: any) => {
      if (evt.target?.innerWidth < 930) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

  @Output() formEvent: EventEmitter<any> = new EventEmitter();
  @Input() title: string = '';

  constructor(private readonly router: Router) {
    this.isRoundPath = this.router.url === '/round';
    this.isHomePath = this.router.url === '/home';

    this.isSimpifiedLayout = SIMPLIFIED_LAYOUT_PATHS.includes(this.router.url);
  }

  handleClickBack() {
    this.formEvent.emit();
  }

  toggleBurguerMenu() {
    this.isBurguerMenuVisible = !this.isBurguerMenuVisible;
  }

  onBurguerMenuItemClick() {
    this.isBurguerMenuVisible = false;
  }
}
