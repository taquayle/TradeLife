import { StyleSheet } from 'react-native';
import { MAIN_BG_COLOR } from './ColorScheme'

export default StyleSheet.create({
      wrapper:{
          flex: 1,
          backgroundColor:MAIN_BG_COLOR
      },
      listContainer: {
      width: 300,
      },
      topWrap:{
        flex:.35,
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
        backgroundColor: 'transparent'
      },
})
