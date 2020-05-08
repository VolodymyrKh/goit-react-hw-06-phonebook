import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactListItem from './ContactListItem';
import styles from './ContactList.module.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import slideTransition from '../../transitions/slide.module.css';

const filterContacts = (filter, contacts) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
};

class ContactList extends Component {
  render() {
    const { filter, contacts } = this.props;
    const items = filterContacts(filter, contacts);

    return (
      <TransitionGroup component="ul" className={styles.contactList}>
        {items.map(item => (
          <CSSTransition
            key={item.id}
            timeout={250}
            classNames={slideTransition}
          >
            <ContactListItem {...item} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
  filter: state.filter,
});

export default connect(mapStateToProps)(ContactList);
