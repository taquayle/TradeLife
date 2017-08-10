import {observable } from "mobx";

class  StockDataStore{

  @observable data = {}


  exists(){
    return this.profileExists;
  }

  /****************************************************************************/
  getData(){
    return this.data
  }

  setData(objArray){
    this.data = objArray
  }

}

var StockData = new StockDataStore()

export default StockData
