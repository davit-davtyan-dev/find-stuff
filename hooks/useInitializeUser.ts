import {useCallback} from 'react';
import {initializeUser} from '../redux/modules/auth';
import {fetchUserSpaces} from '../redux/modules/space';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import useAppActiveEffect from './useAppActiveEffect';

export default function useInitializeUser() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const userSpaces = useAppSelector(state => state.space.userSpaces);

  const isInitialized = useAppSelector(state => state.auth.isInitialized);
  const userLoading = useAppSelector(state => state.auth.loading);
  const userSpacesLoading = useAppSelector(
    state => state.space.userSpacesLoading,
  );
  const userId = user?.uid;

  useAppActiveEffect(
    useCallback(() => {
      dispatch(initializeUser());
    }, [dispatch]),
  );

  useAppActiveEffect(
    useCallback(() => {
      if (!userId) {
        return;
      }
      dispatch(fetchUserSpaces({userId}));
    }, [dispatch, userId]),
  );

  return {
    user,
    userSpaces,
    isInitialized,
    loading: userLoading || userSpacesLoading,
  };
}
