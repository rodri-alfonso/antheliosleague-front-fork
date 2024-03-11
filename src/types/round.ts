export interface UserChoice {
  option_id: number;
  points: number;
  createdAt: string;
}

export interface QuestionOption {
  id: number;
  label: string;
  correct?: boolean;
}

export interface Question {
  comodinType: string;
  id: number;
  points: number;
  question: string;
  options: QuestionOption[];
  answer?: string;
  explanation?: string;
}

export interface Picture {
  filename: string;
  id: number;
  label: string;
}

export interface RoundCase {
  description: string;
  id: number;
  pictures: Picture[];
  question: Question;
}

export interface Round {
  endAt: string;
  extra_round: boolean;
  id: number;
  number: number;
  startAt: string;
  roundCase: RoundCase;
}

export interface RemainsComodins {
  '50_50': number;
  anthelios: number;
}

export interface RoundResponse {
  remainsComodins: RemainsComodins;
  status: 'pending' | 'answered';
  round: Round;
}

export interface SelectedRoundResponse extends Round {
  userChoice: UserChoice;
  status: 'pending' | 'answered';
}

export interface DelegateOption {
  fullname: string;
  id: number;
  region: string;
  whatsapp: string;
  code: string;
}

export interface RoundListItem {
  endAt: string;
  extra_round: boolean;
  id: number;
  number: number;
  startAt: string;
}

export interface ScoreInfo {
  user: {
    avatar: number;
    name: string;
    points: number;
  };
  team: {
    avatar: number;
    name: string;
    center: string;
    points: number;
  };
}
