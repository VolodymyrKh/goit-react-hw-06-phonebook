import React from 'react';
import { connect } from 'react-redux';
import { changeFilter } from '../../redux/filterActions';
import PropTypes from 'prop-types';
import styles from './Filter.module.css';

const Filter = ({ value, onChangeFilter }) => (
  <label className={styles.inputLabel}>
    <span className={styles.label}>Find contact by name</span>
    <input
      className={styles.input}
      type="text"
      value={value}
      onChange={onChangeFilter}
      placeholder="Enter contact to filter..."
    ></input>
  </label>
);

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func,
};

const mapStateToProps = state => ({
  value: state.filter,
});

const mapDispatchToProps = dispatch => ({
  onChangeFilter: e => dispatch(changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
