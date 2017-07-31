import {observable } from "mobx";

class  UserStore{

  @observable userName = "sbMemtaquayle1"
  @observable userPass = "Password"
  @observable tradeToken = ""
  @observable yodleeToken = ""
  @observable sectorPref = 0
  @observable error = ""

  getUserName(){
    return this.userName;
  }

  setUserName(name){
    this.userName = name;
  }

  setUserPass(pass){
    this.userPass = pass
  }

  getUserPass(){
    return this.userPass
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

  setError(error){
    this.error = error
  }

  getError(error){
    return this.error
  }

}

var User = new UserStore()

export default User
