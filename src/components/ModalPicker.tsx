import React, { Children, useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Modal,
  Image,
  ModalProps,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux"

import Header from "./Header";
import { back } from "../assets";
import Colors from "../utils/colors";
import TouchableComponent from "./Button";
import { sGetCredential } from "../redux/selectors"
import { checkVerifyOtp, resendOtp } from "../redux/action/authen-action"
interface IModal extends ModalProps {
  visible: boolean,
  onCloseModal?: (e?: any) => void;
  data?: any,
  navigation?: any
}
const ModalPicker: React.FC<IModal> = (props) => {

  let inputRef = useRef(null)
  const dispatch = useDispatch()
  const { visible, onCloseModal, data, navigation, children, ...other } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const lengthInput = 6
  const [internalVal, setInternalVal] = useState<string>("")
  const [countDown, setCountDown] = useState(10)

  const valueCredentail = useSelector(sGetCredential)
  useEffect(() => {
    if (internalVal?.length === 6) {
      setIsLoading(true)
      dispatch(checkVerifyOtp({ data: data, confirm: valueCredentail.toJS().verificationId, otp: internalVal, setIsLoading ,navigation }))
    }
  }, [internalVal, valueCredentail, data])

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus()
    }, 30);
  }, [])

  useEffect(() => {
    const callClock = setInterval(() => {
      decrementClock()
    }, 1000)
    return () => {
      clearInterval(callClock)
    }
  }, [countDown])

  const IndicatorView = useMemo(() => {
    if (isLoading && visible) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center" },
          ]}
        >
          <StatusBar barStyle="dark-content" />
          <ActivityIndicator
            size="large"
            color={Platform.select({ ios: "padding", android: "white" })}
          />
        </View>
      );
    }
    return null
  }, [isLoading, visible]);

  const statusReSend = useMemo(() => {
    if (countDown === 0) {
      return true
    }
    return false
  }, [countDown])

  const styleCell = useCallback((index: number) => {
    return [styles.cellView, { borderBottomColor: index === internalVal?.length - 1 ? "red" : "" }]
  }, [internalVal])
  const valueCell = useCallback((index: number): string => {
    return internalVal?.length > 0 ? internalVal[index] : ""
  }, [internalVal])
  const decrementClock = () => {
    if (countDown === 0) {
      setCountDown(0)
      return
    }
    setCountDown(countDown - 1)
  }
  const _onChangeText = useCallback((text: string) => {
    setInternalVal(text)
  }, [])

  const _onPressResend = useCallback(() => {
    dispatch(resendOtp({ phoneNumber: data.phoneNumber }))

  }, [data, dispatch])
  return (
    <Modal visible={visible} {...other}>
      <View style={styles.container}>
        <Header title="OTP" headerLeft={
          <TouchableComponent onPress={onCloseModal}>
            <Image source={back} style={{ width: 30, height: 15 }} />
          </TouchableComponent>
        }
          backgroundColor={Colors.white}
          titleStyle={{
            color: "black",
          }} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : null}
          keyboardVerticalOffset={50}
          style={styles.containerKeys}
        >

          <Text style={styles.titleOTP}>Input OTP via send SMS</Text>
          <View>
            <TextInput
              ref={inputRef}
              maxLength={lengthInput}
              value={internalVal}
              style={{ width: 0, height: 0 }}
              onChangeText={_onChangeText}
              returnKeyType="done"
              keyboardType='numeric'

            />
            <View style={styles.inputContainer}>
              {Array(lengthInput)?.fill(0)?.map((data, index) => (
                <TouchableComponent key={index}
                  style={styleCell(index)}
                  onPress={() => inputRef.current.focus()}
                >
                  <Text style={styles.textCell}
                  >{valueCell(index)}</Text>
                </TouchableComponent>
              ))}
            </View>
          </View>
          <View style={styles.viewBottom}>
            <TouchableComponent style={styles.btnChange} onPress={onCloseModal}>
              <Text style={styles.textChangNumber}>Change Number</Text>
            </TouchableComponent>
            <TouchableComponent style={styles.btnResend} disabled={!statusReSend} onPress={_onPressResend}>
              <Text style={[styles.textResend, { color: statusReSend ? Colors.black : Colors.gray_3 }]}>Resend OTP ({countDown})</Text>
            </TouchableComponent>
          </View>
        </KeyboardAvoidingView>
      </View>
      {IndicatorView}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  containerKeys: {
    flex: 1,
    alignItems: "center",
  },
  titleOTP: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 100,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "center"
  },
  cellView: {
    paddingVertical: 5,
    width: 40,
    margin: 5,
    alignItems: "center",
    borderBottomWidth: 2,
  },
  textCell: {
    fontSize: 30,
    fontWeight: "bold"
  },
  viewBottom: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: Platform.OS === "android" ? 50 : 0,
    width: "80%"
  },
  btnChange: {
    // width:"40%",
    justifyContent: "center",
    alignItems: "center"
  },
  textChangNumber: {
    color: Colors.BLUE_LIGHT,
    fontSize: 14,
  },
  btnResend: {
    justifyContent: "center",
    alignItems: "center"
  },
  textResend: {

    fontSize: 14,
  }
});

export default ModalPicker;
