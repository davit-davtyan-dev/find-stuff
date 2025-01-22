import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Switch, TextInput} from 'react-native';
import {Divider, Row, TouchableOpacity, View} from '../../components/custom';
import {ThemedText} from '../../components/ThemedText';
import CustomModal, {type CustomModalProps} from '../../components/CustomModal';
import TagInput from '../../components/TagInput';
import useAppSelector from '../../hooks/useAppSelector';
import useColors from '../../hooks/useColors';

import type {ItemFormData} from '../../api/items.api';

type ItemFormProps = {
  onSubmit: (
    item: Omit<ItemFormData, 'roomId' | 'categoryId'>,
  ) => Promise<void>;
  initialValue?: ItemFormData | null;
};

type ItemFormModalProps = Omit<CustomModalProps, 'title'> & ItemFormProps;

export default function ItemFormModal({
  onSubmit,
  initialValue,
  ...props
}: ItemFormModalProps) {
  return (
    <CustomModal title={`${initialValue ? 'Edit' : 'Add new'} Item`} {...props}>
      <ItemForm onSubmit={onSubmit} initialValue={initialValue} />
    </CustomModal>
  );
}

const ItemForm = (props: ItemFormProps) => {
  const colors = useColors();
  const [name, setName] = useState(props.initialValue?.name || '');
  const [tags, setTags] = useState(props.initialValue?.tags || []);
  const [isContainer, setIsContainer] = useState(
    props.initialValue?.isContainer || false,
  );
  const [loading, setLoading] = useState(false);
  const currentSpace = useAppSelector(state => state.space.currentSpace);

  const handleSubmit = () => {
    if (!currentSpace) {
      throw new Error('ItemForm: Something went wrong, no current space!');
    }
    setLoading(true);
    props
      .onSubmit({name, tags, isContainer, spaceId: currentSpace.id})
      .finally(() => setLoading(false));
  };

  const isDisabled = !name || loading;

  return (
    <>
      <TextInput
        placeholder="Item name"
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
      <Row w="100%" alignItems="center" justifyContent="space-between">
        <ThemedText type="subtitle">Is Container</ThemedText>
        <Switch
          value={isContainer}
          onValueChange={setIsContainer}
          thumbColor={isContainer ? colors.tint : colors.icon}
          trackColor={{
            false: colors.backgroundSecondary,
            true: colors.backgroundSecondary,
          }}
        />
      </Row>
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
