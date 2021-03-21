import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import moment from "moment"
import ImagePicker, { ImagePickerResponse } from "react-native-image-picker";
import  {
  CountryCode,
  Country
} from "react-native-country-picker-modal";
import auth from "@react-native-firebase/auth";

import Styles from "./Styles";
import { IBaseProps } from "../../../utils/interface";
import { back, img_user } from "../../../assets";
import Colors from "../../../utils/colors";
import Header from "../../../components/Header";
import TouchableComponent from "../../../components/Button";
import InputFied from "../../../components/InputFied";
import DatePicker from "../../../components/DatePicker";
import PhonePicker from "../../../components/PhonePicker";
import ModalPicker from "../../../components/ModalPicker";

interface TCountry {
  cca:CountryCode,
  callingCode:string
}
const CreateAccount: React.FC<IBaseProps> = (props) => {
  const { navigation } = props;

  const [email, setEmail] = useState<string>();
  const [imgPath, setImgPath] = useState<string>();
  const [password, setPassword] = useState<string>()
  const [isVisableOtp, setIsViableOtp] = useState<boolean>(false);
  const [confirmPassword, setConfirmPasswrod] = useState<string>()
  const [username, setUsername] = useState<string>()
  const [birthday ,setBirthday] = useState<string>()
  const [phoneNumber, setPhoneNumber] = useState<string>()
  const [contryCode, setContryCode] = useState<TCountry>({
    cca:"VN",
    callingCode:"84"
  });
  const [isVisibleDate, setIsVisibleDate] = useState<boolean>(false);
  
  useEffect(()=>{

auth()
  .createUserWithEmailAndPassword(
    "dat.doe@example.com",
    "dfdsf!"
  )
  .then(() => {
    console.log("User account created & signed in!");
  })
  .catch((error) => {
    if (error.code === "auth/email-already-in-use") {
      console.log("That email address is already in use!");
    }

    if (error.code === "auth/invalid-email") {
      console.log("That email address is invalid!");
    }

    console.error(error);
  });
  },[])
  const _onPressGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const _onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const _onChangePassword = useCallback((text :string)=>{
    setPassword(text)
  },[])

  const _onChangeConfirmPassword = useCallback((text:string)=>{
    setConfirmPasswrod(text)
  },[])
  
   const _onChangUsername = useCallback((text: string) => {
     setUsername(text);
   }, []);
  
  const _onChangePhone = useCallback((text:string)=>{
  setPhoneNumber(text)
  },[])

  const _onCancleDate = useCallback(() => {
    setIsVisibleDate(false);
  }, [isVisibleDate]);

  const _onOpenDate = useCallback(() => {
    setIsVisibleDate(true);
  }, []);

  const _onConfirm = useCallback(
    (date) => {
        setBirthday(moment(date).format("DD/MM/YYYY"));
        setIsVisibleDate(false);
    },
    [isVisibleDate]
  );
  const _onSelectCountry = useCallback((data: Country) => {
    setContryCode({
      callingCode: data.callingCode[0],
      cca: data.cca2,
    });
  }, []);
  const _onOpenOTP = useCallback(() => {
    console.log("object all", {
      email,
      password,
      confirmPassword,
      username,
      imgPath,
      phoneNumber,
      contryCode,
    });
    // setIsViableOtp(true);
    onRequestOtp()
  }, [
    email,
    password,
    confirmPassword,
    username,
    imgPath,
    contryCode,
    phoneNumber,
  ]);

  const _onCloseOTP = useCallback(() => {
    setIsViableOtp(false);
  }, []);

  const _openChooseImage = useCallback(async () => {
    const options = {
      title: "Select Avatar",
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
        console.log("User tapped custom button: ", response.customButton);
      } else {
          let path = getPlatformPath(response).value;
          setImgPath(path)
      }
    });
  }, [ImagePicker]);

   const getPlatformPath = (image: ImagePickerResponse) => {
     const { path, uri } = image;
     return Platform.select({
       android: { value: path },
       ios: { value: uri },
     });
   };

   const getPlatformURI = (imagePath) => {
    let imgSource = imagePath
    if (isNaN(imagePath)) {
      imgSource = { uri: imagePath }
      
        imgSource = { uri: imagePath }
        if (Platform.OS == "android") {
          imgSource.uri = "file:///" + imgSource.uri
        }
    }
    return imgSource
  }

    const verifyPhoneNumber = async (phone) => {
      try {
        const confirm = await auth()
          .verifyPhoneNumber(phone , 1, true)
          .catch((error) => {
            console.log("==",error.message);
          });
      } catch (err) {
            console.log(err.message);
       
      }
    };
    const onRequestOtp = async () => {
   
          // phoneInputRef.current.blur();

        try {
                    await verifyPhoneNumber('+84963960830');
        } catch (error) {
          console.log("erro request otp",error)
        }
      
    };

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
            <TouchableComponent
              style={Styles.chooseCamera}
              onPress={_openChooseImage}
            >
              {imgPath ? (
                <Image
                  source={getPlatformURI(imgPath)}
                  resizeMode='cover'
                  style={Styles.avatarImage}
                />
              ) : (
                <Image
                  source={img_user}
                  resizeMode='center'
                  style={Styles.avatarImage}
                />
              )}
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
              onChangeText={_onChangePassword}
            />
            <InputFied
              title='Re Password'
              secureTextEntry
              onChangeText={_onChangeConfirmPassword}
            />
            <InputFied
              title='Nick Name'
              secureTextEntry
              onChangeText={_onChangUsername}
            />
            <DatePicker
              title='Birthday'
              onOpenPicker={_onOpenDate}
              isVisible={isVisibleDate}
              mode='date'
              value={birthday}
              onConfirm={_onConfirm}
              is24Hour={true}
              locale='en'
              onCancel={_onCancleDate}
            />
            <PhonePicker
              title='Phone'
              keyboardType='numeric'
              onChangeText={_onChangePhone}
              placeholder='12345678'
              onSelect={_onSelectCountry}
              valueCountry={contryCode}
            />
          </View>
          <TouchableComponent style={Styles.viewButton} onPress={_onOpenOTP}>
            <Text style={Styles.titleButton}>REGISTER</Text>
          </TouchableComponent>
          <View style={{ height: 60 }} />
          {isVisableOtp && (
            <ModalPicker
              visible={isVisableOtp}
              animationType='none'
              onCloseModal={_onCloseOTP}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateAccount;
