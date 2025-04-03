This is list of features and options

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## User Option: KeepMeLoggedIn

Function **userLogin()** has logic to store user session for some period of time depending if KeepMeLoggedIn is true or false.

> **Note**: KeepMeLoggedIn:

-   True: Session will last until user logout or app uninstalled
-   False: Session will last 1 hour

> **Note**: Async storage is used to keep session data by using Items: userId and sessionExpiry

```bash
    if (keepMeLoggedIn) {
        await AsyncStorage.setItem('userId', user.id);
        await AsyncStorage.removeItem('sessionExpiry');
    } else {
        const expiryTime = Date.now() + 60 * 60 * 1000;
        await AsyncStorage.setItem('userId', user.id);
        await AsyncStorage.setItem('sessionExpiry', expiryTime.toString());
    }
```
