import {useCallback} from 'react';

import {fetchCurrentSpaces} from '../redux/modules/space';
import {fetchRooms} from '../redux/modules/room';
import {fetchItems} from '../redux/modules/item';
import useAppDispatch from './useAppDispatch';
import useAppSelector from './useAppSelector';
import useAppActiveEffect from './useAppActiveEffect';

export default function useInitializeSpaceData() {
  const dispatch = useAppDispatch();
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

  useAppActiveEffect(
    useCallback(() => {
      if (!firstSpaceId) {
        return;
      }

      dispatch(fetchCurrentSpaces({spaceId: firstSpaceId}));
    }, [dispatch, firstSpaceId]),
  );

  useAppActiveEffect(
    useCallback(() => {
      if (!currentSpaceId) {
        return;
      }

      dispatch(fetchRooms({spaceId: currentSpaceId}));
      dispatch(fetchItems({spaceId: currentSpaceId}));
    }, [dispatch, currentSpaceId]),
  );

  return {loading: userSpacesLoading || currentSpaceLoading};
}
