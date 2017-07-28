import {observable } from "mobx";

class  UserStore{

  @observable userName = ""
  @observable desc_key = []

  getDescKeys(){
    return this.userName;
  }

  setDescKeys(keys){
    this.userName = name;
  }
}

var store = new UserStore()

export default store
