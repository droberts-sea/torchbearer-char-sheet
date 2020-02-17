import React from 'react';
import _ from 'underscore';

import ErrorList from './ErrorList';

import './styles/ErrorRow.css';

const ErrorRow = ({ errors, reactKey }) => {
  if (_.isEmpty(errors)) {
    return null;
  } else {
    return (
      <tr key={reactKey} className="error-row">
        <td colspan="100"><ErrorList errors={errors} /></td>
      </tr>
    );
  }
};

export default ErrorRow