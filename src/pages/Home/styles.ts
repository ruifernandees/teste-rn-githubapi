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
    },
    reposContainerTitle: {
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    reposList: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    reposContainer: {
        width: '100%',
        justifyContent: 'center',
        marginBottom: 200
    },
    repository: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        margin: 5,
        width: '90%',
        backgroundColor: '#eee',
        paddingBottom: 15,
        paddingTop: 15
    }
});

export default styles;