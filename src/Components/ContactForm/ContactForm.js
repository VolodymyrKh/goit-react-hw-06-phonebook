import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addContact } from '../../redux/contactActions';
import { existContact } from '../../redux/contactActions';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    if (this.props.existContact) return;
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const stateNames = this.props.contacts.map(({ name }) => name);

    if (stateNames.includes(this.state.name)) {
      if (!this.props.existContact) {
        this.props.onShowNotification();
      }
      return;
    }

    const contactToAdd = {
      id: uuid(),
      ...this.state,
    };
    // console.log(this.props.onAddContact(contactToAdd))
    this.props.onAddContact(contactToAdd);
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
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
    );
  }
}

const mapStateToProps = state => ({
  contacts: state.contacts,
  existContact: state.existContact,
});

const mapDispatchToProps = dispatch => ({
  onAddContact: contactToAdd => dispatch(addContact(contactToAdd)),
  onShowNotification: () => dispatch(existContact()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
