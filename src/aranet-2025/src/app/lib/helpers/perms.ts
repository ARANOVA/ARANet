type UserWithRoles = { Roles: string | string[]; roles?: string | string[]; is_super_admin?: boolean } & Record<string, unknown>;
type UserWithroles = { roles: string | string[]; Roles?: string | string[]; is_super_admin?: boolean } & Record<string, unknown>;


export const hasAdminRights = (user?: UserWithRoles | UserWithroles): boolean => {
  const roles: string | string[] = user?.Roles ?? user?.roles ?? [];
  return user?.is_super_admin || roles.indexOf('rrhh') >= 0 || roles.indexOf('admin') >= 0 || roles.indexOf('financial') >= 0 ;
}

export const isAdmin = (user?: UserWithRoles | UserWithroles): boolean => {
  const roles: string | string[] = user?.Roles ?? user?.roles ?? [];
  return user?.is_super_admin || roles.indexOf('admin') >= 0;
}

export const isEmployee = (user?: UserWithRoles | UserWithroles): boolean => {
  const roles: string | string[] = user?.Roles ?? user?.roles ?? [];
  return user?.is_super_admin || roles.indexOf('employee') >= 0;
}

export const isRole = (role: string, user?: UserWithRoles | UserWithroles): boolean => {
  const roles: string | string[] = user?.Roles ?? user?.roles ?? [];
  return roles.indexOf(role) >= 0 || roles.indexOf('admin') >= 0 || !!user?.is_super_admin;
}