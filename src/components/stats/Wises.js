import React from 'react';

import Checkbox from '../shared/Checkbox';

class Wises extends React.Component {

  buildWise(wise, i) {
    return (
      <tr key={`wise_${i}`}>
        <td>{ wise.name }</td>
        <td>
          <Checkbox
            active={wise.advancement.pass}
            />
        </td>
        <td>
          <Checkbox
            active={wise.advancement.fail}
            />
        </td>
        <td>
          <Checkbox
            active={wise.advancement.fate}
            />
        </td>
        <td>
          <Checkbox
            active={wise.advancement.persona}
            />
        </td>
      </tr>
    );
  }

  render() {
    return (
      <section>
        <h2>Wises</h2>
        <table className="wises-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Pass</th>
              <th>Fail</th>
              <th>Fate</th>
              <th>Pers.</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.wises.map(this.buildWise)
            }
          </tbody>
        </table>

      </section>
    );
  }
}

export default Wises;
