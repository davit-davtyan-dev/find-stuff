import React, {useState, useEffect} from 'react';
import {
  TextInput,
  Animated,
  Platform,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Divider, Row, TouchableOpacity} from '../../components/custom';
import useColors from '../../hooks/useColors';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface SearchInputProps extends TextInputProps {
  onSearch: (query: string) => void;
  expanded?: boolean;
}

const ANIMATION_DURATION = 300;
const SEARCH_PRESS_DURATION = 100;

export default function SearchInput({
  onSearch,
  expanded = true,
  ...inputProps
}: SearchInputProps) {
  const colors = useColors();
  const [query, setQuery] = useState('');
  const [inputHeight] = useState(new Animated.Value(expanded ? 60 : 40));
  const [fontSize] = useState(new Animated.Value(expanded ? 24 : 16));
  const [containerScale] = useState(new Animated.Value(1));

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      Animated.sequence([
        Animated.timing(containerScale, {
          toValue: 0.95,
          duration: SEARCH_PRESS_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(containerScale, {
          toValue: 1,
          duration: SEARCH_PRESS_DURATION,
          useNativeDriver: true,
        }),
      ]).start(() => {
        onSearch(trimmedQuery);
      });
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(inputHeight, {
        toValue: expanded ? 60 : 40,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
      Animated.timing(fontSize, {
        toValue: expanded ? 24 : 16,
        duration: ANIMATION_DURATION,
        useNativeDriver: false,
      }),
    ]).start();
  }, [expanded, inputHeight, fontSize]);

  const trimmedQuery = query.trim();
  const showSearchButton = trimmedQuery !== '';

  return (
    <Animated.View
      style={[
        {
          transform: [{scale: containerScale}],
        },
        styles.container,
      ]}>
      <Row
        px={3}
        alignItems="center"
        borderRadius={12}
        backgroundColor={colors.backgroundSecondary}
        height={inputHeight}
        style={styles.rowShadow}>
        <MaterialCommunityIcons
          name="magnify"
          size={24}
          color={colors.textSecondary}
          style={styles.searchIcon}
        />
        <AnimatedTextInput
          style={[styles.searchInput, {color: colors.text, fontSize: fontSize}]}
          placeholder="Search items..."
          placeholderTextColor={colors.textSecondary}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          blurOnSubmit={!expanded}
          {...inputProps}
        />
        {showSearchButton && (
          <TouchableOpacity onPress={handleSearch} p={1}>
            <MaterialCommunityIcons
              name="arrow-right"
              size={24}
              color={colors.tint}
            />
          </TouchableOpacity>
        )}
      </Row>
      {!expanded && <Divider />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
  },
  searchIcon: {
    opacity: 0.7,
  },
  rowShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
