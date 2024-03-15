import { ApplicationRef, Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

import { SwUpdate } from '@angular/service-worker';
import { DialogModule } from 'primeng/dialog';
import { ButtonsComponent } from './components/ui/buttons/buttons.component';
import { Subscription, interval, map } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, DialogModule, ButtonsComponent],
})
export class AppComponent implements OnInit {
  isNewVersionAvailable: boolean = false;
  counterTimer$: any = null;

  constructor(
    private primengConfig: PrimeNGConfig,
    private swUpdate: SwUpdate,
    private appRef: ApplicationRef,
    private zone: NgZone,
    private changeDetector: ChangeDetectorRef
  ) {
    // this.checkForUpdate();
  }

  isModalOpen = false;

  handleReload() {
    this.swUpdate.activateUpdate().then(() => window.location.reload());
  }

  // onCheckUpdate() {
  //   // this.appRef.isStable.subscribe((isStable: boolean) => {
  //   //   if (isStable) {
  //   //     this.swUpdate.checkForUpdate().then((hasUpdate) => {
  //   //       if (confirm('Hay una nueva versión disponible. ¿Desea actualizar?')) {
  //   //         window.location.reload();
  //   //       }
  //   //     });
  //   //   }
  //   // });
  //   if (!this.swUpdate.isEnabled) {
  //     return;
  //   }

  //   this.swUpdate.versionUpdates.subscribe((evt) => {
  //     switch (evt.type) {
  //       case 'VERSION_DETECTED':
  //         console.log(`Downloading new app version: ${evt.version.hash}`);
  //         break;
  //       case 'VERSION_READY':
  //         console.log(`Current app version: ${evt.currentVersion.hash}`);
  //         console.log(
  //           `New app version ready for use: ${evt.latestVersion.hash}`
  //         );
  //         if (confirm('Hay una nueva versión disponible. ¿Desea actualizar?')) {
  //           // window.location.reload();
  //           this.swUpdate
  //             .activateUpdate()
  //             .then(() => document.location.reload())
  //             .catch((error) =>
  //               console.error('Failed to apply updates:', error)
  //             );
  //         }
  //         break;
  //       case 'VERSION_INSTALLATION_FAILED':
  //         console.log(
  //           `Failed to install app version '${evt.version.hash}': ${evt.error}`
  //         );
  //         break;
  //     }
  //   });
  // }

  // checkForUpdate(): void {
  //   this.intervalSubscription?.unsubscribe();
  //   console.log('🚀 ~ this.swUpdate.isEnabled:', this.swUpdate.isEnabled);
  //   if (!this.swUpdate.isEnabled) {
  //     return;
  //   }

  //   this.zone.runOutsideAngular(() => {
  //     this.intervalSubscription = this.intervalSource.subscribe(async () => {
  //       try {
  //         this.isNewVersionAvailable = await this.swUpdate.checkForUpdate();
  //         console.log('Checking for updates...');
  //         console.log(
  //           this.isNewVersionAvailable ? 'New version available' : 'Nothing'
  //         );
  //         if (this.isNewVersionAvailable) {
  //           if (
  //             confirm('Hay una nueva versión disponible. ¿Desea actualizar?')
  //           ) {
  //             this.applyUpdate();
  //           }
  //         }

  //         console.log(
  //           this.isNewVersionAvailable
  //             ? 'A new version is available.'
  //             : 'Already on the latest version.'
  //         );
  //       } catch (error) {
  //         console.error('Failed to check for updates:', error);
  //       }
  //     });
  //   });
  // }

  applyUpdate(): void {
    // Reload the page to update to the latest version after the new version is activated
    this.swUpdate
      .activateUpdate()
      .then(() => document.location.reload())
      .catch((error) => console.error('Failed to apply updates:', error));
  }

  ngOnInit() {
    // if (this.swUpdate.isEnabled) {
    //   this.swUpdate.versionUpdates.subscribe(() => {
    //     if (confirm('Hay una nueva versión disponible. ¿Desea actualizar?')) {
    //       window.location.reload();
    //     }
    //   });
    // }

    this.counterTimer$ = this.start().subscribe((_) => {
      // this.counterTimer$.unsubscribe();
      console.log('Another round');
      this.swUpdate
        .checkForUpdate()
        .then((hasUpdate) => {
          console.log('🚀 ~ hasUpdate:', hasUpdate);
          if (
            confirm(
              'Hay una nueva versión disponible. ¿Desea actualizar? (chick for updates)'
            )
          ) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error('🚀 ~ error updating the client:', error);
        })
        .finally(() => {
          console.log('🚀 ~ finally ~ finally');
        });
    });
  }

  ngOnDestroy() {
    this.counterTimer$.unsubscribe();
  }

  onCheckForUpdates() {
    console.log('checking for updates...');

    this.swUpdate.activateUpdate().then((response) => {
      console.log('🚀 ~ response from activated update:', response);
      if (confirm('Hay una nueva versión disponible. ¿Desea actualizar?')) {
        window.location.reload();
      }
    });

    this.swUpdate
      .checkForUpdate()
      .then((hasUpdate) => {
        console.log('🚀 ~ hasUpdate:', hasUpdate);
        if (
          confirm(
            'Hay una nueva versión disponible. ¿Desea actualizar? (chick for updates)'
          )
        ) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('🚀 ~ error updating the client:', error);
      })
      .finally(() => {
        console.log('🚀 ~ finally ~ finally');
      });

    this.swUpdate.versionUpdates.subscribe((response) => {
      console.log('🚀 ~ response:', response);
      if (confirm('Hay una nueva versión disponible. ¿Desea actualizar?')) {
        window.location.reload();
      }
    });
  }

  updateClient() {
    if (!this.swUpdate.isEnabled) {
      console.log('Not Enabled');
      return;
    }
    // this.swUpdate.available.subscribe((event) => {
    //   console.log(`current`, event.current, `available `, event.available);
    //   if (confirm('update available for the app please conform')) {
    //     this.swUpdate.activateUpdate().then(() => location.reload());
    //   }
    // });
  }

  checkUpdate() {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        const timeInterval = interval(8 * 60 * 60 * 1000);

        timeInterval.subscribe(() => {
          this.swUpdate.checkForUpdate().then(() => console.log('checked'));
          console.log('update checked');
        });
      }
    });
  }

  start() {
    return interval(60000).pipe(
      map((x: number) => {
        this.onCheckForUpdates();
        return x;
      })
    );
  }

  title = 'Anthelios League';
}
