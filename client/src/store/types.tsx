export interface IUser {
  data: { id: number; username: string; avatar: string; about: string };
}

export interface Auth {
  token: string | null;
}
