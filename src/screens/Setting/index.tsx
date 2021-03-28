import React, {useCallback, useState} from "react"
import { View, Text, Switch, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux"

import styles from "./Styles"
import Header from "../../components/Header"
import {IBaseProps} from "../../utils/interface"
import Colors from "../../utils/colors"
import TouchableComponent from "../../components/Button";
import LanguageIcon from "../../assets/icons/Language_icon"
import FaqIcon from "../../assets/icons/Faq_icon"
import VersionIcon from "../../assets/icons/Version_icon"
import NotificationIcon from "../../assets/icons/Notification_icon";
import AskIcon from "../../assets/icons/Ask_icon";
import Icon from "react-native-vector-icons/Ionicons"

import ElementFied from "../../components/ElementFied";
import ProfileIcon from "../../assets/icons/Profile_icon";
import LogoutIcon from "../../assets/icons/Logout_icon";
import { SGetUserInfor } from "../../redux/selectors";
import { logoutAction } from "../../redux/action/authen-action";
const Setting: React.FC<IBaseProps> = (props) =>{

    const { navigation } = props
    const [isEnabled, setIsEnabled] = useState(false);
    const dispatch = useDispatch()
    const userInfor = useSelector(SGetUserInfor)

    const  onPressLogout = useCallback(()=>{
          if(userInfor?.getIn(["id"])){
            dispatch(logoutAction({navigation,id:userInfor?.getIn(["id"])}))
          }
    },[userInfor,navigation])

    const toggleSwitch = () =>
      setIsEnabled((previousState) => !previousState);

    return (
      <View style={styles.container}>
        <Header
          title='Setting'
          backgroundColor={Colors.white}
          titleStyle={{
            fontSize: 25,
            fontWeight: "bold",
            color: Colors.black,
          }}
        />
        <ScrollView>
          <View>
            <Text style={styles.titleComom}>Language</Text>
            <View style={styles.viewContainerEle}>
              <ElementFied
                title='Language'
                icons={<LanguageIcon />}
                statusBorder
                textLang="English"
              />
              <ElementFied
                title='Night Mode'
                icons={<VersionIcon />}
                enableSwitch
                statusBorder
                isEnabled={isEnabled}
                toggleSwitch={toggleSwitch}
              />
              <ElementFied
                title='Pause Notifcation'
                icons={<NotificationIcon />}
                enableSwitch
                isEnabled={isEnabled}
                toggleSwitch={toggleSwitch}
              />
            </View>
          </View>
          <View>
            <Text style={styles.titleComom}>More</Text>
            <View style={styles.viewContainerEle}>
              <ElementFied
                title='Ask Questions'
                icons={<AskIcon />}
                statusBorder
              />
              <ElementFied title='FAQ' icons={<FaqIcon />} statusBorder />
              <ElementFied
                title='Version'
                icons={<VersionIcon />}
              />
            </View>
          </View>
          <View>
            <Text style={styles.titleComom}>Account</Text>
            <View style={styles.viewContainerEle}>
              <ElementFied title='Edit Profile' icons={<ProfileIcon />} statusBorder />
              <ElementFied title='Logout' icons={<LogoutIcon />} 
                onPressElement={onPressLogout}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
}

export default Setting