import React from 'react';
import { Text, View } from 'react-native';
import {Image, StyleSheet} from 'react-native';

import { useState, useEffect } from 'react';

import {Card} from './Card.jsx'


const cartasPorPalo = [
    {
        name: "oro",
        image: require(`../assets/oro.png`)
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



export const CardsScreen = () =>{
    return(
        <View>
            <View>
                <Text>Hola</Text>
            </View>
            
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
  });