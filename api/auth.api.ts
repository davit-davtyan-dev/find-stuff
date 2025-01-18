import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {WEB_CLIENT_ID} from '../constants';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

export interface User {
  displayName: string | null;
  photoURL: string;
  phoneNumber: string | null;
  tenantId: null;
  emailVerified: boolean;
  isAnonymous: boolean;
  uid: string;
  email: string;
  metadata: {
    /** milliseconds */
    lastSignInTime: number;
    /** milliseconds */
    creationTime: number;
  };
}

export async function loginWithGoogleApi() {
  const signInResult = await GoogleSignin.signIn();

  if (!signInResult.data?.idToken) {
    throw new Error('No ID token found');
  }

  const googleCredential = auth.GoogleAuthProvider.credential(
    signInResult.data.idToken,
  );

  const result = await auth().signInWithCredential(googleCredential);

  return result.user.toJSON() as User;
}

export async function initializeUserApi() {
  return (auth().currentUser?.toJSON() as User) || null;
}

export function signOutApi() {
  auth().signOut();
  return GoogleSignin.signOut();
}
