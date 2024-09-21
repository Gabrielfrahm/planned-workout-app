import { ReactNode } from "react";
import { Modal, View, Text, TouchableOpacity, ModalProps } from "react-native";

interface ModalComponentProps extends ModalProps {
  readonly children: ReactNode;
  readonly onClose: () => void;
  readonly onOk?: ReactNode;
  readonly title?: string;
  readonly size?: boolean;
}

const ModalComponent = ({
  visible,
  onClose,
  children,
  onOk,
  title,
  size,
}: ModalComponentProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      hardwareAccelerated={true}
      statusBarTranslucent={true}
    >
      <View className="flex-1 w-full justify-center items-center">
        <View
          className={`bg-black ${size ? "w-[350]" : "w-300"}  flex-row ${title ? "justify-between" : "justify-end"} p-4 rounded-t-lg`}
        >
          {title && (
            <Text className="text-dark-green font-roboto-bold text-lg">
              {title}
            </Text>
          )}
          <TouchableOpacity onPress={onClose}>
            <Text className="text-white font-roboto-bold text-xl">X</Text>
          </TouchableOpacity>
        </View>
        <View
          className={`bg-black w-300 flex-row px-4 py-2 ${onOk ? "" : "rounded-b-lg"} `}
        >
          {children}
        </View>
        {onOk && (
          <View className="bg-black w-300 flex-row px-4 pb-4  pt-2 rounded-b-lg">
            {onOk}
          </View>
        )}
      </View>
    </Modal>
  );
};

export default ModalComponent;
