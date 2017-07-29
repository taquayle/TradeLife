import {observable } from "mobx";

class  UserStore{

  @observable userName = ""
  @observable tradeToken = ""
  @observable yodleeToken = ""
  @observable sectorPref = 0

  getUserName(){
    return this.userName;
  }

  setUserName(name){
    this.userName = name;
  }

  getYodleeToken(){
    return this.yodleeToken;
  }

  setYodleeToken(token){
    this.yodleeToken = token;
  }

  getTradeToken(){
    return this.tradeToken;
  }

  setTradeToken(token){
    this.tradeToken = token;
  }

  setSectorPref(sectorNum){
    this.sectorPref = sectorNum
  }
  getSectorPref(){
    return this.sectorPref
  }
}

var User = new UserStore()

export default User
