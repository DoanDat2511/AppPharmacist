import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  ReactNode,
  useState,
} from "react";
import {
  View,
  ViewStyle,
  Text,
  Platform,
  Image,
  TextInput,
  StatusBar,
  SafeAreaView,
  TextInputProps,
  StyleProp,
  KeyboardAvoidingView,
  ImageSourcePropType,
  GestureResponderEvent,
  TouchableOpacityProps,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import * as Animatable from "react-native-animatable";
import ActionSheet from "react-native-actionsheet";
import auth from "@react-native-firebase/auth";
import IconSearch from "react-native-vector-icons/AntDesign";

import styles from "./Styles";
import TouchableComponent from "../../../components/Button";
import { sGetLanguage } from "../../../redux/selectors";
import { setLanguageAction } from "../../../redux/action/app-action";
// import { checkLoginAction } from "../../../redux/action/authen-action";
import Colors from "../../../utils/colors";
import { ic_contact, ic_scan, ic_down, img_polygons } from "../../../assets";
import Facebook_Icon from "../../../assets/icons/Facebook_Icon";
import { IBaseProps, ELanguage } from "../../../utils/interface";
import FaceBookIcon from "../../../assets/icons/Facebook_Icon";
import GoogleIcon from "../../../assets/icons/Google_Icon";
import { Screens } from "../../../NavigationConfig";

interface ItextInput extends TextInputProps {
  title: string;
  placeholder: string;
  value?: string;
  nameImage: ImageSourcePropType;
  onChangeText: (text: string) => void;
  placeholderTextColor?: string;
}
interface Imodal extends IBaseProps {
  title: string;
  content: string;
  isVisible: boolean;
  onPressConfirm: (event: GestureResponderEvent) => void;
}
interface Ibutton extends TouchableOpacityProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  onPress: (event: GestureResponderEvent) => void;
  sizeText?: number;
  isSocial?: boolean;
  iconSvg?: ReactNode;
}

