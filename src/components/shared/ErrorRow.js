import React from 'react';
import _ from 'underscore';

import ErrorList from './ErrorList';

const ErrorRow = ({ errors, reactKey }) => {
  if (_.isEmpty(errors)) {
    return null;
  } else {
    return (
      <tr key={reactKey}>
        <td><ErrorList errors={errors} /></td>
      </tr>
    );
  }
};

export default ErrorRow