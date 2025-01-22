import {type EffectCallback, useEffect} from 'react';
import {useAppState} from '@react-native-community/hooks';

export default function useAppActiveEffect(effect: EffectCallback) {
  const appState = useAppState();
  useEffect(() => {
    if (appState !== 'active') {
      return;
    }

    return effect();
  }, [appState, effect]);
}
