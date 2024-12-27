import React, {useContext, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Divider, Row, TouchableOpacity, View} from '../../components/custom';
import {ThemedText} from '../../components/ThemedText';
import Layout from '../../components/Layout';
import ConfirmationModal from '../../components/ConfirmationModal';
import RoomCard from './RoomCard';
import RoomFormModal from './RoomFormModal';

import useColors from '../../hooks/useColors';
import {RoomsContext} from '../../contexts/RoomsContext';

import type {Room, RoomFormData} from '../../api/rooms.api';

export default function RoomsScreen() {
  const colors = useColors();
  const {rooms, createRoom, deleteRoom, updateRoom} = useContext(RoomsContext);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [roomToEdit, setRoomToEdit] = useState<Room | null>(null);
  const [roomToDelete, setRoomToDelete] = useState<Room | null>(null);

  const handleRoomSave = async (data: RoomFormData) => {
    if (roomToEdit) {
      await updateRoom(roomToEdit.id, data);
    } else {
      await createRoom(data);
    }
    setRoomToEdit(null);
    setFormModalVisible(false);
  };

  const handleRoomDelete = async () => {
    if (!roomToDelete) {
      return;
    }
    await deleteRoom(roomToDelete.id);
    setDeleteModalVisible(false);
    setRoomToDelete(null);
  };

  return (
    <Layout title="Rooms">
      <RoomFormModal
        visible={formModalVisible}
        onRequestClose={() => {
          setFormModalVisible(false);
          setRoomToEdit(null);
        }}
        onSubmit={handleRoomSave}
        initialValue={roomToEdit}
      />
      <ConfirmationModal
        title="This room and all including items will be deleted. Continue?"
        visible={deleteModalVisible}
        onConfirm={handleRoomDelete}
        onDecline={() => {
          setDeleteModalVisible(false);
          setRoomToDelete(null);
        }}
      />
      <Row gap={8} alignItems="center" justifyContent="space-between">
        <ThemedText type="title">Rooms</ThemedText>
        <TouchableOpacity
          padding={8}
          margin={-8}
          onPress={() => setFormModalVisible(true)}>
          <MaterialCommunityIcons size={32} color={colors.tint} name="plus" />
        </TouchableOpacity>
      </Row>
      <Divider />
      <View mt={4} gap={24}>
        {rooms.map(room => (
          <RoomCard
            key={room.id}
            room={room}
            onRoomEdit={() => {
              setRoomToEdit(room);
              setFormModalVisible(true);
            }}
            onRoomDelete={() => {
              setRoomToDelete(room);
              setDeleteModalVisible(true);
            }}
          />
        ))}
      </View>
    </Layout>
  );
}
