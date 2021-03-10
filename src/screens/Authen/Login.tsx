import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import {
  View,
  ViewStyle,
  Text,
  Platform,
  Image,
  TextInput,
  StyleSheet,
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
import LinearGradient from "react-native-linear-gradient";
import TouchableComponent from "../../components/Button";
import {
  sGetLanguage,
} from "../../redux/selectors";
import { setLanguageAction } from "../../redux/action/app-action";
import { checkLoginAction } from "../../redux/action/authen-action";
import Colors from "../../utils/colors";
import { ic_contact, ic_scan, ic_down, img_polygons } from "../../assets";
import { IBaseProps, ELanguage } from "../../utils/interface";

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
          autoCapitalize="none"
          {...other}
        />
      </View>
    </View>
  );
};
const ButtonComponent: React.FC<Ibutton> = (props) => {
  const { onPress, title, style, sizeText } = props;

  const styleText = useMemo(() => {
    return [styles.textButton, { fontSize: sizeText ? sizeText : 18 }];
  }, [sizeText]);
  return (
    <TouchableComponent onPress={onPress} style={style}>
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
    dispatch(
      checkLoginAction({
        username,
        password,
        navigation,
      })
    );
  }, [username, password]);

  const _onCloseModal = useCallback(() => {
    setIsVisbleModal(false);
  }, [isVisibleModal]);
  const _onConfirm = useCallback(() => {
    setIsVisbleModal(false);
    navigation.navigate("Counter");
  }, []);
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

  const _onCloseModalForget = useCallback(() => {
    setIsVisibleForget(false);
  }, []);


  const _onPressRegistry = useCallback(() => {
    navigation.navigate("Resgistry");
  }, [navigation]);
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
        <Animatable.View animation="fadeInLeft" duration={500}>
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
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>
            Password must be 8 characters long.
          </Text>
        </Animatable.View>
      )
    );
  }, [password]);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {headerRight}
      <KeyboardAvoidingView
        style={styles.bodyView}
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <Animatable.View animation="fadeInUpBig" duration={500}>
          <TextInputComponent
            title={t("username")}
            placeholder="Your Username"
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
            sizeText={15}
            onPress={_onPressForgetPassword}
          />
          <ButtonComponent
            title={t("login")}
            style={styles.viewButtonLogin}
            onPress={_onPressLogin}
          />
          <ButtonComponent
            title={t("sign_up")}
            style={styles.viewButtonSign}
            onPress={_onPressRegistry}
          />
        </SafeAreaView>
        <Image
          source={img_polygons}
          style={styles.imgBottom}
          resizeMode="stretch"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_GREEN,
  },
  headerLogin: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: "500",
    color: Colors.white,
  },
  viewLanguages: {
    position: "absolute",
    right: 10,
    top: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textSelectLang: {
    fontSize: 13,
    color: "white",
    fontWeight: "600",
    marginLeft: 5,
  },
  textTitleBody: {
    fontSize: 18,
    color: "white",
    fontWeight: "normal",
  },
  viewTextInput: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  inputView: {
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "normal",
    paddingVertical: 10,
  },
  bodyView: {
    flex: 3,
    backgroundColor: Colors.PURPLE_COAL,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
  },
  errorMsg: {
    color: Colors.RED,
    fontSize: 14,
  },
  textButton: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    marginHorizontal: 20,
  },
  viewButtonLogin: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    marginHorizontal: 20,

    borderRadius: 4,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: Colors.BLUE,
  },
  viewButtonSign: {
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Colors.ORANGE,
  },
  imgBottom: {
    width: "100%",
    bottom: 0,
    position: "absolute",
    zIndex: -1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "70%",
    backgroundColor: "white",
    borderRadius: 10,
  },
  headerModal: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  textTile: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
  },
  textContent: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 16,
    color: "black",
  },
  viewBorder: {
    backgroundColor: "gray",
    height: 0.19,
  },
  viewButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  textButtons: {
    fontSize: 20,
    color: "rgb(55,121,246)",
  },
});

export default Login;
