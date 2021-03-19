import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ImagePicker, { ImagePickerResponse } from "react-native-image-picker";

import Styles from "./Styles";
import { IBaseProps } from "../../../utils/interface";
import { back, img_user } from "../../../assets";
import Colors from "../../../utils/colors";
import Header from "../../../components/Header";
import TouchableComponent from "../../../components/Button";
import InputFied from "../../../components/InputFied";
import DatePicker from "../../../components/DatePicker";
import PhonePicker from "../../../components/PhonePicker";
import ModalPicker from "../../../components/ModalPicker"

const CreateAccount: React.FC<IBaseProps> = (props) => {
  const { navigation } = props;
  const [email, setEmail] = useState<string>()
  const [isVisibleDate, setIsVisibleDate] = useState<boolean>(false);
  const [isVisableOtp,setIsViableOtp] = useState<boolean>(false)
  const _onPressGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const _onChangeEmail = useCallback((text:string)=>{
      setEmail(text)
  },[])

  const _onCancleDate = useCallback(() => {
    setIsVisibleDate(false);
  }, [isVisibleDate]);

  const _onOpenDate = useCallback(() => {
    setIsVisibleDate(true);
  }, []);

  const _onConfirm = useCallback(
    (date) => {
    //   setBirthday(moment(date).format("DD:MM:YYYY"));
      setIsVisibleDate(false);
    },
    [isVisibleDate]
  );
  const _onOpenOTP = useCallback(()=>{
      setIsViableOtp(true)
  },[])

  const _onCloseOTP = useCallback(()=>{
      setIsViableOtp(false)
  },[])

  const _openChooseImage = useCallback( async ()=>{
        const options = {
          title: "Select Avatar",
          customButtons: [
            { name: "fb", title: "Choose Photo from Facebook" },
          ],
          storageOptions: {
            skipBackup: true,
            path: "images",
          },
        };
        ImagePicker.showImagePicker(options, (response) => {
          console.log("Response = ", response);
          if (response.didCancel) {
            console.log("User cancelled image picker");
          } else if (response.error) {
            console.log("ImagePicker Error: ", response.error);
          } else if (response.customButton) {
            console.log(
              "User tapped custom button: ",
              response.customButton
            );
          } else {
            const source = { uri: response.uri };
            // setPhotoData(source);
          }
        });
  },[ImagePicker])
  

  return (
    <View style={Styles.container}>
      <Header
        title='Create Account'
        headerLeft={
          <TouchableComponent onPress={_onPressGoBack}>
            <Image source={back} style={{ width: 30, height: 15 }} />
          </TouchableComponent>
        }
        backgroundColor={Colors.white}
        titleStyle={{
          color: "black",
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView>
          <View style={Styles.viewImageProfile}>
            <TouchableComponent style={Styles.chooseCamera} 
              onPress={_openChooseImage}
            >
              <Image
                source={img_user}
                resizeMode='center'
                style={Styles.avatarImage}
              />
            </TouchableComponent>
            <View style={Styles.viewContentAvatar}>
              <Text style={Styles.titleAvatar}>Avatar</Text>
              <View style={Styles.viewNoteAvatar}>
                <Text style={Styles.titleNote}>Edit profile picture</Text>
                <Text style={Styles.titleNote}>
                  - Only 500×500, low-floor JPG, BMP, and PNG
                </Text>
                <Text style={Styles.titleNote}>- Dưới 1MB</Text>
              </View>
            </View>
          </View>
          <View style={Styles.viewBody}>
            <InputFied title='Email' onChangeText={_onChangeEmail} />
            <InputFied
              title='Password'
              secureTextEntry
              onChangeText={_onChangeEmail}
            />
            <InputFied
              title='Re Password'
              secureTextEntry
              onChangeText={_onChangeEmail}
            />
            <InputFied
              title='Nick Name'
              secureTextEntry
              onChangeText={_onChangeEmail}
            />
            <DatePicker
              title='Birthday'
              onOpenPicker={_onOpenDate}
              isVisible={isVisibleDate}
              mode='date'
              onConfirm={_onConfirm}
              is24Hour={true}
              locale='en'
              onCancel={_onCancleDate}
            />
            <PhonePicker title='Phone' />
          </View>
          <TouchableComponent style={Styles.viewButton} onPress={_onOpenOTP}>
            <Text style={Styles.titleButton}>REGISTER</Text>
          </TouchableComponent>
          <View style={{ height: 60 }} />
          {isVisableOtp && (
            <ModalPicker
              visible={isVisableOtp}
              animationType="none"
              onCloseModal={_onCloseOTP}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateAccount;
