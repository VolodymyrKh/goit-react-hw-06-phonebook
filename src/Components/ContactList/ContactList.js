import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ContactListItem from './ContactListItem';
import styles from './ContactList.module.css';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import slideTransition from '../../transitions/slide.module.css';

const ContactList = ({ items}) => (
  // <ul className={styles.contactList}>
  <TransitionGroup component="ul" className={styles.contactList}>
    {items.map(item => (
      <CSSTransition key={item.id} timeout={250} classNames={slideTransition}>
        <ContactListItem
          {...item}
          // onRemoveContact={() => onRemoveContact(item.id)}
        />
      </CSSTransition>
    ))}
  </TransitionGroup>
  // </ul>
);

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
 };

const mapStateToProps = state =>({
  items: state.contacts,
})

export default connect(mapStateToProps)(ContactList);
