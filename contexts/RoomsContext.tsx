import React, {createContext, useEffect, useState} from 'react';
import roomsApi, {type Room, type RoomFormData} from '../api/rooms.api';
import Logger from '../utils/logger';

type RoomsContextState = {
  rooms: Array<Room>;
  createRoom: (data: RoomFormData) => Promise<void>;
  updateRoom: (id: string, data: RoomFormData) => Promise<void>;
  deleteRoom: (id: string) => Promise<void>;
};

const defaultState: RoomsContextState = {
  rooms: [],
  async createRoom() {},
  async updateRoom() {},
  async deleteRoom() {},
};

const logger = new Logger('RoomsContext');

export const RoomsContext = createContext(defaultState);

export function RoomsProvider({children}: {children: React.ReactNode}) {
  const [rooms, setRooms] = useState(defaultState.rooms);

  useEffect(() => {
    logger.log('Fetching rooms...');
    roomsApi
      .get()
      .then(result => {
        logger.log('Fetched rooms successfully', result.length);
        setRooms(result);
      })
      .catch(error => {
        logger.log('Failed to fetch rooms', error);
      });
  }, []);

  const createRoom: RoomsContextState['createRoom'] = async data => {
    logger.log('Creating new room', data);
    try {
      const newRoom = await roomsApi.create(data);
      logger.log('Room created successfully', newRoom.id);
      setRooms(oldValue => [...oldValue, newRoom]);
    } catch (error) {
      logger.log('Failed to create room', error);
      throw error;
    }
  };

  const updateRoom: RoomsContextState['updateRoom'] = async (id, data) => {
    logger.log('Updating room', id, data);
    try {
      await roomsApi.update(id, data);
      logger.log('Room updated successfully', id);
      setRooms(oldValue =>
        oldValue.map(room => (room.id === id ? {...room, ...data} : room)),
      );
    } catch (error) {
      logger.log('Failed to update room', error);
      throw error;
    }
  };

  const deleteRoom: RoomsContextState['deleteRoom'] = async id => {
    logger.log('Deleting room', id);
    try {
      await roomsApi.delete(id);
      logger.log('Room deleted successfully', id);
      setRooms(oldValue => oldValue.filter(room => room.id !== id));
    } catch (error) {
      logger.log('Failed to delete room', error);
      throw error;
    }
  };

  return (
    <RoomsContext.Provider value={{rooms, createRoom, updateRoom, deleteRoom}}>
      {children}
    </RoomsContext.Provider>
  );
}
