export   interface IUser {
    email: string,
    password: string,
    gmail: string,
    id:string,
    phoneNumber: string,
    imgPath?:string,
    address: string,
    isAdmin: number,
    createAt: string,
    updateAt: string,
    deleteAt: string,
    isOnline: boolean,
    deviceToken : Array<any>,
    isAccept: number
    uid:string
}

export  enum EAdmin {
  ADMIN = 1,
  NORMAL = 0
}

export   enum EAccept {
  ACCEPT =  1,
  WAITTING  = 0
}