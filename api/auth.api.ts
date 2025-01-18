import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {WEB_CLIENT_ID} from '../constants';

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

export interface User {
  /** NOTE: this filed probably is not nullable */
  displayName: string | null;
  photoURL: string;
  phoneNumber: string | null;
  /** @todo define correct type */
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
  // TODO: check if this code is useful
  // Check if your device supports Google Play
  // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
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
