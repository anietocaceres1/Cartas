import React from 'react';
import { Text, View } from 'react-native';
import { Image, StyleSheet } from 'react-native';

import { useState, useEffect, useRef } from 'react';

import { Card } from './Card.jsx'

import { FlipCardApp } from './FlipCard.jsx'


const cardsForType = [
    {
        name: "oro",
        image: require("../assets/oro.png")
    },
    {
        name: "copa",
        image: require(`../assets/copa.png`)
    },
    {
        name: "basto",
        image: require(`../assets/basto.png`)
    },
    {
        name: "espada",
        image: require(`../assets/copa.png`)
    },
    {
        name: "corazón",
        image: require(`../assets/corazón.png`)
    },
    {
        name: "pica",
        image: require(`../assets/pica.png`)
    },
    {
        name: "diamante",
        image: require(`../assets/diamante.png`)
    },
    {
        name: "trevol",
        image: require(`../assets/trevol.png`)
    },

];


function shuffleCards(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * i);
        const currentIndex = i - 1;
        const temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
}



export const CardsScreen = () => {
    const [cards, setCards] = useState(() =>
        shuffleCards(cardsForType.concat(cardsForType))
    );
    const [openCards, setOpenCards] = useState([]);
    const [clearedCards, setClearedCards] = useState({});
    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
    const [moves, setMoves] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [bestScore, setBestScore] = useState(
        JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
    );
    const timeout = useRef(null);

    const disable = () => {
        setShouldDisableAllCards(true);
    };
    const enable = () => {
        setShouldDisableAllCards(false);
    };

    // Chequear si se a completado los parejas
    const checkCompletion = () => {
        if (Object.keys(clearedCards).length === cardsForType.length) {
            //setShowModal(true);
            const highScore = Math.min(moves, bestScore);
            setBestScore(highScore);
            localStorage.setItem("bestScore", highScore);
        }

    };

    const evaluate = () => {
        const [first, second] = openCards;
        enable();
        if (cards[first].name === cards[second].name) {
            setClearedCards((prev) => ({ ...prev, [cards[first].name]: true }));
            setOpenCards([]);
            return;
        }
        // This is to flip the cards back after 500ms duration
        timeout.current = setTimeout(() => {
            setOpenCards([]);
        }, 500);
    };
    const handleCardClick = (index) => {
        if (openCards.length === 1) {
            setOpenCards((prev) => [...prev, index]);
            setMoves((moves) => moves + 1);
            disable();
        } else {
            clearTimeout(timeout.current);
            setOpenCards([index]);
        }
    };
    useEffect(() => {
        let timeout = null;
        if (openCards.length === 2) {
            timeout = setTimeout(evaluate, 300);
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [openCards]);

    useEffect(() => {
        checkCompletion();
    }, [clearedCards]);
    const checkIsFlipped = (index) => {
        return openCards.includes(index);
    };

    const checkIsInactive = (card) => {
        return Boolean(clearedCards[card.type]);
    };

    const handleRestart = () => {
        setClearedCards({});
        setOpenCards([]);
        setShowModal(false);
        setMoves(0);
        setShouldDisableAllCards(false);
        // set a shuffled deck of cards
        setCards(shuffleCards(uniqueCardsArray.concat(uniqueCardsArray)));
    };


    return (
        <View>
            <Text h4>Hola</Text>
            <FlipCardApp/>
            <View style={styles.card_container}>
                {cards.map((card, index) => {
                    return (
                        <Card
                            key={index}
                            card={card}
                            index={index}
                            isDisabled={shouldDisableAllCards}
                            isInactive={checkIsInactive(card)}
                            isFlipped={checkIsFlipped(index)}
                            onClick={handleCardClick}
                        />
                    );
                })}

            </View>
            <view>
                <Image source = {require("../assets/copa.png")}></Image>
            </view>

        </View>

    )
};

const styles = StyleSheet.create({
    titulo: {
        width: 200,
        height: 100,
        resizeMode: 'contain',
    },
    carta: {
        width: 80,
        height: 120,
        margin: 5,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card_container: {
        borderWidth: 1,
        borderColor: '#DEDEDE',
        padding: 6,
        shadowColor: '#DEDEDE',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 4,
        // Simulación de display: grid con flexWrap y dimensiones fijas por item
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'stretch',
        gap: 16, // solo disponible en React Native >= 0.71
        marginHorizontal: 'auto', // no se admite 'auto', usar otra forma si es necesario centrar
        width: 600,
        height: 600,
        maxWidth: 720,
        // No existe `perspective` directamente en styles, se usa en animaciones/transforms
        // Por ejemplo: transform: [{ perspective: 100 }]
    },
});