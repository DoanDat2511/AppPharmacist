import React, { useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useTranslation } from "react-i18next";

import styles from "./Styles";
import Colors from "../../utils/colors";
import { ic_menu, ic_noti } from "../../assets";
import TouchableComponent from "../../components/Button";
import Header from "../../components/Header";
import { IBaseProps } from "../../utils/interface";
const Messages = [
  {
    id: "1",
    userName: "Jenny Doe",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "2",
    userName: "John Doe",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "3",
    userName: "Ken William",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
  },
];
interface oUser {
  id: string;
  userName: string;
  userImg: any;
  messageTime: string;
  messageText: String;
}
interface IMessenger extends IBaseProps {
  items: oUser;
}

const ItemMessenger: React.FC<IMessenger> = (props) => {
  const { items, navigation } = props;
  const _navigationChatDetail = useCallback(() => {
    console.info("====info====");

    navigation.navigate("ChatDetail", { item: items });
  }, [navigation]);
  return (
    <TouchableComponent
      style={styles.userInfoView}
      onPress={_navigationChatDetail}
    >
      <View style={styles.userImageView}>
        <Image source={items.userImg} style={styles.imgUser} />
      </View>
      <View style={styles.userInfoRight}>
        <View style={styles.userInfoText}>
          <Text style={styles.textUsername}>{items.userName}</Text>
          <Text style={styles.textTimeMess}>{items.messageTime}</Text>
        </View>
        <View>
          <Text style={styles.userMessengerEnd}>{items.messageText}</Text>
        </View>
      </View>
    </TouchableComponent>
  );
};
const ChatScreen: React.FC<IBaseProps> = (props) => {
  const { navigation } = props;
  const [t] = useTranslation();

  const renderItemMessenger = useCallback(({ item, index }) => {
    return <ItemMessenger items={item} navigation={navigation} />;
  }, []);

  const _keyExtrator = useCallback((item, index) => {
    return "key" + index;
  }, []);
  return (
    <View style={styles.container}>
      <Header
        btnIconRight={ic_noti}
        backgroundColor={Colors.BLUE_OPACITY}
        title={t("messenger")}
      />
      <FlatList
        data={Messages}
        keyExtractor={_keyExtrator}
        renderItem={renderItemMessenger}
      />
    </View>
  );
};

export default ChatScreen;
