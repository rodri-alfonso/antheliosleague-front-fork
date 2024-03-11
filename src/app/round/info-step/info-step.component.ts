import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoundCardComponent } from 'app/components/round-card/round-card.component';
import { ButtonsComponent } from 'app/components/ui/buttons/buttons.component';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { environment } from 'environments/environment';
import type { Round } from 'types/round';

@Component({
  selector: 'round-info-step',
  standalone: true,
  imports: [RoundCardComponent, ButtonsComponent, DialogModule, ImageModule],
  templateUrl: './info-step.component.html',
  styleUrl: './info-step.component.scss',
})
export class InfoStepComponent implements OnInit {
  visible: boolean = false;
  maximized: boolean = false;
  @Input() round: Round = {} as Round;
  selectedImageId: number = 0;

  @Output() formEvent: EventEmitter<{ step: number; data: any }> =
    new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleClick() {
    this.formEvent.emit();
  }

  showDialog(imageId: number) {
    this.visible = true;
    this.selectedImageId = imageId;
  }

  getSrcImageById(): string {
    return `https://${
      environment.production ? '' : 'pre.antheliosleague.com:4551'
    }/picture/${this.selectedImageId}'`;
  }

  hideDialog() {
    this.visible = false;
    this.maximized = false;
  }

  handleMaximize() {
    this.maximized = !this.maximized;
  }
}
