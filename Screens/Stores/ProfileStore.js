import {observable } from "mobx";

class  ProfileStore{

  @observable userName = ""
  @observable profileExists = false;
  @observable desc_key = {}
  @observable cate_key = {}
  @observable user_key = {}
  @observable cap_stocks = {}
  @observable disruptive_stocks = {}
  @observable sector = {}

  setProfile(profile){
    this.setDescKeys(profile['Desc_Keywords']);
    this.setCateKeys(profile['Cate_Keywords']);
    this.setUserKeys(profile['User_Keywords']);
    this.setCapStocks(profile['Target_Companies']['Cap']);
    this.setDisruptiveStocks(profile['Target_Companies']['Disruptive']);
    this.setTargetSectors(profile['Target_Sectors']['Sectors']);
    this.profileExists = true;
  }
  exists(){
    return this.profileExists;
  }

  /****************************************************************************/
  getUserKeys(){
    return this.user_key
  }

  setUserKeys(objArray){
    this.user_key = objArray
  }
  /****************************************************************************/

  /****************************************************************************/
  getDescKeys(){
    return this.desc_key;
  }

  setDescKeys(objArray){
    this.desc_key = objArray
  }
  /****************************************************************************/

  /****************************************************************************/
  getCateKeys(){
    return this.cate_key;
  }

  setCateKeys(objArray){
    this.cate_key = objArray
  }
  /****************************************************************************/

  /****************************************************************************/
  getCapStocks(){
    return this.cap_stocks;
  }

  setCapStocks(objArray){
    this.cap_stocks = objArray
  }
  /****************************************************************************/

  /****************************************************************************/
  getDisruptiveStocks(){
    return this.disruptive_stocks
  }

  setDisruptiveStocks(objArray){
    this.disruptive_stocks = objArray
  }
  /****************************************************************************/

  /****************************************************************************/
  setTargetSectors(objArray){
    this.sector = objArray;
  }

  getTargetSectors(){
    return this.sector
  }
  /****************************************************************************/
}

var Profile = new ProfileStore()

export default Profile
