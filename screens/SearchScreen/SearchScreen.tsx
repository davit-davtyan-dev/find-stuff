import React, {useContext, useRef, useState} from 'react';
import {Divider, View} from '../../components/custom';
import {ThemedText} from '../../components/ThemedText';
import Layout from '../../components/Layout';
import RoomCard from '../RoomsScreen/RoomCard';
import ItemCard from '../ItemsScreen/ItemCard';
import SearchInput from './SearchInput';

import {RoomsContext} from '../../contexts/RoomsContext';
import {ItemsContext} from '../../contexts/ItemsContext';
import Logger from '../../utils/logger';

import type {ScrollView} from 'react-native';
import type {Room} from '../../api/rooms.api';
import type {Item} from '../../api/items.api';

const logger = new Logger('SearchScreen');

function formatForCompare(str: string) {
  return str.toLowerCase().split(' ').join('');
}

function filter<T extends Room | Item = Room | Item>(
  arr: Array<T>,
  query: string,
) {
  const formattedQuery = formatForCompare(query);
  logger.log('Filtering with query:', {query, formattedQuery});

  const filtered = arr.filter(i => {
    const name = formatForCompare(i.name);
    const tags = i.tags.map(formatForCompare).join('');
    return name.includes(formattedQuery) || tags.includes(formattedQuery);
  });

  logger.log('Filter results:', {
    originalLength: arr.length,
    filteredLength: filtered.length,
  });

  return filtered;
}

export default function SearchScreen() {
  const {rooms} = useContext(RoomsContext);
  const {items} = useContext(ItemsContext);
  const [isSearching, setIsSearching] = useState(false);
  const [foundRooms, setFoundRooms] = useState<Array<Room>>([]);
  const [foundItems, setFoundItems] = useState<Array<Item>>([]);
  const scrollRef = useRef<ScrollView>(null);

  const handleSearch = (query: string) => {
    logger.log('Starting search:', {query});
    setIsSearching(true);

    const startTime = performance.now();
    const filteredRooms = filter(rooms, query);
    const filteredItems = filter(items, query);
    const endTime = performance.now();

    setFoundRooms(filteredRooms);
    setFoundItems(filteredItems);

    logger.log('Search completed:', {
      query,
      duration: Math.round(endTime - startTime),
      roomsFound: filteredRooms.length,
      itemsFound: filteredItems.length,
    });
  };

  const hasSearchResults = !!(foundRooms.length || foundItems.length);

  return (
    <Layout title="Search" scrollViewRef={scrollRef}>
      <View flex={1}>
        <View
          flex={1}
          justifyContent={isSearching ? 'flex-start' : 'center'}
          minHeight={isSearching ? 80 : 200}
          pt={isSearching ? 0 : 5}>
          <SearchInput
            onSearch={handleSearch}
            expanded={!isSearching}
            onFocus={() => scrollRef.current?.scrollToEnd?.({animated: true})}
          />
        </View>
        {isSearching && (
          <View p={4}>
            {hasSearchResults ? (
              <>
                {!!foundRooms.length && (
                  <View>
                    <ThemedText type="subtitle">Rooms</ThemedText>
                    <Divider my={2} />
                    <View gap={24}>
                      {foundRooms.map(room => (
                        <RoomCard key={room.id} room={room} />
                      ))}
                    </View>
                  </View>
                )}
                {!!foundRooms.length && !!foundItems.length && (
                  <Divider my={4} />
                )}
                {!!foundItems.length && (
                  <View>
                    <ThemedText type="subtitle">Items</ThemedText>
                    <Divider my={2} />
                    <View gap={24}>
                      {foundItems.map(item => (
                        <ItemCard key={item.id} item={item} showPath />
                      ))}
                    </View>
                  </View>
                )}
              </>
            ) : (
              <ThemedText
                type="subtitle"
                textAlign="center"
                mt={5}
                opacity={0.7}>
                No results found
              </ThemedText>
            )}
          </View>
        )}
      </View>
    </Layout>
  );
}
