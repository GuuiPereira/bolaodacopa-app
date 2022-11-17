import { createContext, ReactNode, useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string,
  avatarUrl: string
}
export interface AuthContextDataProps {
  user: UserProps,
  isUserLoading: boolean,
  signIn: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {

  const [isUserLoading, setIsUserLoading] = useState(false);
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID,
    responseType: AuthSession.ResponseType.Token,
    redirectUri,
    scopes: ['profile', 'email']
  })

  async function signIn() {

    try {

      setIsUserLoading(true);
      await promptAsync({ useProxy: true })

    } catch (err) {

      console.log(err.message);
      throw err;

    } finally {

      setIsUserLoading(false);

    }

  }

  async function signInWithGoogle(access_token: string) {

    console.log('token ===>', access_token);
  
    try {

      const tokenResponse = await api.post('/users', {access_token});
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`

      const userInfoResponse = await api.get('/me');
      setUser(userInfoResponse.data.user)

    } catch (err) {

      console.log(err.message);
      throw err;

    } finally {

      setIsUserLoading(false);

    }

  }

  useEffect(() => {

    if (response?.type === 'success' && response.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken)
    }

  }, [response])

  return (
    <AuthContext.Provider value={{
      signIn,
      isUserLoading,
      user
    }}>{children}
    </AuthContext.Provider>
  )
}