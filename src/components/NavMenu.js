import React, { Component } from "react";
import {Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavbarText, NavLink} from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/NavMenu.css";
import logo from "../../src/logo.svg";
import {PATH_EXPERT, PATH_HELP, PATH_LIGHT, PATH_SIGN_IN} from "../shared/constants";
import {firebaseApp} from "../shared/firebase";
import {goTo} from "../shared/goTo";
const { User } = require('@skbkontur/react-icons');

export class NavMenu extends Component {
  static displayName = NavMenu.name;
  constructor(props) {
    super(props);
    this._signOut = this._signOut.bind(this);
    this.state = {
      collapsed: true,
      isSignedIn: false,
      user : {}
    };
  }

  _toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  _signOut() {
    firebaseApp.auth().signOut().then(() => goTo(PATH_SIGN_IN));
  }

  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn: !!user, });
      if (user) {
        this.setState({isSignedIn: !!user, user: user});
      }
    });
  }

  render() {
    const { isSignedIn, user } = this.state;
    const name = user.displayName || user.email || '';
    
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          light
        >
          <Container>
            <div>
              <img className="logo" src={logo} height="42" width="42" alt="BirthCalculatorApp" />
              <NavbarBrand tag={Link} to="/">
                BirthCalculatorApp
              </NavbarBrand>
            </div>
            <NavbarToggler onClick={() => this._toggleNavbar()} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to={PATH_LIGHT}>Ученик</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to={PATH_EXPERT}>Эксперт</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to={PATH_HELP}>Руководство пользователя</NavLink>
                </NavItem>
                <div className="menu-text">
                  <NavbarText className="text-primary user-name">{name}</NavbarText>
                  <NavbarText className="text-dark user-icon"><User/></NavbarText>
                </div>
                <NavItem>
                  {!isSignedIn
                      ? <NavLink tag={Link} className="text-dark" to={PATH_SIGN_IN}>Войти</NavLink>
                      : <NavLink tag={Link} className="text-dark" to={PATH_SIGN_IN} onClick={() => this._signOut()}>Выйти</NavLink>
                  }
                </NavItem>
              </ul>              
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
