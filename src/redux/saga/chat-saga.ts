import {
    createRoomChatAction
} from "../action/chat-action";
import { fork, call, takeLatest, put, delay } from "redux-saga/effects";
import Snackbar from "react-native-snackbar";
import {
    handleFindRoomChat
} from "../../api/chat-api";


function* sCreateRoomChat (action?:any){
    const {id,navigation} = action.payload
    console.log("===id",id)
    try {
        const result = yield call (handleFindRoomChat,id)
        if(result){
            console.log("====reslut",result)
        }
    } catch (err) {
        Snackbar.show({
          text: err.message,
          duration: 2000,
        });
    }
}

function* listener(action?: any) {
    yield takeLatest(createRoomChatAction.type,sCreateRoomChat)
}

function* worker(action?: any) {}
export default function* chatSaga(action?: any) {
  yield fork(listener);
  yield fork(worker);
}
