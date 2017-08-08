import { StyleSheet } from 'react-native';
import { MAIN_BG_COLOR } from './ColorScheme'

export default StyleSheet.create({
    logo:{
      resizeMode: 'contain',
      height: 45,
      backgroundColor: 'transparent'
    },
    bg:{
      backgroundColor: '#FFFFFF', //Black
    },
    centering: {
      flex: 2,
    },
    wrapper:{
        flex: 1,
        backgroundColor: '#FFFFFF', //Black
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
        color: '#000000',
        fontSize: 20,
        alignItems: 'center',
        fontFamily:'monospace'
    },
})
