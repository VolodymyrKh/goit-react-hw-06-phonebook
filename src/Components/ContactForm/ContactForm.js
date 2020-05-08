import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import Notification from '../Notification/Notification';
import { connect } from 'react-redux';
import { addContact } from '../../redux/contactActions';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';
import notificationSlide from '../../transitions/notificationSlide.module.css';

class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
    name: PropTypes.string,
    number: PropTypes.string,
    existContact: PropTypes.bool,
  };

  state = {
    name: '',
    number: '',
    existContact: false,
  };

  handleChange = e => {
    if (this.state.existContact) return;
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.existContact) return;
    const stateNames = this.props.contacts.map(({ name }) => name);

    if (stateNames.includes(this.state.name)) {
      this.setState({ existContact: true });

      setTimeout(() => this.setState({ existContact: false }), 2500);
      return;
    }

    const contactToAdd = {
      id: uuid(),
      ...this.state,
    };

    this.props.onAddContact(contactToAdd);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number, existContact } = this.state;

    return (
      <div className={styles.container}>
        <CSSTransition
          in={existContact}
          timeout={250}
          classNames={notificationSlide}
          unmountOnExit
        >
          <Notification />
        </CSSTransition>
        <form className={styles.contactForm} onSubmit={this.handleSubmit}>
          <label className={styles.inputLabel}>
            <span>Name</span>
            <input
              className={styles.input}
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
              placeholder="Please enter name"
            />
          </label>

          <label className={styles.inputLabel}>
            <span>Number</span>
            <input
              className={styles.input}
              type="tel"
              name="number"
              value={number}
              onChange={this.handleChange}
              placeholder="xxx-xx-xx"
            />
          </label>

          <button type="submit" className={styles.addButton}>
            Add contact{' '}
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
});

const mapDispatchToProps = dispatch => ({
  onAddContact: contactToAdd => dispatch(addContact(contactToAdd)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
