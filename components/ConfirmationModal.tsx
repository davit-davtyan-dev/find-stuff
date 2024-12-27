import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {Row, TouchableOpacity, View} from './custom';
import {ThemedText} from './ThemedText';
import CustomModal, {type CustomModalProps} from './CustomModal';
import useColors from '../hooks/useColors';

interface ConfirmationModalProps
  extends Omit<CustomModalProps, 'onRequestClose'> {
  onConfirm: () => void | Promise<void>;
  onDecline: () => void;
  confirmText?: string;
  declineText?: string;
}

const ConfirmationModal = ({
  onConfirm,
  onDecline,
  confirmText = 'OK',
  declineText = 'Cancel',
  ...props
}: ConfirmationModalProps) => {
  const colors = useColors();
  const [loading, setLoading] = useState(false);

  return (
    <CustomModal {...props} onRequestClose={onDecline}>
      <Row gap={16}>
        <TouchableOpacity
          p={2}
          flex={1}
          alignItems="center"
          bgColor={colors.danger}
          borderRadius={8}
          disabled={loading}
          opacity={loading ? 0.5 : 1}
          onPress={async () => {
            setLoading(true);
            try {
              await onConfirm();
            } catch (err) {}
            setLoading(false);
          }}>
          <Row bgColor="transparent">
            {loading && (
              <View mr={2} center bgColor="transparent">
                <ActivityIndicator size="small" />
              </View>
            )}
            <ThemedText type="subtitle" darkColor="white" lightColor="black">
              {confirmText}
            </ThemedText>
          </Row>
        </TouchableOpacity>
        <TouchableOpacity
          p={2}
          flex={1}
          alignItems="center"
          bgColor={colors.backgroundSecondary}
          borderRadius={8}
          disabled={loading}
          opacity={loading ? 0.5 : 1}
          onPress={onDecline}>
          <ThemedText type="subtitle" darkColor="white" lightColor="black">
            {declineText}
          </ThemedText>
        </TouchableOpacity>
      </Row>
    </CustomModal>
  );
};

export default ConfirmationModal;
