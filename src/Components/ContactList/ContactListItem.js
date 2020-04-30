import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';



const ContactListItem = ({ name, number, onRemoveContact }) => (
  <li className={styles.item}>
    <span className={styles.mr}>{name}:  {number}
    <button className={styles.deleteButton} type="button" onClick={onRemoveContact}>
      Delete
    </button></span>
  </li>
);

ContactListItem.propTypes = {
  onRemoveContact: PropTypes.func.isRequired,
};

export default ContactListItem;
