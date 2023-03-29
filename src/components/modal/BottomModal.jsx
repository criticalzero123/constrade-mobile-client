import { View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
export default function BottomModal({ children, isVisible, setIsVisible }) {
  return (
    <Modal
      isVisible={isVisible}
      className="m-0 flex-1 justify-end"
      onBackdropPress={() => setIsVisible(!isVisible)}
      hasBackdrop
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={50}
    >
      <View
        className="bg-white p-6 flex-col flex-wrap w-full"
        style={{
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        }}
      >
        {children}
      </View>
    </Modal>
  );
}
