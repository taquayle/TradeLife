/*
Author: Tyler Quayle
Date: August 21st, 2017
File: Tradelife/Screens/Stores/NavigationStore
Dsec: Handles all the nav settings
*/
import {observable } from "mobx";

class  NavigationStore{

  @observable sectorPref = 0  //Used to select which sector too look at
  @observable tailorPref = 0 // Used to select the prefered tailored stock
  @observable transPut = false;
  @observable transGet = false;
  @observable error = ''


  reset(){
    this.sectorPref = 0;
    this.tailorPref = 0;
    this.transPut = false;
    this.transGet = false;
    this.error = '';
  }
  /****************************************************************************/
  setSectorPref(sectorNum){ this.sectorPref = sectorNum}

  getSectorPref(){  return this.sectorPref}
  /****************************************************************************/

  /****************************************************************************/
  setTailorPref(tailorNum){ this.tailorPref = tailorNum}

  getTailorPref(){  return this.tailorPref}
  /****************************************************************************/

  /****************************************************************************/
  setTransPut(error){  this.transPut = error}

  getTransPut(){  return this.transPut}
  /****************************************************************************/

  /****************************************************************************/
  setTransGet(error){  this.transGet = error}

  getTransGet(){  return this.transGet}
  /****************************************************************************/

  /****************************************************************************/
  setError(error){  this.error = error}

  getError(){  return this.error}
  /****************************************************************************/

}

var Nav = new NavigationStore()

export default Nav
