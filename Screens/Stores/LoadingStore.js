import {observable } from "mobx";

class  UserStore{

  @observable userName = ""
  @observable tradeToken = ""
  @observable yodleeToken = ""
  @observable sectorPref = 0

  getUserName(){
    return this.userName;
  }
}

var User = new UserStore()

export default User
