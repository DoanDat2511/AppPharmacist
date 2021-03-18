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

import Styles from "./Styles";
import { IBaseProps } from "../../../utils/interface";
import { back, img_user } from "../../../assets";
import Colors from "../../../utils/colors";
import Header from "../../../components/Header";
import TouchableComponent from "../../../components/Button";
import InputFied from "../../../components/InputFied";
const CreateAccount: React.FC<IBaseProps> = (props) => {
  const { navigation } = props;
  const [email, setEmail] = useState<string>()

  
  const _onPressGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const _onChangeEmail = useCallback((text:string)=>{
      setEmail(text)
  },[])

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
            <TouchableComponent style={Styles.chooseCamera}>
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreateAccount;
