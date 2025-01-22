import {useEffect} from 'react';
import useAppDispatch from './useAppDispatch';
import {useAppState} from '@react-native-community/hooks';
import {fetchItems} from '../redux/modules/item';
import {fetchRooms} from '../redux/modules/room';
import useAppSelector from './useAppSelector';

export default function useInitializeSpaceData() {
  const dispatch = useAppDispatch();
  const appState = useAppState();
  const currentSpace = useAppSelector(state => state.space.currentSpace);
  const currentSpaceId = currentSpace?.id;

  useEffect(() => {
    if (!currentSpaceId || appState !== 'active') {
      return;
    }

    dispatch(fetchItems({spaceId: currentSpaceId}));
    dispatch(fetchRooms({spaceId: currentSpaceId}));
  }, [dispatch, appState, currentSpaceId]);
}
