import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/Splash'
import Main from '../screens/MainScreen'
import CreateNote from '../screens/CreateNote'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import ForgotPassword from '../screens/ForgotPassword'
import { TouchableOpacity,Button } from 'react-native'

const Stack = createNativeStackNavigator()

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash'>
                <Stack.Screen
                    name='Splash'
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Login'
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Signup'
                    component={SignUp}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='ForgotPassword'
                    component={ForgotPassword}
                    options={{
                        title: 'Forgot Password',
                        headerTitleAlign: 'center',
                        headerRight: () => (
                            <Button
                                onPress={() => alert('This is a button!')}
                                title="Info"
                                color="#fff"
                            />
                        )
                    }}
                />
                <Stack.Screen
                    name='Main'
                    component={Main}
                    options={{ title: 'Note List', headerTitleAlign: 'center' }}
                />
                <Stack.Screen
                    name='CreateNote'
                    component={CreateNote}
                    options={{ title: 'Add & Edit Note', headerTitleAlign: 'center' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation
