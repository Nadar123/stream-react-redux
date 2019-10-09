import React from 'react';
import { connect } from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component{

    componentDidMount () {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '295820272797-tq5mcse87ri6hg47tb4k4pe8mdpsbkj0.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn()
    } // click event for btn sign in 

    onSignOutClick = () => {
        this.auth.signOut();
    } // click event for btn sign out

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if(this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui green google button">
                    <i className="google icon"/>
                    Sign Out 
                </button>

            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui blue google button">
                    <i className="google icon"/>
                    Sign in with Google
                </button>

            )
        }
    }

    render() {
        return (
            <div className="auth-wrap">
                {this.renderAuthButton()}
            </div>
        )
    }
} // class-end GoogleAuth 

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, {signIn, signOut} )(GoogleAuth);