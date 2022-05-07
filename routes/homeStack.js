import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../screens/home';
import Results from '../screens/results';
import Track from '../screens/track';
import PlanView from '../screens/planView';
import UpdateMeasurements from '../screens/updateMeasurements';
import Login from '../screens/login';
import NewMeasurementsForm from '../screens/newMsrmntsForm';
import Signup from '../screens/signup';
import History from '../screens/history';
import Shop from '../screens/shop';
import BuySucceed from '../screens/buySucceed';

const screens = {
    Signup: {
        screen: Signup
    },
    Login: {
        screen: Login
    },
    Home: {
        screen: Home,
    },
    Results: {
        screen: Results,
    },
    Track: {
        screen: Track,
    },
    PlanView: {
        screen: PlanView,
    },
    UpdateMeasurements: {
        screen: UpdateMeasurements,
    },
    NewMeasurementsForm: {
        screen: NewMeasurementsForm,
    },
    History: {
        screen: History
    },
    Shop: {
        screen: Shop
    },
    BuySucceed: {
        screen: BuySucceed
    }
    
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack); 