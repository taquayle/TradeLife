import {observable } from "mobx";

class  UserStore{

  @observable userName = "sbMemtaquayle1"
  @observable userPass = "sbMemtaquayle1#123"
  @observable userMail = ""
  @observable tradeToken = ""
  @observable yodleeToken = ""
  @observable sectorPref = 0
  @observable error = ""
  @observable tempKeys = []

  signOut(){
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
