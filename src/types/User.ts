export interface IUser {
  username: string;
  id: string;
}

export interface IDBUser {
  username: string;
  password?: string;
  _id: string;
}
