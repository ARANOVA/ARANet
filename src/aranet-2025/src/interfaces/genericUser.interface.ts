export type UserWithRoles = { Roles: string | string[]; roles?: string | string[] } & Record<string, unknown>;
export type UserWithroles = { roles: string | string[]; Roles?: string | string[] } & Record<string, unknown>;

export type User = {
   id: number;
   username: string;
   email: string;
} & UserWithRoles;