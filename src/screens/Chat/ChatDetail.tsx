import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Image, SafeAreaView, StyleSheet, Platform } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from "react-native-vector-icons/Feather"
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth"

import styles from "./Styles";
import { back } from "../../assets";
import Colors from "../../utils/colors"
import Header from "../../components/Header"
import { IBaseProps } from "../../utils/interface";
import TouchableComponent from "../../components/Button"
import { COLLECTION } from "../../utils/constant";

const ChatDetail: React.FC<IBaseProps> = (props) => {
  const { route, navigation } = props
  const conventions = route?.params.item||route
  const { item } = route?.params
  const [messages, setMessages] = useState<Array<any>>();
  const uid = auth().currentUser.uid
   useEffect(() => {
    let unsubcribe = () => {}
    const messageRef = firestore().collection(COLLECTION.Messenger)
    unsubcribe = messageRef.where("chatRoomId", "==", item.id).onSnapshot((mgsSnapShots) => {
      if (mgsSnapShots) {
        const messageList = []
        for (const message of mgsSnapShots.docs) {
          const mess = message.data()
          console.log("=== mess data",message.data())
          messageList.push({
            _id: mess.id,
            docId: message.id,
            isSeen: mess.isSeen,
            from: mess.from,
            text: mess.text,
            createdAt: mess.createdAt,
            sent: true,
            user: {
              _id: mess.from,
              name: mess.username,
              avatar: mess.from === uid ? "" : conventions.fromUser.photoUrl,
            },
          })
        }
        messageList.sort((a, b) =>
          a.createdAt < b.createdAt ? 1 : a.createdAt === b.createdAt ? 0 : -1,
        )
        setMessages(messageList)
        handleUpdateSeenMessage(messageList)
      }
    })
    return () => {
      unsubcribe()
    }
  }, [])


  // useEffect(() => {
  //   console.log("route",conventions)
  //   setMessages([
  //     {
  //       _id: 1,
  //       // text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //                  image: 'https://placeimg.com/140/140/any',

  //     },
  //     {
  //       _id: 2,
  //       text: 'Hello world',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ]);
  // }, []);

  const _onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleUpdateSeenMessage = (messageList) => {
    const unSeenMessages = messageList.filter((m) => m.from !== uid && !m.isSeen)
    if (!unSeenMessages.length) return
    const batch = firestore().batch()
    unSeenMessages.forEach((m) => {
      const messageRef = firestore().collection(COLLECTION.Messenger).doc(m.docId)
      batch.update(messageRef, { isSeen: true })
    })
    batch.commit()
  }
const handleSendMessage = useCallback((messageSend = []) => {
    const message = messageSend[0]
    const newMessage = {
      _id: message._id,
      createdAt: new Date().getTime(),
      text: message.text,
      isSeen: false,
      sent: false,
      user: {
        _id: uid,
        name: conventions.fromUser.username,
        avatar: "",
      },
    }
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage))
    handleSaveMessage(message, newMessage)
  }, [])

  const handleSaveMessage = (message, newMessage) => {
    const messageRef = firestore().collection(COLLECTION.Messenger)
    messageRef
      .add({
        id: message._id,
        createdAt: newMessage.createdAt,
        text: message.text,
        isSeen: false,
        from: uid,
        chatRoomId: conventions.id,
      })
      .then((response) => {
        setMessages((previousMessages) => {
          const indexNewMessage = previousMessages.findIndex((m) => m._id === newMessage._id)
          previousMessages[indexNewMessage] = { ...newMessage, sent: true }
          const lastMessage = previousMessages.shift()
          return GiftedChat.append(previousMessages, lastMessage)
        })
      })
      .catch((error) => {
        setMessages((previousMessages) => {
          previousMessages = previousMessages.filter((m) => m._id !== newMessage._id)
          const lastMessage = previousMessages.shift()
          return GiftedChat.append(previousMessages, lastMessage)
        })
      })
  }
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  }
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };
  const scrollToBottomComponent = () => {
    return (
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <View style={styles.container}>
      <Header
        backgroundColor={Colors.white}
        headerLeft={
          <TouchableComponent onPress={_onBack}>
            <Image source={back} style={{ width: 30, height: 15 }} />
          </TouchableComponent>
        }
        titleStyle={{
          fontSize: 17,
          fontWeight: "bold",
          color: Colors.black,
        }}
        title={conventions?.fromUser?.username}
      />
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => handleSendMessage(messages)}
          user={{
            _id: uid,
            name:"Dat"
          }}
          
          renderBubble={renderBubble}
          alwaysShowSend
          renderSend={renderSend}
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
          isCustomViewBottom
                  renderActions={() => (
         <Feather
            
            onPress={_=>{}}
            name='image'
            size={30}
            color='#000'
          />
        )}
        />
      </View>
    </View>
  );
};


export default ChatDetail;
