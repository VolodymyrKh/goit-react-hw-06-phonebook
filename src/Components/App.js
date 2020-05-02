import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
// import uuid from 'react-uuid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notification/Notification';
import PropTypes from 'prop-types';

import titleSlide from '../transitions/titleSlide.module.css';
import styles from './App.module.css';
import popTransition from '../transitions/pop.module.css';
import notificationSlide from '../transitions/notificationSlide.module.css';

const filterContacts = (filter, contacts) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
};

class App extends Component {
  static propTypes = {
    filter: PropTypes.string,
    titleAnimation: PropTypes.bool,
  };

  state = {
    titleAnimation: false,
  };

  changeFilter = e => {
    if (this.state.existContact) return;
    this.setState({ filter: e.target.value });
  };

  // addContact = contact => {
  //   const stateNames = this.state.contacts.map(({ name }) => name);

  //   if (stateNames.includes(contact.name)) {
  //     this.setState({ existContact: true });
  //     return;
  //   }

  //   const contactToAdd = {
  //     id: uuid(),
  //     ...contact,
  //   };

  //   this.setState(state => ({
  //     contacts: [contactToAdd, ...state.contacts],
  //   }));
  // };

  // removeContact = id => {
  //   this.setState(state => ({
  //     contacts: state.contacts.filter(contact => contact.id !== id),
  //   }));
  // };

  // hideNotification = () => {
  //   this.setState({ existContact: false });
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  componentDidMount() {
    // const persitedContacts = JSON.parse(localStorage.getItem('contacts'));
    // if (persitedContacts) {
    //   this.setState({ contacts: persitedContacts });
    // }
    this.setState({ titleAnimation: true });
  }

  render() {
    const { filter, titleAnimation } = this.state;
    // const filteredContacts = filterContacts(filter, contacts);
    const { contacts, existContact } = this.props;

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

          <CSSTransition
            in={existContact}
            timeout={250}
            classNames={notificationSlide}
            unmountOnExit
          >
            <Notification onHideNotification={this.hideNotification} />
          </CSSTransition>
        </div>
        <ContactForm
        // onAddContact={this.addContact}
        // existContact={existContact}
        />

        <CSSTransition
          in={contacts.length > 1}
          timeout={250}
          classNames={popTransition}
          unmountOnExit
        >
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>

        {contacts.length > 0 && (
          <ContactList
          // items={filteredContacts}
          // onRemoveContact={this.removeContact}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
  existContact: state.existContact,
});

export default connect(mapStateToProps)(App);
