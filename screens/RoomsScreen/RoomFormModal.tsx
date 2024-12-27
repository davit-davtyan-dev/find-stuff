import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, TextInput} from 'react-native';
import {Divider, Row, TouchableOpacity, View} from '../../components/custom';
import {ThemedText} from '../../components/ThemedText';
import CustomModal, {type CustomModalProps} from '../../components/CustomModal';
import TagInput from '../../components/TagInput';
import useColors from '../../hooks/useColors';

import type {RoomFormData} from '../../api/rooms.api';

type RoomFormProps = {
  onSubmit: (room: RoomFormData) => Promise<void>;
  initialValue?: RoomFormData | null;
};

type RoomFormModalProps = Omit<CustomModalProps, 'title'> & RoomFormProps;

export default function RoomFormModal({
  onSubmit,
  initialValue,
  ...props
}: RoomFormModalProps) {
  return (
    <CustomModal title={`${initialValue ? 'Edit' : 'Add new'} Room`} {...props}>
      <RoomForm onSubmit={onSubmit} initialValue={initialValue} />
    </CustomModal>
  );
}

const RoomForm = (props: RoomFormProps) => {
  const colors = useColors();
  const [name, setName] = useState(props.initialValue?.name || '');
  const [tags, setTags] = useState(props.initialValue?.tags || []);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    props.onSubmit({name, tags}).finally(() => setLoading(false));
  };

  const isDisabled = !name || loading;

  return (
    <>
      <TextInput
        placeholder="Room name"
        placeholderTextColor={colors.textSecondary}
        value={name}
        onChangeText={setName}
        style={[
          styles.input,
          {
            backgroundColor: colors.backgroundSecondary,
            color: colors.text,
          },
        ]}
        editable={!loading}
        returnKeyType="go"
        onSubmitEditing={() => {}}
      />
      <Divider my={4} />
      <TagInput tags={tags} onTagsChange={setTags} />
      <Divider my={4} />
      <TouchableOpacity
        w="100%"
        mt={4}
        p={2}
        disabled={isDisabled}
        opacity={isDisabled ? 0.5 : 1}
        alignItems="center"
        bgColor={colors.backgroundSecondary}
        borderRadius={8}
        onPress={handleSubmit}>
        <Row bgColor="transparent">
          {loading && (
            <View mr={2} center bgColor="transparent">
              <ActivityIndicator size="small" />
            </View>
          )}
          <ThemedText type="subtitle">Save</ThemedText>
        </Row>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
    padding: 8,
    fontSize: 20,
  },
});
