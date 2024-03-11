export interface Center {
  id: number;
  name: string;
  teams: Team[];
}

export interface Team {
  id: number;
  name: string;
  avatar: number;
  users: string[];
}

export interface Option {
  name: string;
  code: string;
}
