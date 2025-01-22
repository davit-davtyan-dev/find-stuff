import {useEffect} from 'react';
import {useAppState} from '@react-native-community/hooks';

import {fetchCurrentSpaces} from '../redux/modules/space';
import {fetchRooms} from '../redux/modules/room';
import {fetchItems} from '../redux/modules/item';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';

export default function useInitializeSpaceData() {
  const dispatch = useAppDispatch();
  const appState = useAppState();
  const userSpaces = useAppSelector(state => state.space.userSpaces);
  const currentSpace = useAppSelector(state => state.space.currentSpace);
  const userSpacesLoading = useAppSelector(
    state => state.space.userSpacesLoading,
  );
  const currentSpaceLoading = useAppSelector(
    state => state.space.currentSpaceLoading,
  );

  const firstSpaceId = userSpaces[0]?.spaceId;
  const currentSpaceId = currentSpace?.id;

  useEffect(() => {
    if (!firstSpaceId || appState !== 'active') {
      return;
    }

    dispatch(fetchCurrentSpaces({spaceId: firstSpaceId}));
  }, [dispatch, appState, firstSpaceId]);

  useEffect(() => {
    if (!currentSpaceId || appState !== 'active') {
      return;
    }

    dispatch(fetchRooms({spaceId: currentSpaceId}));
    dispatch(fetchItems({spaceId: currentSpaceId}));
  }, [dispatch, appState, currentSpaceId]);

  return {loading: userSpacesLoading || currentSpaceLoading};
}
