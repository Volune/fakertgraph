import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Axis = ({
  axis,
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    d3.select(ref.current).call(axis);
  }, [ref.current, axis]);

  return (
    <g {...props} ref={ref} />
  );
};

export default Axis;
