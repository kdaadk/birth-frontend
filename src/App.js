import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Light from './pages/Light';
import Expert from './pages/Expert';
import Calculate from "./pages/Calculate";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import SignInScreen from "./pages/SignInScreen";
import {db, firebaseApp} from "./shared/firebase";
import {Redirect} from "react-router-dom";
import {
    PATH_EXPERT,
    PATH_LIGHT,
    PATH_SIGN_IN,
    PATH_CALCULATE,
    PATH_HELP,
    PATH_HOME,
    PATH_ACCESS
} from "./shared/constants";
import {Access} from "./pages/Access";
import {goTo} from "./shared/goTo";

export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            isPaid: false,
            isLoading: true
        };
        this._isSignedIn();
    }    

    _isSignedIn = () => {
        firebaseApp.auth().onAuthStateChanged(
            (user) => {
                this.setState({isSignedIn: !!user});
                user
                    ? this._isPaid(user)
                    : this.setState({isLoading: false});
            }
        );
    };
    
    _isPaid = user => {
        db.collection('users')
            .doc(user.uid)
            .get()
            .then(doc => {
                if (doc.exists) {
                    const isPaid = doc.data().tariff === 'expert' || !this._isDemoExpired(user.metadata.creationTime);
                    this.setState({isPaid: isPaid, isLoading: false});
                }
                else {
                    db.collection('users')
                        .doc(user.uid)
                        .set({ login: user.email, tariff: 'demo'})
                        .then(() => goTo(PATH_HOME));
                }
            });      
    };
    
    _isDemoExpired = rawCreationDate => {
        let now = new Date();
        let creationDate = new Date(Date.parse(rawCreationDate));
        creationDate.setDate(now.getDate() + 5);
        return now > creationDate
    };

    _getRender(component) {
        if (!this.state.isSignedIn)
            return <Redirect to={PATH_SIGN_IN}/>;
        if (!this.state.isPaid)
            return <Redirect to={PATH_ACCESS}/>;
        return component;
    };

    render () {
        return (
            <Layout>
                { !this.state.isLoading && (
                    <Switch>
                        <Route exact path={PATH_HOME} render={() => this._getRender(<Home/>)}/>
                        <Route path={PATH_LIGHT} render={() => this._getRender(<Light/>)}/>
                        <Route path={PATH_EXPERT} render={() => this._getRender(<Expert/>)}/>
                        <Route path={PATH_CALCULATE} render={(props) => this._getRender(<Calculate {...props}/>)}/>

                        <Route path={PATH_HELP} component={Help}/>
                        <Route path={PATH_SIGN_IN} component={SignInScreen}/>
                        <Route path={PATH_ACCESS} component={Access}/>
                        <Route path='*' component={NotFound}/>
                    </Switch>
                )}
            </Layout>
        );
    }    
}