const TextInputComponent: React.FC<ItextInput> = (props) => {
  const {
    title,
    placeholder,
    value,
    onChangeText,
    nameImage,
    ...other
  } = props;
  return (
    <View style={styles.viewTextInput}>
      <Text style={styles.textTitleBody}>{title}</Text>
      <View style={styles.inputView}>
        <Image source={nameImage} />
        <TextInput
          placeholder={placeholder}
          style={styles.textInput}
          onChangeText={onChangeText}
          autoCapitalize='none'
          {...other}
        />
      </View>
    </View>
  );
};
const ButtonComponent: React.FC<Ibutton> = (props) => {
  const { onPress, title, style, sizeText, isSocial, iconSvg } = props;

  const styleText = useMemo(() => {
    return [styles.textButton, { fontSize: sizeText ? sizeText : 16 }];
  }, [sizeText]);
  const renderIcon = useMemo(() => {
    return iconSvg;
  }, [iconSvg]);
  return (
    <TouchableComponent onPress={onPress} style={style}>
      {renderIcon}
      <Text style={styleText}>{title}</Text>
    </TouchableComponent>
  );
};
const Login: React.FC<IBaseProps> = (props) => {
  const { navigation } = props;

  const refLanguage = useRef(null);
  const dispatch = useDispatch();
  const [t] = useTranslation();
  const language = useSelector(sGetLanguage);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isVisibleModal, setIsVisbleModal] = useState(false);
  const [isVisibleForget, setIsVisibleForget] = useState(false);

  const _onChangeUsername = useCallback((text) => {
    setUsername(text);
  }, []);
  const _onChangPassword = useCallback((text) => {
    setPassword(text);
  }, []);
  const _onPressSelectLanguage = useCallback(() => {
    refLanguage.current.show();
  }, [refLanguage]);
  const onPressAcionSheetLanguage = useCallback((index) => {
    if (index !== 4) {
      dispatch(setLanguageAction(index));
    } else return null;
  }, []);

  const _onPressLogin = useCallback(() => {
    // dispatch(
    //   checkLoginAction({
    //     username,
    //     password,
    //     navigation,
    //   })
    // );
  }, [username, password]);

  const _onPressLoginFaceBook = useCallback(() => {
    navigation.navigate(Screens.Tabbar);
  }, []);
  
  const _onPressSignUp =  useCallback(()=>{
    navigation.navigate(Screens.CreateAccount)
  },[])
  const languageDisplay = useMemo(() => {
    if (language === ELanguage.English) {
      return t("english");
    } else if (language === ELanguage.Japanese) {
      return t("japanese");
    } else if (language === ELanguage.Korean) {
      return t("korean");
    } else if (language === ELanguage.Vietnamese) {
      return t("Vietnamese");
    }
  }, [language]);
  const _onPressForgetPassword = useCallback(() => {
    setIsVisibleForget(true);
  }, []);

  const selectLang = useMemo(() => {
    return t("language_select");
  }, [t]);
  const headerRight = useMemo(() => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerLogin}>
          <Text style={styles.titleHeader}>Welcome</Text>
          <TouchableComponent
            style={styles.viewLanguages}
            onPress={_onPressSelectLanguage}
          >
            <Image source={ic_down} />
            <Text style={styles.textSelectLang}>{selectLang}</Text>
          </TouchableComponent>
        </View>
      </SafeAreaView>
    );
  }, [languageDisplay, _onPressSelectLanguage]);
  const warringUsername = useMemo(() => {
    return (
      username != null &&
      !username.length &&
      username.length < 4 && (
        <Animatable.View animation='fadeInLeft' duration={500}>
          <Text style={styles.errorMsg}>
            Username must be 4 characters long.
          </Text>
        </Animatable.View>
      )
    );
  }, [username]);
  const warringPassword = useMemo(() => {
    return (
      password != null &&
      !password.length &&
      password.length < 4 && (
        <Animatable.View animation='fadeInLeft' duration={500}>
          <Text style={styles.errorMsg}>
            Password must be 8 characters long.
          </Text>
        </Animatable.View>
      )
    );
  }, [password]);
  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      {headerRight}
      <KeyboardAvoidingView
        style={styles.bodyView}
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <Animatable.View animation='fadeInUpBig' duration={500}>
          <TextInputComponent
            title={t("username")}
            placeholder='Your Username'
            onChangeText={_onChangeUsername}
            nameImage={ic_contact}
            placeholderTextColor={Colors.WHITE_PLACEHOLDER}
          />
          {warringUsername}
          <TextInputComponent
            title={t("password")}
            placeholder={"Typing password"}
            nameImage={ic_scan}
            onChangeText={_onChangPassword}
            secureTextEntry={true}
            placeholderTextColor={Colors.WHITE_PLACEHOLDER}
          />
          {warringPassword}
        </Animatable.View>
        <SafeAreaView>
          <ButtonComponent
            title={t("forget_password") + "?"}
            style={{ marginTop: 10 }}
            sizeText={13}
            onPress={_onPressForgetPassword}
          />
          <ButtonComponent
            title={t("login")}
            style={styles.viewButtonLogin}
            onPress={_onPressLogin}
          />
          <Text style={styles.textOr}>{t("or")}</Text>
          <ButtonComponent
            title={t("login_fb")}
            style={styles.viewButtonLoginFb}
            onPress={_onPressLoginFaceBook}
            iconSvg={<FaceBookIcon />}
          />
          <ButtonComponent
            title={t("login_google")}
            style={styles.viewButtonLoginGoogle}
            onPress={_onPressLoginFaceBook}
            iconSvg={<GoogleIcon />}
          />
          <ButtonComponent
            title={t("sign_up")}
            style={styles.viewButtonSign}
            onPress={_onPressSignUp}
          />
        </SafeAreaView>
        <Image
          source={img_polygons}
          style={styles.imgBottom}
          resizeMode='stretch'
        />
      </KeyboardAvoidingView>

      <ActionSheet
        ref={refLanguage}
        title={"Select Currency"}
        options={["English", "Japanese", "Korean", "Vietnamese", "cancel"]}
        cancelButtonIndex={4}
        value={languageDisplay}
        onPress={onPressAcionSheetLanguage}
      />
    </View>
  );
};

export default Login;
