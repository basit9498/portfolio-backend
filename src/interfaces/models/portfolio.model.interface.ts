import { Document, Model, Types } from 'mongoose';

export interface SocialLinks {
  name: string;
  link: string;
  visibility: boolean;
}
export interface Skills {
  name: string;
  experience: string;
  visibility: boolean;
}
export interface Experiences {
  name: string;
  role: string;
  detail: string;
  from_data: Date;
  to_date: Date;
  visibility: boolean;
}

export interface Projects {
  name: string;
  type: string[];
  platform: string[];
  link: string;
  visibility: boolean;
}

export interface Services {
  name: string;
  time_duration: string;
  detail: string;
  features: string;
  technology?: { name: string; experience: string; visabilty: boolean }[];
  visibility: boolean;
}

//********************************************************************************** */

export interface IPortfolio {
  name: string;
  email: string;
  contact: string;
  social_links?: Types.DocumentArray<SocialLinks>;
  skills?: Types.DocumentArray<Skills>;
  experiences?: Types.DocumentArray<Experiences>;
  projects?: Types.DocumentArray<Projects>;
  services?: Types.DocumentArray<Services>;
}

// **********************************************************************************/

export interface PortfolioAttr {
  name: string;
  email: string;
  contact: string;
  social_links?: SocialLinks[];
}
