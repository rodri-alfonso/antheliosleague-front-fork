export interface User {
  id: number;
  fullname: string;
  nickname: string;
  email: string;
  avatar: number;
  points: number;
  sendNews: boolean;
  isDelegate: boolean;
  confirmConditions: boolean;
  position: string;
  delegateId: number;
  team: {
    id: number;
    name: string;
    points: number;
  };
  center: {
    id: number;
    name: string;
  };
  delegate: any;
}
