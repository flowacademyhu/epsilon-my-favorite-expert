import { Address } from './address.model';

export class User {
  accessToken : string;
  address:Address;
createdAt: string;
deletedAt: string;
experts: string[];
expireAt: string;
followed_by: [];
followers: [];
id: string;
name: string;
providers: {provider_id: string, provider_type: string, email: string, name: string, profile_picture: string}
updated_at: string;

email: string;
imageUrl: string;
}

