import {observable } from "mobx";

class  TradeLifeStore{
  // HOME
  // @observable login_URL = "http://192.168.1.102:8080/login"
  // @observable profile_Put_URL = "http://192.168.1.102:8080/profile/put"
  // @observable profile_Get_URL = "http://192.168.1.102:8080/profile/get"
  // @observable profile_Post_URL = "http://192.168.1.102:8080/profile/post"
  // @observable register_Put_URL = "http://192.168.1.102:8080/register"

  // LOCAL
  // @observable login_URL = "http://192.168.33.10/login"
  // @observable profile_Put_URL = "http://192.168.33.10/profile/put"
  // @observable profile_Get_URL = "http://192.168.33.10/profile/get"
  // @observable stocks_Get_URL = "http://192.168.33.10/stocks/get"
  // @observable profile_Post_URL = "http://192.168.33.10/profile/post"
  // @observable register_Put_URL = "http://192.168.33.10/register"

  // PUBLIC
  @observable login_URL = "http://172.16.42.26:8080/login"
  @observable profile_Put_URL = "http://172.16.42.26:8080/profile/put"
  @observable profile_Get_URL = "http://172.16.42.26:8080/profile/get"
  @observable stocks_Get_URL = "http://172.16.42.26:8080/stocks/get"
  @observable profile_Post_URL = "http://172.16.42.26:8080/profile/post"
  @observable register_Put_URL = "http://172.16.42.26:8080/register"

  loginURL(){ return this.login_URL}
  profileGetURL(){  return this.profile_Get_URL}
  profilePutURL(){  return this.profile_Put_URL}
  profilePostURL(){ return this.profile_Post_URL}
  stocksGetURL(){   return this.stocks_Get_URL }
  registerPutURL(){ return this.register_Put_URL }
}

var TradeLife = new TradeLifeStore()

export default TradeLife
