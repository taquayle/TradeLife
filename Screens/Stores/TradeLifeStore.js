import {observable } from "mobx";

class  TradeLifeStore{



  // HOUSE-SITTING
  @observable ipAddr = "http://192.168.11.7:8080/"
  // LOCAL
  //@observable ipAddr = "http://192.168.33.10/"
  //PUBLIC
  //@observable ipAddr = "http://172.16.42.26:8080/"

  @observable login_URL =   this.ipAddr + "login"
  @observable profile_Put_URL = this.ipAddr + "profile/put"
  @observable profile_Get_URL = this.ipAddr + "profile/get"
  @observable stocks_Get_URL =  this.ipAddr + "stocks/get"
  @observable profile_Post_URL = this.ipAddr + "profile/post"
  @observable register_Put_URL = this.ipAddr + "register"
  @observable transaction_Put_URL = this.ipAddr + "transaction"


  loginURL(){ return this.login_URL}
  profileGetURL(){  return this.profile_Get_URL}
  profilePutURL(){  return this.profile_Put_URL}
  profilePostURL(){ return this.profile_Post_URL}
  stocksGetURL(){   return this.stocks_Get_URL }
  registerPutURL(){ return this.register_Put_URL }
  transactionPutURL() { return this.transaction_Put_URL }
}

var TradeLife = new TradeLifeStore()

export default TradeLife
