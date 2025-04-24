import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

// Asegúrate de importar pokeball con require o desde assets si usás Expo
const backCard = require("../assets/backCard.png");

export const Card = ({ onClick, card, index, isInactive, isFlipped, isDisabled }) => {
  const handleClick = () => {
    if (!isFlipped && !isDisabled) {
      onClick(index);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isFlipped && styles.flipped,
        isInactive && styles.inactive,
      ]}
      onPress={handleClick}
      activeOpacity={0.8}
      disabled={isDisabled || isFlipped}
    >
      {/* Front face (dorso) */}
      <View style={styles.cardFace}>
        <Image source={backCard} style={styles.image} resizeMode="contain" />
      </View>

      {/* Back face (imagen de la carta) */}
      {isFlipped && (
        <View style={styles.cardFace}>
          <Image source={{ uri: card.image }} style={styles.image} resizeMode="contain" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 150,
    margin: 10,
    backgroundColor: "#eee",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  cardFace: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 120,
  },
  flipped: {
    // Podés cambiar el fondo o algo si está volteado
    backgroundColor: "#fff",
  },
  inactive: {
    opacity: 0.4,
  },
});


