import { Role } from 'src/user/types/user.type';

export type Payload = {
  sub: string;
  email: string;
  role: Role;
};
