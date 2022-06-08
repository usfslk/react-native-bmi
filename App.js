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
  Platform
} from "react-native";

export default class App extends React.Component {
  state = {
    height: 0,
    mass: 0,
    resultNumber: 0,
    resultText: "",
    metric: false,
  };

  toggleSwitch = () => {
    this.setState({ metric: !this.state.metric });
  };

  handleCalculate = () => {
    Keyboard.dismiss();
    
    if (this.state.metric) {
      // [weight (kg) / height (cm) / height (cm)] x 10,000
      let imc = (this.state.mass / this.state.height / this.state.height) * 10000
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
      let imc = (this.state.mass * 703) / this.state.height ** 2;
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

   
  };

  render() {
    let { metric } = this.state;
    return (
      <ImageBackground
        source={require("./assets/bg.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <StatusBar mode="light-content" />
        <View style={styles.container}>
          <Text
            style={{
              color: "#FFCB1F",
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 30,
              fontSize: 15,
            }}
          >
            BMI Calculator
          </Text>
          <Text style={styles.mode}>{metric ? "Metric" : "Imperial"}</Text>
          <Switch
            trackColor={{ false: "gray", true: "gray" }}
            thumbColor={metric ? "#FFCB1F" : "#fff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={this.toggleSwitch}
            value={metric}
            style={{ alignSelf: "center" }}
          />
          <View style={styles.intro}>
            <Text style={styles.unit}>{metric ? "(cm)" : "(in)"}</Text>
            <Text style={styles.unit}>{metric ? "(kg)" : "(lbs)"}</Text>
          </View>
          <View style={styles.intro}>
            <TextInput
              placeholderTextColor={"#FFCB1F"}
              placeholder="Height"
              keyboardType="numeric"
              style={styles.input}
              onChangeText={(height) => {
                this.setState({ height });
              }}
            />
            <TextInput
              placeholderTextColor={"#FFCB1F"}
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
            <Text style={styles.buttonText}>Calculate </Text>
          </TouchableOpacity>
          <Text style={styles.result}>{this.state.resultNumber}</Text>
          <Text style={[styles.result, { fontSize: 35 }]}>
            {this.state.resultText}
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f5fcff"
  },
  intro: {
    flexDirection: "row",
  },
  input: {
    height: 80,
    textAlign: "center",
    width: "50%",
    fontSize: 40,
    color: "#FFCB1F",
  },
  button: {
    backgroundColor: "#1D1D1B",
  },
  buttonText: {
    alignSelf: "center",
    padding: 14,
    fontSize: 25,
    color: "#FFCB1F",
    fontWeight: "bold",
    backgroundColor: 'rgba(52, 52, 52, 0.25)',
    borderRadius: 7,

  },
  result: {
    alignSelf: "center",
    color: "lightgray",
    fontSize: 65,
    padding: 15,
  },
  unit: {
    color: "lightgray",
    width: "50%",
    textAlign: "center",
  },
  mode: {
    color: "lightgray",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: Platform.OS === 'ios' ? 14 : 0
  },
});
