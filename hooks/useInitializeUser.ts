import {useEffect} from 'react';
import {useAppState} from '@react-native-community/hooks';
import {initializeUser} from '../redux/modules/auth';
import useAppDispatch from './useAppDispatch';

export default function useInitializeUser() {
  const dispatch = useAppDispatch();
  const appState = useAppState();

  useEffect(() => {
    if (appState !== 'active') {
      return;
    }
    dispatch(initializeUser());
  }, [dispatch, appState]);
}
