/*
Author: Tyler Quayle
Date: July 29th, 2017
File: Tradelife/Screens/Stores/TradeLifeStore
Dsec: Contains all routes for the different functions on the tradelife server
*/
import {observable } from "mobx";

class  TradeLifeStore{



  // HOUSE-SITTING
  //@observable ipAddr = "http://192.168.11.7:8080/"
  // LOCAL
  @observable ipAddr = "http://192.168.33.10/"
  //TECHCLIKS
  //@observable ipAddr = "http://172.16.42.26:8080/"

  @observable login_URL =             this.ipAddr + "login"
  @observable profile_Update_URL =    this.ipAddr + "profile/update"
  @observable profile_Retrieve_URL =  this.ipAddr + "profile/retrieve"
  @observable profile_Add_URL =       this.ipAddr + "profile/add"
  @observable stocks_Get_URL =        this.ipAddr + "stocks/get"

  @observable register_Put_URL =      this.ipAddr + "register"
  @observable transaction_Put_URL =   this.ipAddr + "transaction/update"
  @observable transaction_Get_URL =   this.ipAddr + "transaction/retrieve"
  @observable exchange_Get_URL =      this.ipAddr + "exchange/generate"
  @observable fastlink_URL =          this.ipAddr + "fastlink"


  loginURL(){ return this.login_URL}
  profileRetrieveURL(){  return this.profile_Retrieve_URL}
  profileUpdateURL(){  return this.profile_Update_URL}
  profileAddURL(){ return this.profile_Add_URL}
  stocksGetURL(){   return this.stocks_Get_URL }
  registerPutURL(){ return this.register_Put_URL }
  transactionPutURL() { return this.transaction_Put_URL }
  transactionGetURL() { return this.transaction_Get_URL }
  exchangeGetURL() { return this.exchange_Get_URL}
  fastLinkURL() { return this.fastlink_URL}
}

var TradeLife = new TradeLifeStore()

export default TradeLife
