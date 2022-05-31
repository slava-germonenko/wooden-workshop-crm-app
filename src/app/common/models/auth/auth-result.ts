import { AccessToken } from './access-token';
import { RefreshToken } from './refresh-token';

export interface AuthResult {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
}
