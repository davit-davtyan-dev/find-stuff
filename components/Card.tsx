import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Row, TouchableOpacity, View} from './custom';
import {ThemedText} from './ThemedText';
import useColors from '../hooks/useColors';

interface CardProps {
  title: React.ReactNode;
  onTitlePress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  tags?: Array<string>;
}

export default function Card(props: CardProps) {
  const colors = useColors();

  return (
    <View p={4} gap={8} borderRadius={8} bgColor={colors.backgroundSecondary}>
      <TouchableOpacity onPress={props.onTitlePress}>
        {typeof props.title === 'object' ? (
          props.title
        ) : (
          <ThemedText type="subtitle">{props.title}</ThemedText>
        )}
      </TouchableOpacity>
      {!!props.tags?.length && (
        <Row gap={8}>
          {props.tags.map((tag, index) => (
            <View
              key={index}
              py={1}
              px={2}
              bgColor={colors.background}
              borderRadius={8}>
              <ThemedText fontSize={12}>{tag}</ThemedText>
            </View>
          ))}
        </Row>
      )}
      <Row mt={2} gap={16}>
        <TouchableOpacity
          flex={1}
          center
          borderRadius={8}
          p={1}
          bgColor={colors.background}
          onPress={props.onEdit}>
          <MaterialCommunityIcons
            name="pencil-outline"
            size={24}
            color={colors.tint}
          />
        </TouchableOpacity>
        <TouchableOpacity
          flex={1}
          center
          borderRadius={8}
          p={1}
          bgColor={colors.danger}
          onPress={props.onDelete}>
          <MaterialCommunityIcons
            name="delete-outline"
            size={24}
            color={colors.tint}
          />
        </TouchableOpacity>
      </Row>
    </View>
  );
}
