import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/Splash'

const Stack = createNativeStackNavigator()

function Navigation() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                name='Splash' 
                component={Splash}
                options={{headerShown : false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
