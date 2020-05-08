import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import PropTypes from 'prop-types';
import titleSlide from '../transitions/titleSlide.module.css';
import styles from './App.module.css';
import popTransition from '../transitions/pop.module.css';

class App extends Component {
  
  static propTypes = {
    titleAnimation: PropTypes.bool,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }).isRequired,
    ),
  };

  state = {
    titleAnimation: false,
  };

  componentDidMount() {
    this.setState({ titleAnimation: true });
  }

  render() {
    const { titleAnimation } = this.state;
    const { contacts } = this.props;

    return (
      <>
        <div className={styles.header}>
          <CSSTransition
            in={titleAnimation}
            timeout={500}
            classNames={titleSlide}
          >
            <h2 className={styles.title}>Phonebook</h2>
          </CSSTransition>
        </div>
        <ContactForm />

        <CSSTransition
          in={contacts.length > 1}
          timeout={250}
          classNames={popTransition}
          unmountOnExit
        >
          <Filter />
        </CSSTransition>

        {contacts.length > 0 && <ContactList />}
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
});

export default connect(mapStateToProps)(App);
