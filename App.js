// Youssef Selkani
// 2022

import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
  Switch,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
} from "react-native-cool-speedometer";

export default class App extends React.Component {
  state = {
    height: null,
    mass: null,
    resultNumber: null,
    resultText: "",
    metric: false,
  };

  toggleSwitch = () => {
    this.setState({ metric: !this.state.metric });
  };

  handleCalculate = () => {
    let { mass, height } = this.state;
    Keyboard.dismiss();

    if (mass === null || height === null) {
      this.setState({ error: "missing input" });
    } else {
      if (this.state.metric) {
        this.setState({ error: null });
        let imc = (mass / height / height) * 10000;
        this.setState({
          resultNumber: imc.toFixed(2),
        });
        if (imc < 18.5) {
          this.setState({ resultText: "Underweight" });
        } else if (imc > 18.5 && imc < 25) {
          this.setState({ resultText: "Normal Weight" });
        } else if (imc >= 25 && imc < 30) {
          this.setState({ resultText: "Overweight" });
        } else {
          this.setState({ resultText: "Obesity" });
        }
      } else {
        let imc = (mass * 703) / height ** 2;
        this.setState({
          resultNumber: imc.toFixed(2),
        });
        if (imc < 18.5) {
          this.setState({ resultText: "Underweight" });
        } else if (imc > 18.5 && imc < 25) {
          this.setState({ resultText: "Normal Weight" });
        } else if (imc >= 25 && imc < 30) {
          this.setState({ resultText: "Overweight" });
        } else {
          this.setState({ resultText: "Obesity" });
        }
      }
    }
  };

  render() {
    let { metric, resultText, resultNumber, error } = this.state;
    return (
      <ImageBackground
        source={require("./assets/bg.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <StatusBar mode="light-content" />
        <View style={styles.container}>
          <Text
            style={{
              color: "lightgray",
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 30,
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            Minimal BMI Calculator
          </Text>

          <Text style={styles.mode}>{metric ? "Metric" : "Imperial"}</Text>
          <Switch
            trackColor={{ false: "gray", true: "gray" }}
            thumbColor={metric ? "lightgray" : "#fff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleSwitch}
            value={metric}
            style={{ alignSelf: "center" }}
          />
          <View style={styles.intro}>
            <Text style={styles.unit}>{metric ? "(cm)" : "(in)"}</Text>
            <Text style={styles.unit}>{metric ? "(kg)" : "(lbs)"}</Text>
          </View>

          <View style={[styles.intro, { marginVertical: 14 }]}>
            <TextInput
              placeholderTextColor={"lightgray"}
              placeholder="Height"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={(height) => {
                this.setState({ height });
              }}
            />
            <TextInput
              placeholderTextColor={"lightgray"}
              placeholder="Mass"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={(mass) => {
                this.setState({ mass });
              }}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={this.handleCalculate}
          >
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>

          {error && <Text style={styles.error}>Error: {error}</Text>}

          {resultNumber !== null && (
            <View>
              <Text style={styles.result}>{resultNumber}</Text>
              <Text
                style={[styles.result, { fontSize: 25, fontWeight: "bold" }]}
              >
                {resultText}
              </Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 24,
                  marginBottom: 24,
                }}
              >
                <Speedometer
                  value={resultNumber}
                  max={40}
                  angle={180}
                  accentColor="lightgray"
                  width={180}
                  height={110}
                >
                  <Background angle={180} />
                  <Arc />
                  <Needle />
                  <Progress />
                  <Marks />
                </Speedometer>
              </View>
              <Text style={styles.text}>Less than 18.5 = Underweight</Text>
              <Text style={styles.text}>18.5–24.9 = Normal weight</Text>
              <Text style={styles.text}>25–29.9 = Overweight</Text>
              <Text style={styles.text}>30 or greater = Obesity</Text>
            </View>
          )}
        </View>
      </ImageBackground>
    );
  }
}

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5fcff"
  },
  intro: {
    flexDirection: "row",
  },
  input: {
    textAlign: "center",
    width: "50%",
    fontSize: 44,
    color: "lightgray",
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
  },
  error: {
    textAlign: "center",
    fontSize: 14,
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.5)",
    marginTop: 14,
    paddingVertical: 14,
  },
  button: {
    width: width / 2,
    marginLeft: width / 4,
    borderRadius: 99,
    backgroundColor: "#000",
    borderColor: "gray",
    borderWidth: 2,
    marginVertical: 14,
  },
  buttonText: {
    textAlign: "center",
    padding: 14,
    fontSize: 20,
    color: "#fff",
  },
  result: {
    alignSelf: "center",
    color: "lightgray",
    fontSize: 65,
    marginTop: 7,
  },
  unit: {
    color: "lightgray",
    width: "50%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 12,
  },
  mode: {
    color: "lightgray",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: Platform.OS === "ios" ? 14 : 0,
  },
});
