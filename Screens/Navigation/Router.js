import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements'
/******************************************************************************/
// SCREENS
import { SplashScreen } from '../Splash';
import { LoginScreen } from '../Login';
import { RegisterScreen } from '../Register';
import { HomeScreen } from '../Home';
import { ForgotScreen } from '../Forgot';
import { FastLink } from '../FastLink';
import { TransactionScreen } from '../Transactions'
import { ProfileStocksScreen } from '../Profile_Stocks';
import { ProfileKeywordsScreen } from '../Profile_Keywords';
import { KeywordsAddScreen } from '../Keywords_Add';
import { KeywordsUserScreen } from '../Keywords_User';
import { StocksScreen } from '../Stocks';

/******************************************************************************/
// LOADING SCREENS
import { LoginLoadingScreen } from '../Loading/LoginLoading'
import { RegisterLoadingScreen } from '../Loading/RegisterLoading'
import { ProfileLoadingScreen } from '../Loading/ProfileLoading'
import { KeywordAddLoadingScreen } from '../Loading/KeywordAddLoading'

/******************************************************************************/
// Routing table
export const Router = StackNavigator(
{
  Splash: {screen: SplashScreen},
  Login: { screen: LoginScreen },
  Register:{screen: RegisterScreen},
  Home: {screen: HomeScreen},
  Forgot: {screen: ForgotScreen},
  FastLink: {screen: FastLink},
  Transact: {screen: TransactionScreen},
  ProfileStocks: {screen: ProfileStocksScreen},
  ProfileKeywords: {screen: ProfileKeywordsScreen},
  KeywordsAdd: {screen: KeywordsAddScreen},
  KeywordsUser: {screen: KeywordsUserScreen},
  Stocks: { screen: StocksScreen },
  KeywordAddLoading: {screen: KeywordAddLoadingScreen},
  LoginLoading: {screen: LoginLoadingScreen},
  ProfileLoading: {screen: ProfileLoadingScreen},
  RegisterLoading: {screen: RegisterLoadingScreen},
},
navigationOptions =
{
  headerMode: 'none', //Get rid of headers
});

export const Drawer = DrawerNavigator({
  Splash: {
    screen: SplashScreen
  },
  Login: {
    screen: LoginScreen
  },
  Register:{
    screen: RegisterScreen},
  Home: {
    screen: HomeScreen
  },
  Forgot: {
    screen: ForgotScreen
  },
  FastLink: {
    screen: FastLink
  },
  Transact: {
    screen: TransactionScreen
  },
  ProfileStocks: {
    screen: ProfileStocksScreen
  },
  ProfileKeywords: {
    screen: ProfileKeywordsScreen
  },
  KeywordsAdd: {
    screen: KeywordsAddScreen
  },
  KeywordsUser: {
    screen: KeywordsUserScreen
  },
  Stocks: {
    screen: StocksScreen
  },
  KeywordAddLoading: {
    screen: KeywordAddLoadingScreen
  },
  LoginLoading: {
    screen: LoginLoadingScreen
  },
  ProfileLoading: {
    screen: ProfileLoadingScreen
  },
  RegisterLoading: {
    screen: RegisterLoadingScreen
  },
})

export const Tab = TabNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions:{
      tabBar:{
        label: 'Login',
        icon:({tintColor}) => <Icon name="list" />
      }
    }
  },
  Register:{
    screen: RegisterScreen,
    navigationOptions:{
      tabBar:{
        label: 'Register',
        icon:({tintColor}) => <Icon name="list" />
      }
    }
  },
  Home: {
    screen: HomeScreen,
    navigationOptions:{
      tabBar:{
        label: 'Home',
        icon:({tintColor}) => <Icon name="list" />
      }
    }
  },
  Forgot: {
    screen: ForgotScreen,
    navigationOptions:{
      tabBar:{
        label: 'Forgot',
        icon:({tintColor}) => <Icon name="list" />
      }
    }
  },
  FastLink: {
    screen: FastLink,
    navigationOptions:{
      tabBar:{
        label: 'FastLink',
        icon:({tintColor}) => <Icon name="list" />
      }
    }
  },
  Transact: {
    screen: TransactionScreen,
    navigationOptions:{
      tabBar:{
        label: 'Transactions',
        icon:({tintColor}) => <Icon name="list" />
      }
    }
  },
  ProfileStocks: {
    screen: ProfileStocksScreen,
    navigationOptions:{
      tabBar:{
        label: 'Stocks',
        icon:({tintColor}) => <Icon name="list" />
      }
    }
  },
  ProfileKeywords: {
    screen: ProfileKeywordsScreen,
    navigationOptions:{
      tabBar:{
        label: 'Keywords',
        icon:({tintColor}) => <Icon name="list" />
      }
    }
  },
  KeywordsAdd: {
    screen: KeywordsAddScreen,
    navigationOptions:{
      tabBar:{
        label: 'Add Keywords',
        icon:({tintColor}) => <Icon name="list" />
      }
    }
  },
  KeywordsUser: {
    screen: KeywordsUserScreen,
    navigationOptions:{
      tabBar:{
        label: 'User Keywords',
        icon:({tintColor}) => <Icon name="list" />
      }
    }
  },
  Stocks: {
    screen: StocksScreen,
    navigationOptions:{
      tabBar:{
        label: 'Stocks',
        icon:({tintColor}) => <Icon name="list" />
      }
    }
  },
})
