import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import moment from "moment"
import { useDispatch } from "react-redux"
import Snackbar from "react-native-snackbar";
import auth from "@react-native-firebase/auth";
import * as Animatable from "react-native-animatable";
import ImagePicker, { ImagePickerResponse } from "react-native-image-picker";
import {
  CountryCode,
  Country
} from "react-native-country-picker-modal";

import Styles from "./Styles";
import Colors from "../../../utils/colors";
import Header from "../../../components/Header";
import { back, img_user } from "../../../assets";
import { IBaseProps } from "../../../utils/interface";
import InputFied from "../../../components/InputFied";
import DatePicker from "../../../components/DatePicker";
import PhonePicker from "../../../components/PhonePicker";
import ModalPicker from "../../../components/ModalPicker";
import TouchableComponent from "../../../components/Button";
import { checkCredentialAccount } from "../../../redux/action/authen-action"
import {
  phoneNumberWithCode,
  validateEmail
} from "../../../utils/helpers";
import ErrorMessger from "../../../components/ErrorMesseger";
interface TCountry {
  cca: CountryCode,
  callingCode: string
}
const CreateAccount: React.FC<IBaseProps> = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch()
  const [email, setEmail] = useState<string>("");
  const [imgPath, setImgPath] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const [isVisableOtp, setIsViableOtp] = useState<boolean>(false);
  const [confirmPassword, setConfirmPasswrod] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [birthday, setBirthday] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [address , setAddress] = useState<string>("")
  const [contryCode, setContryCode] = useState<TCountry>({
    cca: "VN",
    callingCode: "84"
  });
  const [isVisibleDate, setIsVisibleDate] = useState<boolean>(false);

  const _onPressGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const _onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const _onChangePassword = useCallback((text: string) => {
    setPassword(text)
  }, [])

  const _onChangeConfirmPassword = useCallback((text: string) => {
    setConfirmPasswrod(text)
  }, [])

  const _onChangUsername = useCallback((text: string) => {
    setUsername(text);
  }, []);

  const _onChangAddress = useCallback((text:string)=>{
    setAddress(text)
  },[])
  const _onChangePhone = useCallback((text: string) => {
    setPhoneNumber(text)
  }, [])

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
  const _onOpenOTP = () => {
    const payload = {
      email,
      password,
      username,
      imgPath,
      address,
      phoneNumber: phoneNumberWithCode(phoneNumber, contryCode?.callingCode)
    }
    if (email != "" && password != "" && confirmPassword != "" && birthday != "" && username != "" && confirmPassword != "" && phoneNumber !="" && address != "") {
       if (warningUsername && warningPassword && warningPhone && warningDate && warningEmail && warningConfirmPass ) {
       dispatch(checkCredentialAccount({ data: payload, setIsViableOtp }));
      } else {
        Snackbar.show({
          text: "Các trường validate",
          duration: 2000,
        });
      }
    } else {
      Snackbar.show({
        text: "Nhập đủ các thông tin",
        duration: 2000,
      });
    }
  }

  const dataModal = useMemo(() => {
    const payload = {
      email,
      password,
      username,
      imgPath,
      address,
      phoneNumber: phoneNumberWithCode(phoneNumber, contryCode?.callingCode)
    }
    return payload
  }, [
    email,
    password,
    confirmPassword,
    username,
    imgPath,
    contryCode,
    phoneNumber,
    address
  ]);

  const _onCloseOTP = async () => {
    await auth().currentUser.delete()
    setIsViableOtp(false);
  }

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

  const warningEmail = useMemo(() => {
    if (email != "") {
      if (validateEmail(email)) {
        return true
      }
      return false
    }
    return true

  }, [email])

  const warningPassword = useMemo(() => {
    if (password != "") {
      if (password?.length >= 8) {
        return true;
      }
      return false;
    }
    return true;
  }, [password]);

  const warningConfirmPass = useMemo(() => {
    if (confirmPassword != "") {
      if (confirmPassword?.length >= 8 && confirmPassword === password) {
        return true;
      }
      return false;
    }
    return true;
  }, [confirmPassword, password]);

  const warningUsername = useMemo(() => {
    if (username != "") {
      if (username?.length >= 2) {
        return true;
      }
      return false;
    }
    return true;
  }, [username]);

    const warningAddress = useMemo(() => {
    if (address != "") {
      if (address?.length > 2) {
        return true;
      }
      return false;
    }
    return true;
  }, [birthday]);

  const warningDate = useMemo(() => {
    if (birthday != "") {
      if (birthday?.length >= 2) {
        return true;
      }
      return false;
    }
    return true;
  }, [birthday]);

  const warningPhone = useMemo(() => {
    if (phoneNumber != "") {
      if (phoneNumber?.length >= 9) {
        return true;
      }
      return false;
    }
    return true;
  }, [phoneNumber]);

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
            {!warningEmail && (

              <Animatable.View animation='fadeInLeft' duration={500}>
                <ErrorMessger title={"Username must be 4 characters long."} />
              </Animatable.View>
            )}
            <InputFied
              title='Password'
              secureTextEntry
              onChangeText={_onChangePassword}
            />
            {!warningPassword && (
              <Animatable.View animation='fadeInLeft' duration={500}>
                <ErrorMessger title={"Password must be 4 characters long."} />
              </Animatable.View>
            )}
            <InputFied
              title='Re Password'
              secureTextEntry
              onChangeText={_onChangeConfirmPassword}
            />
            {!warningConfirmPass && (
              <Animatable.View animation='fadeInLeft' duration={500}>
                <ErrorMessger title={"Password re be 4 characters long."} />
              </Animatable.View>
            )}
            <InputFied
              title='Username'
              onChangeText={_onChangUsername}
            />
            {!warningUsername && (
              <Animatable.View animation='fadeInLeft' duration={500}>
                <ErrorMessger title={"Password must be 4 characters long."} />
              </Animatable.View>
            )}
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
            {!warningDate &&
              <Animatable.View animation='fadeInLeft' duration={500}>
                <ErrorMessger title={"date must be 4 characters long."} />
              </Animatable.View>
            }
            <InputFied
              title='Address'
              onChangeText={_onChangAddress}
            />
             {!warningAddress &&
              <Animatable.View animation='fadeInLeft' duration={500}>
                <ErrorMessger title={"date must be 4 characters long."} />
              </Animatable.View>
            }
            <PhonePicker
              title='Phone'
              keyboardType='numeric'
              onChangeText={_onChangePhone}
              placeholder='12345678'
              onSelect={_onSelectCountry}
              valueCountry={contryCode}
            />
            {!warningPhone &&
              <Animatable.View animation='fadeInLeft' duration={500}>
                <ErrorMessger title={"phone must be 4 characters long."} />
              </Animatable.View>
            }
          </View>
          <TouchableComponent style={Styles.viewButton} onPress={_onOpenOTP}
          >
            <Text style={Styles.titleButton}>REGISTER</Text>
          </TouchableComponent>
          <View style={{ height: 100 }} />
          {isVisableOtp && (
            <ModalPicker
              visible={isVisableOtp}
              animationType='none'
              onCloseModal={_onCloseOTP}
              data={dataModal}
              navigation={navigation}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateAccount;
