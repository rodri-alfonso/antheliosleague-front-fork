export interface UsersRanking {
  ranking: number;
  id: number;
  fullname: string;
  points: number;
  avatar: number;
  center: string;
  isDelegate: boolean;
}

export interface TeamsRanking {
  ranking: number;
  id: number;
  name: string;
  points: number;
  avatar: number;
  center: string;
  users: number;
}
