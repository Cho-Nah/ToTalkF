export interface IUser {
  name: string;
  role: "participant" | "volunteer" | "organizer";
}

export interface SignInResponse {
  login: string;
  password: string;
}

export interface SignUpResponse {
  login: string;
  password: string;
  name: string;
  role: string;
}