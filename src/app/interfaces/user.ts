export interface User {
  user_id?: number;
  isAdmin?: string;

  admin_secret?: number;

  date_of_birth: Date;

  password: string;
  email: string;
  name: string;
}
