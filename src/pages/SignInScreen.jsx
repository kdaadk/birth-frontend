import React from 'react';
import { firebaseApp, SignIn} from '../shared/firebase'
import Loader from "@skbkontur/react-ui/Loader";

class SignInScreen extends React.Component {
    constructor(props) {
        super(props);       
        this.state = {
            isSignedIn: false,
            isLoading: true
        };
    }

    componentDidMount() {
        this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged(
            (user) => this.setState({isSignedIn: !!user, isLoading: false})
        );
    }

    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    render() {
        const { isLoading, isSignedIn } = this.state;

        if (!isSignedIn) {
            return (
                <Loader type="normal" active={isLoading}>
                    <SignIn/>
                </Loader>
            );
        }

        return <div/>;
    }
}

export default SignInScreen;