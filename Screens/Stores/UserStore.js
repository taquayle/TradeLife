import {observable } from "mobx";

class  UserStore{

  @observable userName = ""
  @observable tradeToken = ""
  @observable yodleeToken = ""
  @observable profile = ""

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

  setProfile(profile){
    this.profile = profile;
  }

  getProfile(){
    return this.profile;
  }

}

var store = new UserStore()

export default store
