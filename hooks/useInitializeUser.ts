import {useEffect} from 'react';
import {useAppState} from '@react-native-community/hooks';
import {initializeUser} from '../redux/modules/auth';
import {fetchUserSpaces} from '../redux/modules/space';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

export default function useInitializeUser() {
  const dispatch = useAppDispatch();
  const appState = useAppState();
  const user = useAppSelector(state => state.auth.user);

  useEffect(() => {
    if (appState !== 'active') {
      return;
    }
    dispatch(initializeUser());
  }, [dispatch, appState]);

  const userId = user?.uid;

  useEffect(() => {
    if (!userId || appState !== 'active') {
      return;
    }

    dispatch(fetchUserSpaces({userId}));
  }, [dispatch, userId, appState]);
}
