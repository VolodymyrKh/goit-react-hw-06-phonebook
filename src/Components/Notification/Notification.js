import React from 'react';
import { connect } from 'react-redux';
import { existContact } from '../../redux/contactActions';
import styles from './Notification.module.css';

const Notifification = ({ onHideNotification }) => (
  <span className={styles.notification} onClick={onHideNotification}>
    Contact already exists
  </span>
);

const mapStateToProps = state => ({
  existContact: state.existContact,
});

const mapDispatchToProps = dispatch => ({
  onHideNotification: () => dispatch(existContact()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifification);
