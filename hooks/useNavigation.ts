import {
  type NavigationProp,
  useNavigation as useNativeNavigation,
} from '@react-navigation/native';

export default function useNavigation() {
  return useNativeNavigation<NavigationProp<any>>();
}
