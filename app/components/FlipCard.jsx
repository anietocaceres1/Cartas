// Probado solo en web
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';

/* ------------ COMPONENTE FLIP CARD ------------ */
export default FlipCard = ({ frontImage, backImage, index, isDisabled }) => {
  const [showBack, setShowBack] = useState(false);     // false = Bulbasaur
  const rotation = useRef(new Animated.Value(0)).current;

  /* ------------ cada vez que cambia showBack se anima ------------ */
  useEffect(() => {
    Animated.spring(rotation, {
      toValue: showBack ? 180 : 0,
      useNativeDriver: Platform.OS !== 'web', // nativo solo en móvil
      friction: 8,
      tension: 40,
    }).start();
  }, [showBack, rotation]);

  /* ------------ interpolaciones ------------ */
  const frontRotation = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backRotation = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  /* ------------ manejador de pulsación ------------ */
  const handlePress = () => { 
    {setShowBack((prev) => !prev)} 
  };

  const restartCard = () => {
    setShowBack((prev) => !prev)
  }

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <View style={styles.cardContainer}>
        {/* Cara delantera (Bulbasaur) */}
        <Animated.View style={[styles.cardSide, { transform: [{ rotateY: frontRotation }] }]}>
          <Image source={frontImage} style={styles.image} resizeMode="contain" />
        </Animated.View>

        {/* Cara trasera (Pikachu) */}
        <Animated.View
          style={[
            styles.cardSide,
            styles.cardBack,
            { transform: [{ rotateY: backRotation }] },
          ]}
        >
          <Image source={backImage} style={styles.image} resizeMode="contain" />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

/* ------------ APP DE PRUEBA ------------ */
export  function FlipCardApp() {
  const bulbasaur = {
    uri: require("../assets/backCard.png"),
  };
  const pikachu = {
    uri: require(`../assets/corazón.png`),
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adivina el Pokémon</Text>
      <FlipCard frontImage={bulbasaur} backImage={pikachu} />
    </View>
  );
}

/* ============ STYLES ============ */
const shadowStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  android: {
    elevation: 4,
  },
  web: {
    boxShadow: '0 3px 6px rgba(0,0,0,0.18)', // evita warning “shadow* style props”
  },
  default: {},
});

const styles = StyleSheet.create({
  /* ----- layout general ----- */
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },

  /* ----- carta ----- */
  cardContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    perspective: 1000,        // 3-D real en móvil y web
    ...shadowStyle,
  },
  cardSide: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    /* hace que la cara trasera no capte toques en iOS/Android */
    ...Platform.select({
      ios: { pointerEvents: 'none' },
      android: { pointerEvents: 'none' },
    }),
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});