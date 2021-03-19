import React, { Children,useState, useCallback, useRef, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  Image,
  ModalProps,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import Header from "./Header";
import { back } from "../assets";
import  Colors  from "../utils/colors";
import TouchableComponent from "./Button";

interface IModal extends ModalProps{
  visible : boolean,
  onCloseModal?: (e?: any) => void;
}
const ModalPicker: React.FC<IModal> = (props) => {
  let inputRef = useRef(null)
  const {visible,onCloseModal, children, ...other } = props;
  const lengthInput = 6 
  const [internalVal ,setInternalVal]  = useState<string>("")
  const [countDown,setCountDown] = useState(50)
 
   useEffect(()=>{
   setTimeout(() => {
      inputRef.current.focus()
   },30);
  },[])
  useEffect(()=>{
       const callClock = setInterval(()=>{
          decrementClock()
      },1000)
      return ()=>{
        clearInterval(callClock)
      }
  },[countDown])

  useEffect(()=>{
      console.log("===== ",internalVal)
  },[internalVal])
 
  const styleCell = useCallback((index:number)=>{
    return [styles.cellView,{borderBottomColor : index === internalVal?.length - 1 ? "red" :""}]
  },[internalVal])
  const valueCell  = useCallback((index :number) :string=>{
    return  internalVal?.length> 0 ? internalVal[index] :""
  },[internalVal])
  const decrementClock  = () =>{
    if(countDown === 0){
      setCountDown(0)
      return
    }
    setCountDown(countDown -1)
  }
  const _onChangeText = useCallback((text:string)=>{
      setInternalVal(text)
  },[])
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
                style={{width:0,height:0}}
                onChangeText={_onChangeText}
                returnKeyType="done"
                keyboardType='numeric'

              />
              <View style={styles.inputContainer}>
                    {Array(lengthInput)?.fill(0)?.map((data,index)=>(
                        <TouchableComponent key={index}
                          style={styleCell(index)}
                            onPress={()=> inputRef.current.focus()}
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
                <TouchableComponent style={styles.btnResend}>
                      <Text style={styles.textResend}>Resend OTP ({countDown})</Text>
               </TouchableComponent>
          </View>
        </KeyboardAvoidingView>
      </View>
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
  inputContainer:{
    flexDirection:"row",
    alignItems:'center',
    justifyContent:"center"
  },
  cellView:{
    paddingVertical:5 ,
    width:40,
    margin:5,
    alignItems:"center",
    borderBottomWidth: 2,
  },
  textCell:{
    fontSize:30,
    fontWeight:"bold"
  },
  viewBottom:{
    flex:1,
    flexDirection:"row",
    alignItems:"flex-end",
    justifyContent:"space-between",
    marginBottom:Platform.OS === "android"? 50 : 0,
    width:"80%"
  },
  btnChange:{
    // width:"40%",
    justifyContent:"center",
    alignItems:"center"
  },
  textChangNumber:{
    color:Colors.BLUE_LIGHT,
    fontSize:14,
  },
  btnResend:{
    justifyContent:"center",
    alignItems:"center"
  },
  textResend:{
    color:Colors.gray_3,
  fontSize:14,
  }
});

export default ModalPicker;
