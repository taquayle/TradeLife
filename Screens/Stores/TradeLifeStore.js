import {observable } from "mobx";

class  TradeLifeStore{

  @observable login_URL = "http://172.16.42.26:8080/login"
  @observable profile_Put_URL = "http://172.16.42.26:8080/profile/put"
  @observable profile_Get_URL = "http://172.16.42.26:8080/profile/get"
  @observable profile_Post_URL = "http://172.16.42.26:8080/profile/post"

  loginURL(){
    return this.login_URL
  }

  profileGetURL(){
    return this.profile_Get_URL
  }

  profilePutURL(){
    return this.profile_Put_URL
  }

  profilePostURL(){
    return this.profile_Post_URL
  }
}

var TradeLife = new TradeLifeStore()

export default TradeLife
