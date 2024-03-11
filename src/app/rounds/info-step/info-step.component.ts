import { Component, EventEmitter, Output, Input } from '@angular/core';
import { RoundCardComponent } from 'app/components/round-card/round-card.component';
import { ButtonsComponent } from 'app/components/ui/buttons/buttons.component';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import type { SelectedRoundResponse } from 'types/round';
import { environment } from 'environments/environment';

@Component({
  selector: 'round-info-step',
  standalone: true,
  imports: [RoundCardComponent, ButtonsComponent, DialogModule, ImageModule],
  styleUrls: [
    './info-step.component.scss',
    '../../round/info-step/info-step.component.scss',
  ],
  templateUrl: './info-step.component.html',
})
export class InfoStepComponent {
  visible: boolean = false;
  maximized: boolean = false;
  selectedImageId: number = 0;

  @Input() round: SelectedRoundResponse | null = null;
  @Output() formEvent: EventEmitter<{ step: number; data: any }> =
    new EventEmitter();

  constructor() {}

  handleClick() {
    this.formEvent.emit();
  }

  showDialog(imageId: number) {
    this.visible = true;
    this.selectedImageId = imageId;
  }

  hideDialog() {
    this.visible = false;
    this.maximized = false;
  }

  getSrcImageById(imageId?: string): string {
    return `https://${
      environment.production ? '' : 'pre.antheliosleague.com:4551'
    }/picture/${imageId || this.selectedImageId}'`;
  }
}
