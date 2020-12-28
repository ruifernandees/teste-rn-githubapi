import { StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        alignItems: 'center'
        // backgroundColor: "#262833"
    },
    searchButton: {
        padding: 20,
        width: '50%',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#eee',
        borderRadius: 10
    }
});

export default styles;