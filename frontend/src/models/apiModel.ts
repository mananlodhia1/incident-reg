type SetStateFunction<T> = React.Dispatch<React.SetStateAction<T>>;

export interface ApiRequestModel {
  api: string;
  body?: Record<string, any>;
  dispatchType?: string;
  setLoad?: SetStateFunction<boolean> | null;
  setError?: SetStateFunction<string | number | any> | null;
  navigate?: (path: string) => void | null;
  redirectTo?: string;
}

export interface DecodedToken {
  name: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}
export interface LogoutRequest {
  username: string;
}
