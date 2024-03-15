import { ApplicationRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

import { SwUpdate } from '@angular/service-worker';
import { DialogModule } from 'primeng/dialog';
import { ButtonsComponent } from './components/ui/buttons/buttons.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, DialogModule, ButtonsComponent],
})
export class AppComponent implements OnInit {
  constructor(
    private primengConfig: PrimeNGConfig,
    private swUpdate: SwUpdate,
    private appRef: ApplicationRef
  ) {
    this.onCheckUpdate();
  }

  isModalOpen = false;

  handleReload() {
    this.swUpdate.activateUpdate().then(() => window.location.reload());
  }

  onCheckUpdate() {
    this.appRef.isStable.subscribe((isStable: boolean) => {
      if (isStable) {
        this.swUpdate.checkForUpdate().then((hasUpdate) => {
          if (hasUpdate) {
            if (
              confirm('Hay una nueva versión disponible. ¿Desea actualizar?')
            ) {
              window.location.reload();
            }
          }
        });
      }
    });
  }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(() => {
        if (confirm('Hay una nueva versión disponible. ¿Desea actualizar?')) {
          window.location.reload();
        }
      });
    }
  }

  title = 'Anthelios League';
}
