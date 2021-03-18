import React , {useState ,useEffect ,useCallback}from "react";
import { View, ScrollView,Text, SafeAreaView, StyleSheet ,Platform} from "react-native";
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import styles from "./Styles";
import Colors from "../../utils/colors"
import Header from "../../components/Header"
import { IBaseProps } from "../../utils/interface";
import { ic_back } from "../../assets";

const ChatDetail: React.FC<IBaseProps> = (props) => {
  const {route ,navigation} = props
  const {item} = route?.params
  const [messages, setMessages] = useState<Array<any>>();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);
  const _onBack = useCallback(()=>{
    navigation.pop()
  },[navigation])
    const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
    const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
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
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  return (
    <View style={styles.container}>
      <Header
        btnIconLeft={ic_back}
        onBack={_onBack}
        backgroundColor={Colors.BLUE_OPACITY}
        title={item?.userName}
      />
     <View style={{flex:1}}>
        <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}

    />
     </View>
    </View>
  );
};


export default ChatDetail;