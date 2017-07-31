import {observable } from "mobx";

class  TradeLifeStore{

  @observable loginURL = "http://192.168.33.10/login"
  @observable profileURL = "http://192.168.33.10/profile"
  getLoginURL(){
    return this.loginURL
  }

  getProfileURL(){
    return this.profileURL
  }
}

var TradeLife = new TradeLifeStore()

export default TradeLife
