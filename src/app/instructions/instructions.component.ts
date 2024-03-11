import { Component, OnInit } from '@angular/core';
import { AppLayoutComponent } from 'app/components/app-layout/app-layout.component';
import { GradientCardComponent } from '../components/ui/gradient-card/gradient-card.component';
import { CarouselModule } from 'primeng/carousel';
import { CardInfoComponent } from '../components/onboarding-cards/card-info/card-info.component';
import { CardPuntuacionesComponent } from '../components/onboarding-cards/card-puntuaciones/card-puntuaciones.component';
import { CardComodinesComponent } from '../components/onboarding-cards/card-comodines/card-comodines.component';
import { CardBoosterComponent } from '../components/onboarding-cards/card-booster/card-booster.component';
import { ButtonsComponent } from '../components/ui/buttons/buttons.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [
    AppLayoutComponent,
    GradientCardComponent,
    CarouselModule,
    CardInfoComponent,
    CardPuntuacionesComponent,
    CardComodinesComponent,
    CardBoosterComponent,
    ButtonsComponent,
  ],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.scss',
})
export class InstructionsComponent implements OnInit {
  infos = [1, 2, 3, 4];
  responsiveOptions: any[] | undefined;
  isLast: boolean = false;
  lastIndicator: any;

  actualPage: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  handleClickBack() {
    this.router.navigate(['/home']);
  }

  page(e: any) {
    const { page } = e;

    this.actualPage = page;

    if (page === 3) {
      this.isLast = true;
    } else {
      this.isLast = false;
    }
  }
}
