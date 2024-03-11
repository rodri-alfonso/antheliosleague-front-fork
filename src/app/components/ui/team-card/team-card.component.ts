import { Component, Input, Output } from '@angular/core';
import { ButtonsComponent } from '../buttons/buttons.component';
import { AccordionModule } from 'primeng/accordion';
import { EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-team-card',
  standalone: true,
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.scss',
  imports: [ButtonsComponent, AccordionModule, DialogModule],
})
export class TeamCardComponent {
  @Input() team: any;
  @Input() centerName: string = '';
  showMembers: boolean = false;
  MAX_MEMBERS: number = 14;
  isOpenModal: boolean = false;

  @Output() teamEvent: EventEmitter<any> = new EventEmitter();

  handleClick() {
    if (this.team.users.length < this.MAX_MEMBERS) {
      this.teamEvent.emit(this.team);
    }
  }

  handleShowMembers() {
    this.showMembers = !this.showMembers;
  }

  isAvailableToJoin(): boolean {
    return this.team.users.length < this.MAX_MEMBERS;
  }

  openModal() {
    this.isOpenModal = true;
  }
  closeModal() {
    this.isOpenModal = false;
  }
}
