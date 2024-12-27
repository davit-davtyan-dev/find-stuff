import React from 'react';
import {ThemedText} from '../../components/ThemedText';
import Card from '../../components/Card';
import useContainerItems from '../../hooks/useContainerItems';
import useNavigation from '../../hooks/useNavigation';
import Logger from '../../utils/logger';

const logger = new Logger('RoomCard');

import type {Room} from '../../api/rooms.api';

interface RoomCardProps {
  room: Room;
  onRoomEdit?: () => void;
  onRoomDelete?: () => void;
}

export default function RoomCard(props: RoomCardProps) {
  const {id, name, tags} = props.room;
  const navigation = useNavigation();
  const items = useContainerItems({roomId: id});

  const handlePress = () => {
    logger.log(`Navigating to ${name} "${id}"`);
    navigation.navigate('RoomsTab', {screen: id});
  };

  return (
    <Card
      title={
        <>
          <ThemedText type="subtitle">{name}</ThemedText>
          <ThemedText>
            {items.length
              ? `${items.length} item${items.length > 1 ? 's' : ''}`
              : 'Room is empty'}
          </ThemedText>
        </>
      }
      onTitlePress={handlePress}
      tags={tags}
      onEdit={props.onRoomEdit}
      onDelete={props.onRoomDelete}
    />
  );
}
