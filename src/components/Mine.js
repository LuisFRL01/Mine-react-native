import React from 'react';
import { StyleSheet, View } from 'react-native';

export default (props) => {
    return (
        <View style={styles.coontainer}>
            <View style={styles.coreMine}></View>
            <View style={styles.line}></View>
            <View style={[styles.line, { transform: [{ rotate: "45deg" }] }]}></View>
            <View style={[styles.line, { transform: [{ rotate: "90deg" }] }]}></View>
            <View style={[styles.line, { transform: [{ rotate: "135deg" }] }]}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    coontainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    coreMine: {
        height: 14,
        width: 14,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
    },
    line: {
        height: 3,
        width: 20,
        backgroundColor: "black",
        borderRadius: 3,
        position: "absolute"
    }
});