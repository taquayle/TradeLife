import {observable } from "mobx";

class  ProfileStore{

  @observable userName = ""
  @observable profileExists = false;
  @observable desc_key = null
  @observable cate_key = null
  @observable invest_date = null
  @observable user_key = null
  @observable cap_stocks = null
  @observable disruptive_stocks = null
  @observable sector = null

  setProfile(profile){
    this.setDescKeys(profile['Desc_Keywords']);
    this.setCateKeys(profile['Cate_Keywords']);
    this.setUserKeys(profile['User_Keywords']);
    this.setCapStocks(profile['Target_Companies']['Cap']);
    this.setDisruptiveStocks(profile['Target_Companies']['Disruptive']);
    this.setTargetSectors(profile['Target_Sectors']['Sectors']);
    this.setInvestDate(profile['Invest_Date'])
    this.profileExists = true;
  }
  signOut(){
    this.setDescKeys({});
    this.setCateKeys({});
    this.setUserKeys({});
    this.setCapStocks({});
    this.setDisruptiveStocks({});
    this.setTargetSectors({});
    this.setInvestDate({})
    this.profileExists = false;
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
  setInvestDate(objArray){
    this.invest_date = objArray;
  }

  getInvestDate(){
    return this.invest_date
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
