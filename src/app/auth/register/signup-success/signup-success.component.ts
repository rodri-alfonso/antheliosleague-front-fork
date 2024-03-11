import { Component, Input, OnInit } from '@angular/core';
import { AuthLayoutComponent } from '../../../components/auth-layout/auth-layout.component';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';

import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { environment } from 'environments/environment';
//@ts-ignore
import { messaging } from 'firebase-config';

@Component({
  selector: 'app-signup-success',
  standalone: true,
  imports: [AuthLayoutComponent, SidebarModule, DialogModule],
  templateUrl: './signup-success.component.html',
  styleUrl: './signup-success.component.scss',
})
export class SignUpSuccessComponent implements OnInit {
  @Input() form: any;
  isSidebarOpen: boolean = false;
  message: any;
  redirectUrl: string = environment.production
    ? 'https://antheliosleague.com'
    : 'https://pre.antheliosleague.com';
  constructor() {}

  ngOnInit(): void {
    this.requestPermission();
    this.listenForMessages();
  }

  requestPermission() {
    const messaging = getMessaging();

    getToken(messaging, { vapidKey: environment.firebaseConfig.vapidKey })
      .then((currentToken) => {
        if (currentToken) {
        } else {
          console.log(
            'No registration token available. Request permission to generate one.'
          );
        }
      })
      .catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
      });
  }

  listenForMessages() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      this.message = payload;
    });
  }

  getInvitationLink(teamName: string) {
    return `¡Únete a mi equipo "${teamName}" del centro "${this.form.center.name}" en la competición de casos clínicos Anthelios League! ${this.redirectUrl}`;
  }

  handleCopy() {
    navigator.clipboard
      .writeText(this.getInvitationLink(this.form.team.name))
      .then(() => (this.isSidebarOpen = false));
  }

  getWhatsappText = () => this.getInvitationLink(this.form.team.name);

  hanldeCloseSidebar() {
    this.isSidebarOpen = false;
  }

  share() {
    if (typeof navigator.share !== 'undefined') {
      navigator.share({
        title: 'Anthelios League',
        text: `¡Únete a mi equipo "${this.form.team.name}" del centro "${this.form.center.name}" en la competición de casos clínicos Anthelios League!`,
        url: this.redirectUrl,
      });
    } else this.isSidebarOpen = true;
  }
}
