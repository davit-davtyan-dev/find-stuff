import React from 'react';
import {Modal, type ModalProps} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Row, TouchableOpacity, View} from './custom';
import {ThemedText} from './ThemedText';
import useColors from '../hooks/useColors';

export interface CustomModalProps extends ModalProps {
  title?: React.ReactNode;
}

const CustomModal = ({title, children, ...props}: CustomModalProps) => {
  const colors = useColors();

  return (
    <Modal animationType="fade" transparent={true} {...props}>
      <View
        flex={1}
        justifyContent="center"
        alignItems="center"
        backgroundColor="rgba(0,0,0,0.73)">
        <View
          gap={4}
          width="84%"
          borderRadius={8}
          p={6}
          alignItems="center"
          bgColor={colors.background}>
          <Row width="100%" alignItems="center" justifyContent="space-between">
            {typeof title === 'object' ? (
              title
            ) : (
              <ThemedText type="title">{title}</ThemedText>
            )}
            {props.onRequestClose && (
              <TouchableOpacity
                padding={8}
                margin={-8}
                onPress={props.onRequestClose}>
                <MaterialCommunityIcons
                  size={32}
                  color={colors.icon}
                  name="close"
                />
              </TouchableOpacity>
            )}
          </Row>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
