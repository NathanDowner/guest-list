import { describe, it, expect } from 'vitest';
import { Role } from '@/models/role.enum';
import { createListName } from '.';
import { Contributor } from '@/models/contributor.interface';

describe('createListName function', () => {
  it('should return the correct list name for a single owner', () => {
    const names: Contributor[] = [
      { name: 'John Doe', role: Role.OWNER, email: 'jdoe@gmail.com' },
    ];
    const listName = createListName(names);
    expect(listName).toEqual("John's List");
  });

  it('should return the correct list name for two owners', () => {
    const names: Contributor[] = [
      { name: 'John Doe', role: Role.OWNER, email: 'email@gmail.com' },
      { name: 'Jane Doe', role: Role.OWNER, email: 'email@gmail.com' },
    ];
    const listName = createListName(names);
    expect(listName).toEqual("John and Jane's List");
  });

  it('should return the correct list name for three or more owners', () => {
    const names: Contributor[] = [
      { name: 'John Doe', role: Role.OWNER, email: 'email@gmail.com' },
      { name: 'Jane Doe', role: Role.OWNER, email: 'email@gmail.com' },
      { name: 'Bob Smith', role: Role.OWNER, email: 'email@gmail.com' },
    ];
    const listName = createListName(names);
    expect(listName).toEqual("John, Jane, and Bob's List");
  });

  it('should return the correct list name for non-owner contributors', () => {
    const names: Contributor[] = [
      { name: 'John Doe', role: Role.OWNER, email: 'email@gmail.com' },
      { name: 'Jane Doe', role: Role.CONTRIBUTOR, email: 'email@gmail.com' },
      { name: 'Bob Smith', role: Role.CONTRIBUTOR, email: 'email@gmail.com' },
    ];
    const listName = createListName(names);
    expect(listName).toEqual("John's List");
  });

  it('should return the correct list name for no owners', () => {
    const names: Contributor[] = [
      { name: 'Jane Doe', role: Role.CONTRIBUTOR, email: 'email@gmail.com' },
      { name: 'Bob Smith', role: Role.CONTRIBUTOR, email: 'email@gmail.com' },
    ];
    const listName = createListName(names);
    expect(listName).toEqual('');
  });
});
