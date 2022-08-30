import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/Splash'
import Main from '../screens/MainScreen'
import CreateNote from '../screens/CreateNote'

const Stack = createNativeStackNavigator()

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Splash'
                    component={Splash}
                    options={{ headerShown: false}}
                />
                <Stack.Screen
                    name='Main'
                    component={Main}
                    options={{title : 'Note List',headerTitleAlign : 'center'}}
                />
                <Stack.Screen
                    name='CreateNote'
                    component={CreateNote}
                    options={{title : 'Add & Edit Note',headerTitleAlign : 'center'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
