import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class AuthLoading extends Component {
    render () {
        return(
            <View style={styles.container}>
                <Text>AuthLoading</Text>
            </View>
        );
    }
}

export default AuthLoading;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})