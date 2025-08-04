export enum RoleType {
  Candidate = 0,
  Instructor = 1,
  Admin = 2
}

export interface User {
  Name: string;
  Email: string;
  Password: string;
  registrationDate: string; // ISO format
  roleType: RoleType;
}
