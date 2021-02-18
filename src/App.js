import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MineField from './components/MineField';
import Header from './components/Header';
import LevelSelection from './screens/LevelSelection';

import params from './params';
import { createMinedBoard, cloneBoard, openField, hasExplosion, wonGame, showMines, invertFlag, flagsUsed } from './GameLogic';

const minesAmount = () => {
  const rows = params.getRowsAmount();
  const columns = params.getColumnsAmount();
  return Math.ceil(rows * columns * params.difficutLevel);
}

const createBoard = () => {
  const rows = params.getRowsAmount();
  const columns = params.getColumnsAmount();
  return createMinedBoard(rows, columns, minesAmount());
}

export default function App() {

  const [board, setBoard] = useState(createBoard);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [showLevelSelection, setShowLevelSelection] = useState(false);

  const onOpenField = (row, column) => {
    const newBoard = cloneBoard(board);
    openField(newBoard, row, column);
    const lost = hasExplosion(newBoard);
    const won = wonGame(newBoard);

    if (lost) {
      showMines(newBoard);
      Alert.alert('Perdeu', 'Burro');
    }

    if (won) {
      Alert.alert('Parabéns', 'Ganhou!');
    }

    setBoard(newBoard);
    setWon(won);
    setLost(lost);
  }

  const onSelectField = (row, column) => {
    const newBoard = cloneBoard(board);
    invertFlag(newBoard, row, column);
    const won = wonGame(newBoard);

    if (won) {
      Alert.alert('Parabéns', 'Ganhou!');
    }

    setBoard(newBoard);
    setWon(won);
  }

  const onLevelSelected = (level) => {
    params.difficutLevel = level;
    setBoard(createBoard);
  }

  return (
    <SafeAreaView style={styles.container}>
      <LevelSelection isVisible={showLevelSelection} onLevelSelected={onLevelSelected} 
        onCancel={() => setShowLevelSelection(false)} />
      <Header onNewGame={() => setBoard(createBoard)} flagsLeft={minesAmount() - flagsUsed(board)} 
        onFlagPress={() => setShowLevelSelection(true)}/>
      <View style={styles.board}>
        <MineField board={board} onOpenField={onOpenField} onSelectField={onSelectField} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});