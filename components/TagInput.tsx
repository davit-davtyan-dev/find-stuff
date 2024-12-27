import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Row, TouchableOpacity, View} from '../components/custom';
import {ThemedText} from '../components/ThemedText';
import useColors from '../hooks/useColors';

interface TagInputProps {
  tags: Array<string>;
  onTagsChange: (newTags: Array<string>) => void;
}

export default function TagInput(props: TagInputProps) {
  const colors = useColors();
  const [newTag, setNewTag] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addTag = () => {
    if (newTag.trim() !== '') {
      if (editIndex !== null) {
        props.onTagsChange(
          props.tags.map((tag, index) =>
            index === editIndex ? newTag.trim() : tag,
          ),
        );
        setEditIndex(null);
      } else {
        props.onTagsChange([...props.tags, newTag.trim()]);
      }
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...props.tags];
    newTags.splice(index, 1);
    props.onTagsChange(newTags);
  };

  const editTag = (index: number) => {
    const tagToEdit = props.tags[index];
    setNewTag(tagToEdit);
    setEditIndex(index);
  };

  return (
    <View w="100%">
      <ThemedText type="subtitle">Tags</ThemedText>
      <Row mt={2} gap={8} flexWrap="wrap">
        {props.tags.map((tag, index) => (
          <Row
            key={index}
            borderRadius={8}
            overflow="hidden"
            alignItems="center"
            bgColor={colors.backgroundSecondary}>
            <TouchableOpacity py={2} px={4} onPress={() => editTag(index)}>
              <ThemedText type="default">{tag}</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity p={2} onPress={() => removeTag(index)}>
              <MaterialCommunityIcons
                name="delete-outline"
                size={20}
                color={colors.icon}
              />
            </TouchableOpacity>
          </Row>
        ))}
      </Row>
      <Row alignItems="center">
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.backgroundSecondary,
              color: colors.text,
            },
          ]}
          placeholder="Add a tag"
          placeholderTextColor={colors.textSecondary}
          value={newTag}
          onChangeText={setNewTag}
          onSubmitEditing={addTag}
        />
        <TouchableOpacity onPress={addTag} style={styles.addButton}>
          <MaterialCommunityIcons
            size={20}
            name="check-outline"
            color={colors.icon}
          />
        </TouchableOpacity>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    paddingRight: 40,
    marginTop: 16,
    width: '100%',
    padding: 8,
    fontSize: 20,
  },
  addButton: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    borderRadius: 5,
    position: 'absolute',
    top: 16,
    right: 0,
  },
});
