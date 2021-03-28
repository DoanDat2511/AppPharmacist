import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { DIR_IMG_PREFIX, DIR_USER_AVATAR, COLLECTION } from "../utils/constant";


const handleFindRoomChat = async (id: string) => {
    let result

    const userCurrent = auth().currentUser?.uid
    const chatRoomRef = firestore().collection(COLLECTION.ChatRoom)
    await chatRoomRef
        .where("listIdUser", "array-contains", userCurrent)
        .get()
        .then(async (query) => {
            let temp 
             query.forEach(e => {
                 if(e.data()?.listIdUser.includes(id)){
                     temp =  e.data()
                 }
            })
            if (!temp) {
                result = await handleCreateChatRoom(id)
            } else {
                
                result=temp?.id
            }
        })
    return result
}

const handleCreateChatRoom = async (id: string) => {
    const userCurrentId = auth().currentUser?.uid
    const chatRoomId = userCurrentId + '-' + id
    const chatRoomRef = firestore().collection(COLLECTION.ChatRoom)
    await chatRoomRef
        .doc(chatRoomId)
        .set({
            listIdUser: [userCurrentId, id],
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null,
            type: 1,
            id: chatRoomId,
        })

    return chatRoomId
}


export {
    handleFindRoomChat
}