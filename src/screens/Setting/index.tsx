import React from "react"
import {View , Text} from "react-native"


import styles from "./Styles"
import {IBaseProps} from "../../utils/interface"
const Setting: React.FC<IBaseProps> = (props) =>{
    return (
        <View
            style={styles.container}
        >
            <Text> more </Text>
        </View>
    )
}

export default Setting