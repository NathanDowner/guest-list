export interface Contributor {
  name: string;
  id: string;
}

export type CreateContributorDto = Omit<Contributor, 'id'>;
