/*
Author: Tyler Quayle
Date: July 25th, 2017
File: Tradelife/Screens/Stores/UserStore
Dsec: Handles all the user settings
*/
import {observable } from "mobx";

class  UserStore{

  @observable userName = "" //
  @observable userPass = "" //
  @observable userMail = ""
  @observable tradeToken = ""
  @observable yodleeToken = ""  //Obtained through the Yodelee Servers
  @observable sectorPref = 0  //Used to select which sector too look at
  @observable error = ""    // Used to display different errors
  @observable tempKeys = [] // Used for displaying keywords before submitted
                            // to Tradelife server

  signOut(){  //Signout of the application
    this.setName("")
    this.setPass("")
    this.setMail("")
    this.setTradeToken("")
    this.setYodleeToken("")
    this.setTempKeys([])
  }
  /****************************************************************************/
  getName(){ return this.userName;}

  setName(name){ this.userName = name;}
  /****************************************************************************/

  /****************************************************************************/
  setPass(pass){ this.userPass = pass}

  getPass(){ return this.userPass}
  /****************************************************************************/

  /****************************************************************************/
  getYodleeToken(){ return this.yodleeToken}

  setYodleeToken(token){ this.yodleeToken = token;}
  /****************************************************************************/

  /****************************************************************************/
  getTradeToken(){ return this.tradeToken;}

  setTradeToken(token){ this.tradeToken = token;}
  /****************************************************************************/

  /****************************************************************************/
  setSectorPref(sectorNum){ this.sectorPref = sectorNum}

  getSectorPref(){  return this.sectorPref}
  /****************************************************************************/

  /****************************************************************************/
  setError(error){  this.error = error}

  getError(error){  return this.error}
  /****************************************************************************/

  /****************************************************************************/
  setMail(email){ this.userMail = email}

  getMail(){ return this.userMail}
  /****************************************************************************/

  /****************************************************************************/
  setTempKeys(arrObj){ this.tempKeys = arrObj}

  getTempKeys(){ return this.tempKeys}
  /****************************************************************************/
}

var User = new UserStore()

export default User
