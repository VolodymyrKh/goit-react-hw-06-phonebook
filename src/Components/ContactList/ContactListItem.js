import React from 'react';
import { connect } from 'react-redux';
import { removeContact } from '../../redux/contactActions';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

const ContactListItem = ({ name, number, id, onRemoveContact }) => (
  <li className={styles.item}>
    <span className={styles.mr}>
      {name}: {number}
      <button
        className={styles.deleteButton}
        type="button"
        onClick={()=> onRemoveContact(id)}
      >
        Delete
      </button>
    </span>
  </li>
);

ContactListItem.propTypes = {
  onRemoveContact: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  contacts: state.contacts,
});

const mapDispatchToProps = dispatch => ({
  onRemoveContact: contactId => dispatch(removeContact(contactId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactListItem);
