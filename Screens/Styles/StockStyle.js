import { StyleSheet} from 'react-native'
import { MAIN_BG_COLOR, MAIN_TEXT_COLOR, MAIN_FONT_FAMILY } from './Attributes'

export default StyleSheet.create({
    wrapper:{
      flex: 1,
      backgroundColor: MAIN_BG_COLOR,
    },
    topWrap:{
      flex:.15,
      backgroundColor:"#FFFFFF",
      justifyContent: 'center',
      alignItems: 'center'
    },
    botWrap:{
      flex:1,
      backgroundColor: MAIN_BG_COLOR,
    },

    profitWrap:{
      height: 62,
      borderColor: MAIN_BG_COLOR,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      flexDirection:'row',
      justifyContent: 'center'
    },
    profitLeft:{
      flex:.5,
      borderColor: MAIN_BG_COLOR,
      borderRightWidth: 1,
    },
    profitRight:{
      flex:.5,
      borderColor: MAIN_BG_COLOR,
      borderLeftWidth: 1,
    },

    genericWrap:{
      flex: 1
    },
    headerWrap:{
      height: 70,
      borderColor: MAIN_BG_COLOR,
      borderBottomWidth: 2,
    },
    keywordWrap:{
      flex:1,
      borderColor: MAIN_BG_COLOR,
      borderTopWidth: 1,
      borderBottomWidth: 2,
      borderLeftWidth: 1,
      borderRightWidth: 1,
    },
    graphWrap:{
      height: 250,
      borderColor: MAIN_BG_COLOR,
      borderWidth: 2,
      justifyContent: 'center'
    },
})

// Before this push, used 2 seperate layouts. combined them into 1
// sectorStyle = StyleSheet.create({
//     wrapper:{
//       flex: 1,
//       backgroundColor: MAIN_BG_COLOR,
//     },
//     topWrap:{
//       flex:.15,
//       backgroundColor:"#FFFFFF",
//       justifyContent: 'center',
//       alignItems: 'center'
//     },
//     botWrap:{
//       flex:1,
//       backgroundColor: MAIN_BG_COLOR,
//     },
//
//     profitWrap:{
//       height: 62,
//       borderColor: MAIN_BG_COLOR,
//       borderTopWidth: 1,
//       borderBottomWidth: 1,
//       borderLeftWidth: 2,
//       borderRightWidth: 2,
//       flexDirection:'row',
//       justifyContent: 'center'
//     },
//     profitLeft:{
//       flex:.5,
//       borderColor: MAIN_BG_COLOR,
//       borderRightWidth: 1,
//     },
//     profitRight:{
//       flex:.5,
//       borderColor: MAIN_BG_COLOR,
//       borderLeftWidth: 1,
//     },
//
//     genericWrap:{
//       flex: 1
//     },
//     headerWrap:{
//       height: 70,
//       borderColor: MAIN_BG_COLOR,
//       borderBottomWidth: 2,
//     },
//
//     graphWrap:{
//       height: 250,
//       borderColor: MAIN_BG_COLOR,
//       borderWidth: 2,
//       justifyContent: 'center'
//     },
// })
