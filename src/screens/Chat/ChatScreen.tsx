import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ImageBackground
} from "react-native";
import moment from "moment"
import { useTranslation } from "react-i18next";
import firestore from "@react-native-firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Styles";
import Colors from "../../utils/colors";
import { ic_search } from "../../assets";
import Header from "../../components/Header";
import { IBaseProps, IImmutableMap } from "../../utils/interface";
import SearchInput from "../../components/SearchInput"
import TouchableComponent from "../../components/Button";
import { COLLECTION } from "../../utils/constant";
import { SGetUserInfor } from "../../redux/selectors"
import { IUser } from "../../types/Authen"
import { createRoomChatAction } from "../../redux/action/chat-action"
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
  items: any;
}
interface IFirends extends IBaseProps {
  items: IUser
}

const ItemFriend: React.FC<IFirends> = (props) => {
  const { items ,navigation} = props
  const dispatch = useDispatch()
  const renderImage = useMemo(() => {
    if (items?.imgPath) {
      return <Image
        source={{ uri: items.imgPath }}
        style={styles.imgFriend}
      />
    }
    return <Image
      source={require("../../assets/users/user-3.jpg")}
      style={{
        width: 56,
        height: 56,
        borderRadius: 28,
      }}
    />
  }, [items])
     const _onPressFriends = useCallback(()=>{
     return dispatch(createRoomChatAction({id:items.uid,navigation}))
    },[dispatch,navigation,items])

  return (
    <TouchableComponent
      style={styles.viewFriend}
      onPress={_onPressFriends}
    >
      {renderImage}
    </TouchableComponent>
  );
}

