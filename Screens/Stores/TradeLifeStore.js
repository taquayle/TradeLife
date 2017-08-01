import {observable } from "mobx";

class  TradeLifeStore{

  @observable loginURL = "http://172.16.42.26:8080/login"
  @observable profileURL = "http://172.16.42.26:8080/profile"
  getLoginURL(){
    return this.loginURL
  }

  getProfileURL(){
    return this.profileURL
  }
}

var TradeLife = new TradeLifeStore()

export default TradeLife
