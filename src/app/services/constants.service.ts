import { environment } from '@env/environment';

/**
 * Application constants will be here
 */
export const CONSTANTS = {
  CREATED_BY: environment.userName,
  DELETED_BY:  environment.userName,
  LOOKUPS: {
  },
  status: {
    enabled: "1",
    disabled: "2"
  }
}