import {observable } from "mobx";

class  ProfileStore{

  @observable userName = ""
  @observable profileExists = false;
  @observable desc_key = null
  @observable keywords = null
  @observable cate_key = null
  @observable invest_date = null
  @observable user_key = null
  @observable cap_stocks = null
  @observable tailored_companies = null
  @observable disruptive_stocks = null
  @observable sector = null

  setProfile(profile){
    this.baseProfile(profile)
    //These can throw errors if []['this'] doesn't exsist yet
    this.setCapStocks(profile['Target_Companies']['Cap'])
    this.setDisruptiveStocks(profile['Target_Companies']['Disruptive'])
    this.setTargetSectors(profile['Target_Sectors']['Sectors'])
    this.setTailoredCompanies(profile['Tailored_Companies'])
    this.profileExists = true;
  }
  baseProfile(profile){
    this.setKeywords(profile['Keywords'])
    this.setDescKeys(profile['Desc_Keywords'])
    this.setCateKeys(profile['Cate_Keywords'])
    this.setUserKeys(profile['User_Keywords'])
    this.setInvestDate(profile['Invest_Date'])
  }

  signOut(){
    this.setKeywords(null)
    this.setDescKeys(null)
    this.setCateKeys(null)
    this.setUserKeys(null)
    this.setCapStocks(null)
    this.setDisruptiveStocks(null);
    this.setTargetSectors(null)
    this.setInvestDate(null)
    this.setTailoredCompanies(null)
    this.profileExists = false;
  }

  exists(){
    return this.profileExists;
  }

  /****************************************************************************/
  getKeywords(){
    return this.keywords
  }

  setKeywords(objArray){
    this.keywords = objArray
  }
  /****************************************************************************/

  /****************************************************************************/
  getTailoredCompanies(){
    return this.tailored_companies
  }

  setTailoredCompanies(objArray){
    this.tailored_companies = objArray
  }
  /****************************************************************************/


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
