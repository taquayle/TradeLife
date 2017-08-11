import { StyleSheet } from 'react-native';
import { MAIN_BG_COLOR, MAIN_TEXT_COLOR } from './ColorScheme'

export default StyleSheet.create({

  wrapper:{
      flex: 1,
      backgroundColor:MAIN_BG_COLOR
  },
  header:{
    flex: .1,
    flexDirection:'row',
    justifyContent: 'center'
  },
  topWrap:{
    flex:.2,
    backgroundColor:MAIN_BG_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  botWrap:{
    flex:.7,
    backgroundColor:MAIN_BG_COLOR
  },

  title:{
    color: MAIN_TEXT_COLOR,
    textAlign: 'center',
    fontFamily:'monospace',
    fontSize: 30
  },
  h1:{
    color: MAIN_TEXT_COLOR,
    textAlign: 'center',
    fontFamily:'monospace',
    fontSize: 20
  },
  h2:{
    color: MAIN_TEXT_COLOR,
    textAlign: 'center',
    fontFamily:'monospace',
    fontSize: 16
  },
  body:{
    color: MAIN_TEXT_COLOR,
    fontFamily:'monospace',
    fontSize: 12
  },


  wrap:{},
  listContainer: {
    width: 300,
  },
  titleWrap:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center'
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

  text:{
      color: '#000000',
      fontSize: 15,
  },
  logo:{
    resizeMode: 'contain',
    height: 30,
    width: 220,
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
