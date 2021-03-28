import React  from "react"
import {View, Text,StyleSheet } from "react-native"

import Colors from "../utils/colors"
interface IErrorMesseger {
    title: string
}

const ErrorMessger : React.FC<IErrorMesseger> = (props) =>{
    const {title} = props

    return (
        <>
            <Text style={styles.errorMsg}>{title}</Text>
        </>
    )
}

const styles = StyleSheet.create({
  errorMsg: {
    color: Colors.RED,
    fontSize: 12,
    paddingBottom:5
  },
});

export default ErrorMessger