import { Role } from './role.enum';

export interface Contributor {
  name: string;
  email: string;
  role: Role;
  photoURL?: string;
}

// export type CreateContributorDto = Omit<Contributor, 'photo'>;