const ItemMessenger: React.FC<IMessenger> = (props) => {
  const { items, navigation } = props;
    const message = items.messages.length ? items.messages[items.messages.length - 1] : null
    const lastTimeText = items.unreadCount > 0 ? '' : (message ? '     ' + moment(message.createdAt).fromNow() : '')
    const _navigationChatDetail = useCallback(() => {
 return   navigation.navigate("ChatDetail", { item: items });
  }, [navigation,items]);
  const statusOnline = useMemo(() => {
    if (items.fromUser.isOnline) {
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
        <Image source={{uri:items.fromUser.photoUrl}} style={styles.imgUser} />
        <View style={statusOnline} />
      </View>
      <View style={styles.userInfoRight}>
        <View style={styles.userInfoText}>
          <Text style={styles.textUsername}>{items.fromUser.username}</Text>
          <Text style={styles.textTimeMess}>{items.messageTime}</Text>
        </View>
        <View>
          <Text style={styles.userMessengerEnd}>{ message
                  ? (message.text + lastTimeText)
                  : ""}</Text>
        </View>
     {items.unreadCount>0 && <View style={styles.countMessenger}>
          <Text style={styles.textNumberMess}>{items.unreadCount}</Text>
        </View>}
  </View>
    </TouchableComponent>
  );
};
const ChatScreen: React.FC<IBaseProps> = (props) => {
  const { navigation } = props;
  const [t] = useTranslation();
  const [searchText, setSearchText] = useState<string>();
  const [listUser, setListUser] = useState<Array<IUser>>()
  const [listChatRoom, setListChatRoom] = useState<Array<any>>()
  const [update, forceUpdate] = useState(false)


  const [roomChatWithIndexs, setRoomChatWithIndexs] = useState(null)

  const userInfor = useSelector(SGetUserInfor)
  const friendsRef = firestore().collection(COLLECTION.User);
  const chatRoomRef = firestore().collection(COLLECTION.ChatRoom);

  useEffect(() => {
    const unsubscribe = friendsRef
      .where("uid", "!=", userInfor?.getIn(["uid"]))
      .onSnapshot((querySnapshot) => {
        var tempUser = []
        querySnapshot.forEach((e) => {
          console.log("====e", e)
          tempUser.push(e.data())
        })
        console.log("====", tempUser)
        setListUser(tempUser)
      });
    return () => unsubscribe();
  }, [])

  useEffect(()=>{
     const unsubscribe = chatRoomRef.where("deletedAt", "==", null)
      .where("listIdUser", "array-contains", userInfor?.getIn(["uid"]))
      .onSnapshot((querySnapshot) => {
        // var tempChatRoom = []
        // querySnapshot.forEach((e) => {
        //   tempChatRoom.push(e.data())
        // })
        // setListChatRoom(tempChatRoom)
        if(!querySnapshot.empty){
              const roomChatWithIndex = {}
        querySnapshot.forEach((r) => {
         let ids =  r.data().id.split("-").filter(e => e!= userInfor.get("uid") )
          roomChatWithIndex[ids] = { ...r.data(), documentId: r.id }
        })
        if (Object.keys(roomChatWithIndex).length) {
          console.log("====== dd",roomChatWithIndex)
          handleFetchTutor(roomChatWithIndex)
        }
        }else{
          setListChatRoom([])
        }
      });
        const messageRef = firestore().collection(COLLECTION.Messenger)
     const messageUnSubcribe = messageRef.onSnapshot((snapshot) => {
         forceUpdate((update) => !update)
      })
     return () => {
      unsubscribe()
      messageUnSubcribe()
    }
  },[])

   useEffect(() => {
    if (roomChatWithIndexs) {
      handleFetchTutor(roomChatWithIndexs)
  
    }
  }, [update])
    const handleFetchTutor = async (roomChatWithIndex) => {
    // only get user info of tutor
    // chunk handle userids by 10 items
    const userIds = Object.keys(roomChatWithIndex)
    console.log("=====userIds",userIds)
    const userChunkIds = []
    while (userIds.length > 0) {
      userChunkIds.push(userIds.splice(0, 10))
    }

    console.log("chunk ===",userChunkIds)
    for (let i = 0; i < userChunkIds.length; i++) {
      const userList = await firestore()
        .collection(COLLECTION.User)
        .where("uid", "in", userChunkIds[i])
        .get()
      const roomIds = userChunkIds[i].map((userId) => roomChatWithIndex[userId].id)
      const chatRoomMessageWithIndex = await handleFetchChatRoomMessages(roomIds)
      for (const t of userList.docs) {
        const room = roomChatWithIndex[t.data().uid]
        const messages = chatRoomMessageWithIndex[room.id] || []
        messages.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : a.createdAt === b.createdAt ? 0 : -1,
        )
        // console.log("mess",messages)
                const unreadCount = messages.filter((m) => m.from!= userInfor.get("uid") &&!m.isSeen).length
        const lastMessages = messages.length ? [messages[0]] : []
        const inforUser = {
          ...t.data(),
          imgPath: t.data().imgPath,
          username: t.data().username,
          isOnline: t.data().isOnline,
          offlineAt: t.data().offlineAt,
        }
        roomChatWithIndex[t.data().uid] = { ...room, inforUser, unreadCount, lastMessages }
      }
    }

    console.log("offlineAt",roomChatWithIndex)

    handleSetRoomChat(Object.values(roomChatWithIndex))
    setRoomChatWithIndexs(roomChatWithIndex)
  }


  const handleSetRoomChat = (rooms?) => {
    console.log("===== rooms",rooms)
    const roomChats = rooms.map((r) => ({
      id: r.id,
      fromUser: {
        id: r.uid,
        photoUrl: r.inforUser && r.inforUser.imgPath,
        username: r.inforUser && r.inforUser.username,
        classes: "", //fake data
        rating: 4, //fake data
        occupation: "", //fake data
        isOnline: r.inforUser.isOnline,
        offlineAt: r.inforUser.offlineAt,
      },
      messages: r.lastMessages,
      unreadCount: r.unreadCount,
    }))
    console.log("roomChats",roomChats)
    setListChatRoom(roomChats)
    
  
}
   const handleFetchChatRoomMessages = async (roomIds) => {
    const messageDocs = await firestore()
      .collection(COLLECTION.Messenger)
      .where("chatRoomId", "in", roomIds)
      .get()
    const chatRoomMessageWithIndex = {}
    for (const m of messageDocs.docs) {
      const mess = m.data()
      const messages = chatRoomMessageWithIndex[mess.chatRoomId] || []
      console.log("messages",mess.chatRoomId)
      messages.push({
        chatRoomId: mess.chatRoomId,
        isSeen: mess.isSeen,
        text: mess.text.length > 30 ? mess.text.substr(0, 25) + "..." : mess.text,
        from: mess.from,
        createdAt: mess.createdAt,
      })
      chatRoomMessageWithIndex[mess.chatRoomId] = messages
    }
    console.log("chatrootts",chatRoomMessageWithIndex)
    return chatRoomMessageWithIndex
  }

  const renderItemMessenger = useCallback(({ item, index }) => {
    return <ItemMessenger items={item} navigation={navigation} />;
  }, []);


  const renderItemFriends = useCallback(({ item, index }) => {
    return <ItemFriend items={item} navigation={navigation}></ItemFriend>
  }, [])
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
      <ImageBackground
        source={require("../../assets/users/user-3.jpg")}
        style={{ flex: 1, height: "100%" }}
        resizeMode='cover'
      >
        <SearchInput
          icon={ic_search}
          placeholder='Search conventions'
          value={searchText}
          onChangText={_onChangTextSearch}
          onClearInput={_onClearInput}
        />
        <View style={{ marginHorizontal: 10 }}>
          <Text style={[styles.textTitle, { color: Colors.white }]}>
            Friends
          </Text>
          <FlatList
            data={listUser || []}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={_keyExtrator}
            renderItem={renderItemFriends}
            contentContainerStyle={{ marginTop: 10 }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={[styles.textTitle, { marginLeft: 10 }]}>Chating</Text>
          <FlatList
            data={listChatRoom || []}
            keyExtractor={_keyExtrator}
            renderItem={renderItemMessenger}
            ListFooterComponent={() => {
              return <View style={{ height: 200 }}></View>
            }}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default ChatScreen;
