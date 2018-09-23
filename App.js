/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  TouchableOpacity
} from 'react-native';


export default class App extends Component{

  constructor(){
    super()
    this.state={
      resultText: "",
      calculationText: ""
    }
    this.operations=['C','+','-','*','/']
  }

  calculateResult(){
    const text = this.state.resultText

    this.setState({
      calculationText: eval(text)
    })
  }

  validate(){
    const text = this.state.resultText
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false
    }
    return true
  }

  buttonPressed(text){
    //console.log(text)

    if (text == '=') {
      return this.validate() && this.calculateResult()
    }

    this.setState({
      resultText:this.state.resultText + text
    })
  }

  operate(operation){
    switch (operation) {
      case 'C':
        let text = this.state.resultText.split('')
        text.pop()
        text.join('')
        this.setState({
          resultText:text.join('')
        })
        break
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = this.state.resultText.split('').pop()
        if (this.operations.indexOf(lastChar) > 0 ) return

        if (this.state.text == "") return

        this.setState({
          resultText: this.state.resultText + operation
        })

    }
  }

  render() {

    let rows = []
    let nums = [[7,8,9],[4,5,6],[1,2,3],['.','0','=']]
    for (let i = 0; i < 4; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {
          row.push(<TouchableOpacity key = {nums[i][j]} onPress={() => this.buttonPressed(nums[i][j])} style={styles.btn}>
            <Text style = {styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>)
      }
      rows.push(<View key={i} style={styles.row}>{row}</View>)
    }

    let ops = []
    for (let k = 0; k < 5; k++) {
      ops.push(<TouchableOpacity key={this.operations[k]} onPress={() => this.operate(this.operations[k])} style={styles.btn}>
        <Text style = {styles.btnText}>{this.operations[k]}</Text>
      </TouchableOpacity>)
    }
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text style={styles.resultText}>
          {this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.keypad}>
          <View style={styles.numberKeypad}>
            {rows}
          </View>
          <View style={styles.operatorKeypad}>
            {ops}
          </View>
        </View>
      </View>
    );eeqa
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  resultText:{
    fontSize:60,
    color:'black'
  },
  calculationText:{
    fontSize:40,
    color:'grey'
  },
  row:{
    flexDirection:'row',
    flex:1,
    justifyContent:'space-around',
    alignItems:'center'
  },
  result: {
    flex: 2,
    justifyContent:'center',
    alignItems:'flex-end'
  },
  calculation:{
    flex:1,
    justifyContent:'center',
    alignItems:'flex-end'
  },
  keypad: {
    flexGrow: 6,
    flexDirection:'row'
  },
  numberKeypad:{
    flex:3,
    backgroundColor:'#434343'
  },
  btnText:{
    fontSize:30,
    color:'#fff'
  },
  btn:{
    flex:1,
    alignItems:'center',
    alignSelf:'stretch',
    justifyContent:'center'
  },
  operatorKeypad:{
    flex:1,
    justifyContent:'space-around',
    alignItems:'stretch',
    backgroundColor:'#636363'
  }
})
