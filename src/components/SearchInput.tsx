import React, { useMemo } from "react";
import {
    View,
    TextInput,
    Image,
    ImageSourcePropType,
    StyleSheet,
    TextInputProps,
    GestureResponderEvent,
    Platform,
} from "react-native";

import Colors from "../utils/colors";
import TouchableComponent from "./Button";
import IconClose from "react-native-vector-icons/Ionicons";

interface ISearch extends TextInputProps {
    icon: ImageSourcePropType;
    value?: string;
    onChangText?: (text: string) => void;
    onClearInput?: (event: GestureResponderEvent) => void;
    placeholder?: string;
}

const SearchInput: React.FC<ISearch> = (props) => {
    const {
        icon,
        value,
        onChangText,
        onClearInput,
        placeholder,
        ...other
    } = props;

    const renderIconClose = useMemo(() => {
        if (value) {
            return (
                <TouchableComponent onPress={onClearInput}>
                    <IconClose name='close' color={Colors.gray} size={18} />
                </TouchableComponent>
            );
        }
    }, [value]);
    return (
        <View style={styles.containerInput}>
            <Image source={icon} />
            <TextInput
                onChangeText={onChangText}
                placeholder={placeholder}
                value={value}
                {...other}
                style={styles.inputText}
            />
            {renderIconClose}
        </View>
    );
};

const styles = StyleSheet.create({
    containerInput: {
        flexDirection: "row",
        marginHorizontal: 15,
        borderRadius: 8,
        borderColor: Colors.gray,
        marginTop: 10,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: Platform.OS === "ios" ? 10 : 0,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 10,
            height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        height: Platform.OS === "ios" ? null : 45,
    },
    inputText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
    },
});

export default SearchInput;
