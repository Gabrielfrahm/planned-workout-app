import React, { useState, useEffect, useCallback } from "react";
import { Text, StyleSheet, Animated } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { useTranslation } from "react-i18next";

export default function NetworkStatusNotifier() {
  const { t } = useTranslation();
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [showMessage, setShowMessage] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const fadeIn = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const fadeOut = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowMessage(false);
    });
  }, [fadeAnim]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected !== isConnected) {
        setIsConnected(!!state.isConnected);
        setShowMessage(true);
        fadeIn();
        setTimeout(() => {
          fadeOut();
        }, 3000); // Mensagem visível por 3 segundos
      }
    });

    return () => {
      unsubscribe();
    };
  }, [isConnected, fadeIn, fadeOut]);

  return (
    showMessage && (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Text style={styles.text}>
          {isConnected
            ? t("components.networkInfo.online")
            : t("components.networkInfo.offline")}
        </Text>
      </Animated.View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    padding: 10,
    zIndex: 1000,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
