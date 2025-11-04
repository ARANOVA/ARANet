import { UserCircleIcon } from '@heroicons/react/20/solid';
export type UserWithRoles = {
  Roles: string | string[];
  roles?: string | string[];
} & Record<string, unknown>;
export type UserWithroles = {
  roles: string | string[];
  Roles?: string | string[];
} & Record<string, unknown>;

export type User = {
  id: number;
  username: string;
  email: string;
  salt: string;
  password: string;
  profile?: UserProfile;

} & UserWithRoles;

export interface UserProfile {
  id: number;
  user_id: number;
  title?: string;
  public_title?: number;
  first_name?: string;
  public_first_name?: number;
  last_name?: string;
  public_last_name?: number;
  gender?: number;
  public_gender?: number;
  email?: string;
  public_email?: number;
  url?: string;
  public_url?: number;
  openid_url?: string;
  street?: string;
  public_street?: number;
  city?: string;
  public_city?: number;
  state?: string;
  public_state?: number;
  code?: number;
  public_code?: number;
  country?: string;
  public_country?: number;
  timezone?: number;
  public_timezone?: number;
  birthday?: Date;
  public_birthday?: number;
  company?: string;
  public_company?: number;
  cif?: string;
  public_cif?: number;
  phone1?: string;
  public_phone1?: number;
  phone2?: string;
  public_phone2?: number;
  fax?: string;
  public_fax?: number;
  notes?: string;
  gravatar?: number;
  avatar?: Buffer;
  avatar_filetype?: string;
  owner_user_id?: number;
  user_newsletter?: number;
  preferred_language?: string;
  created_at?: Date;
  created_by?: number;
  updated_at?: Date;
  updated_by?: number;
  deleted_at?: Date;
  deleted_by?: number;
}

export interface userComplete{
   user: User;
   profile: userProfile | null;
}