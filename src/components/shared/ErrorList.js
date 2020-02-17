import React from 'react';

const ErrorList = ({ errors }) => {
  console.log(errors);
  if (!errors) {
    return null;
  }

  const problems = [];
  Object.keys(errors).forEach(field => {
    errors[field].forEach(problem => {
      problems.push(`${field}: ${problem}`);
    });
  });

  return (
    <ul className="error-details">
      {problems.map(error => <li key={error}>{error}</li>)}
    </ul>
  )
}

export default ErrorList;