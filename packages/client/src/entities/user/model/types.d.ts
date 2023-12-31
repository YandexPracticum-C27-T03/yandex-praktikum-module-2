export type User = {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: Nullable<string>;
  dispay_name: Nullable<string>;
};

export type UserLogin = Omit<User, 'phone' | 'email' | 'second_name' | 'first_name'>;
export type UserRegistration = Required<User & { password: string }>;

export type OpenAuthLogin = {
  code: string;
  redirect_uri: string;
};
