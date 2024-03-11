import type { Question } from './round';

export interface PreviousRound {
  round: number;
  correctAnswerId: number;
  questions: Question[];
  answerDescription: string;
  points: number;
}
