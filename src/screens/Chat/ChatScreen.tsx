import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
} from "react-native";
import { useTranslation } from "react-i18next";

import styles from "./Styles";
import Colors from "../../utils/colors";
import { ic_search } from "../../assets";
import Header from "../../components/Header";
import { IBaseProps } from "../../utils/interface";
import SearchInput from "../../components/SearchInput"
import TouchableComponent from "../../components/Button";
const Messages = [
  {
    id: "1",
    userName: "Jenny Doe",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "4 mins ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
    isOnline: true,
  },
  {
    id: "2",
    userName: "John Doe",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "2 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
    isOnline: true,
  },
  {
    id: "3",
    userName: "Ken William",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "1 hours ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
    isOnline: false,
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
    isOnline: false,
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
    isOnline: false,
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
    isOnline: true,
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my social app in React Native.",
    isOnline: false,
  },
  {
    id: "4",
    userName: "Selina Paul",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "1 day ago",
    messageText:
      "Hey there, this is my test for a post of my D social app in React Native.",
    isOnline: false,
  },
  {
    id: "5",
    userName: "Christy Alex",
    userImg: require("../../assets/users/user-3.jpg"),
    messageTime: "2 days ago",
    messageText:
      "Hey there, this is my test for a post of my DFsocial FD app in React Native.",
    isOnline: true,
  },
];
interface oUser {
  id: string;
  userName: string;
  userImg: any;
  messageTime: string;
  messageText: String;
  isOnline: boolean
}
interface IMessenger extends IBaseProps {
  items: oUser;
}

const ItemMessenger: React.FC<IMessenger> = (props) => {
  const { items, navigation } = props;


  const _navigationChatDetail = useCallback(() => {
    navigation.navigate("ChatDetail", { item: items });
  }, [navigation]);
  const statusOnline = useMemo(() => {
    if (items.isOnline) {
      return [styles.viewOnline, { backgroundColor: Colors.green_1 }]
    }
    return [styles.viewOnline];
  }, [])
  return (
    <TouchableComponent
      style={styles.userInfoView}
      onPress={_navigationChatDetail}
    >
      <View style={styles.userImageView}>
        <Image source={items.userImg} style={styles.imgUser} />
        <View style={statusOnline} />
      </View>
      <View style={styles.userInfoRight}>
        <View style={styles.userInfoText}>
          <Text style={styles.textUsername}>{items.userName}</Text>
          <Text style={styles.textTimeMess}>{items.messageTime}</Text>
        </View>
        <View>
          <Text style={styles.userMessengerEnd}>{items.messageText}</Text>
        </View>
        <View style={styles.countMessenger}>
          <Text style={styles.textNumberMess}>4</Text>
        </View>
      </View>
    </TouchableComponent>
  );
};
const ChatScreen: React.FC<IBaseProps> = (props) => {
  const { navigation } = props;
  const [t] = useTranslation();
  const [searchText, setSearchText] = useState<string>();
  
  const renderItemMessenger = useCallback(({ item, index }) => {
    return <ItemMessenger items={item} navigation={navigation} />;
  }, []);

  const _keyExtrator = useCallback((item, index) => {
    return "key" + index;
  }, []);

  const _onChangTextSearch = useCallback((text: string) => {
    return setSearchText(text)
  }, [])

  const _onClearInput = useCallback(() => {
    return setSearchText("")
  }, [])

  return (
    <View style={styles.container}>
      <Header
        title={t("Messenger")}
        backgroundColor={Colors.white}
        titleStyle={{
          fontSize: 25,
          fontWeight: "bold",
          color: Colors.black,
        }}
      />
      <SearchInput
        icon={ic_search}
        placeholder='Search conventions'
        value={searchText}
        onChangText={_onChangTextSearch}
        onClearInput={_onClearInput}
      />
      <FlatList
        data={Messages}
        keyExtractor={_keyExtrator}
        renderItem={renderItemMessenger}
        contentContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );
};

export default ChatScreen;
