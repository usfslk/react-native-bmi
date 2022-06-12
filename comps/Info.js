import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.side} />
        <View style={styles.side}>
          <Text style={styles.text}>Less than 18 = Underweight</Text>
          <Text style={styles.text}>Between 18–25 = Normal weight</Text>
          <Text style={styles.text}>Between 25–30 = Overweight</Text>
          <Text style={styles.text}>30 or greater = Obesity</Text>
        </View>
        <View style={styles.side} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: "#fff",
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  side: {
    width: "25%",
  },
  side: {
    width: "50%",
  },
});
