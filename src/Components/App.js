import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import uuid from 'react-uuid';
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

export default class App extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ),
    filter: PropTypes.string,
    titleAnimation: PropTypes.bool,
    existContact: PropTypes.bool,
  };

  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    titleAnimation: false,
    existContact: false,
  };

  changeFilter = e => {
    if (this.state.existContact) return;
    this.setState({ filter: e.target.value });
  };

  addContact = contact => {
    const stateNames = this.state.contacts.map(({ name }) => name);

    if (stateNames.includes(contact.name)) {
      this.setState({ existContact: true });
      return;
    }

    const contactToAdd = {
      ...contact,
      id: uuid(),
    };

    this.setState(state => ({
      contacts: [contactToAdd, ...state.contacts],
    }));
  };

  removeContact = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
  };

  hideNotification = () => {
    this.setState({ existContact: false });
  };

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
    const { contacts, filter, titleAnimation, existContact } = this.state;
    const filteredContacts = filterContacts(filter, contacts);

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
          onAddContact={this.addContact}
          existContact={existContact}
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
            items={filteredContacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </>
    );
  }
}
