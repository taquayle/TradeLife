import { StyleSheet } from 'react-native';
import { MAIN_BG_COLOR } from './ColorScheme'

export default StyleSheet.create({
  header:{
    flex: .10,
    flexDirection:'row',
    alignItems:'center'
  },
  temp:{
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor:MAIN_BG_COLOR
  },
  wrapper:{
      flex: 1,
      backgroundColor:MAIN_BG_COLOR
  },
  wrap:{},
  listContainer: {
    width: 300,
  },


  topWrap:{
    flex:.25,
    backgroundColor:MAIN_BG_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleWrap:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  botWrap:{
    flex:.65,
    backgroundColor:MAIN_BG_COLOR
  },
  graphWrap:{
    flex: .75
  },
  listWrap:{
    flex: .25
  },
  formWrapper:{
     alignItems: 'center'
  },
  buttonWrap:{
    flex:.5,
    flexDirection:'row'
  },
  title:{
      color: '#000000',
      fontSize: 30,
  },
  text:{
      color: '#000000',
      fontSize: 15,
  },
  logo:{
    resizeMode: 'contain',
    height: 45,
    backgroundColor: 'transparent',
  },
  pseudoCard:{
    flex: 1,
    borderLeftWidth: 10,
    borderRightWidth:10,
    borderBottomWidth: 2,
    borderTopWidth: 10,
  },
})
