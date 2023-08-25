declare type TObject = Record<string, unknown>;

declare type TUser = {
  id: number;
  login: string;
  avatar?: string;
};

declare namespace Express {
  export interface Request {
    user: TUser;
  }
}
