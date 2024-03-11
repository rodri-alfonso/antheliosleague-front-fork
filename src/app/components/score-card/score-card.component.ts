import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'score-card',
  standalone: true,
  imports: [],
  templateUrl: './score-card.component.html',
  styleUrl: './score-card.component.scss',
})
export class ScoreCardComponent {
  @Input({ required: true }) score: number = 0;
  @Input() name: string = '';
  @Input() labelPrimary: string = '';
  @Input() labelSecondary: string = '';
  // @Input({ required: true }) userImageUrl: string = '';
  @Input({ required: true }) imageUrl: string = '';

  constructor(private readonly router: Router) {}
}
