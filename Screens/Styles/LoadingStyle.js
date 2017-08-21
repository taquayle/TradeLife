/*
Author: Tyler Quayle
Date: August 2nd, 2017
File: Tradelife/Screens/Styles/LoadingStyle
Dsec: Contains the stylesheet for the 'loading' screens, which contain the
      logic for contacting the server
*/
import { StyleSheet , BackHandler} from 'react-native'
import { MAIN_BG_COLOR, MAIN_TEXT_COLOR } from './Attributes'

export default StyleSheet.create({
    logo:{
      resizeMode: 'contain',
      height: 45,
      backgroundColor: 'transparent'
    },
    bg:{
      backgroundColor:  MAIN_BG_COLOR,
    },
    centering: {
      flex: 2,
    },
    wrapper:{
        flex: 1,
        backgroundColor: MAIN_BG_COLOR,
    },
    topWrap:{
        flex: 1,
        alignItems:'center'
    },
    midWrap:{
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activityWrap:{
      flex: 2,
    },
    textWrap:{
      flex:2,
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    bottomBuffer:{
        flex: 2,
    },
    loadingText:{
        color: MAIN_TEXT_COLOR,
        fontSize: 20,
        alignItems: 'center',
        fontFamily:'monospace'
    },
})
