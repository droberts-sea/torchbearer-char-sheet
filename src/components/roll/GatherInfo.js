import React from 'react';

import Checkbox from '../shared/Checkbox';
import PlusMinus from '../shared/PlusMinus';

const GatherInfo = function(props) {
  return (
    <ul id="roll-gather-info">
      <li>
        <h3>Versus test</h3>
        <Checkbox active={props.info.type == 'versus'} />
      </li>
      <li>
        <h3>Obstacle</h3>
        <PlusMinus value={props.info.ob} min={0} />
      </li>
    </ul>
  );
}

export default GatherInfo;
