import React, { useReducer, useEffect } from 'react';
import * as d3 from 'd3';
import Axis from './Axis';

const randomValue = () => {
  let value = Math.random() * 2 + 87;
  value = value - value % 0.1;
  return value;
};

const dataGenerator = (function* () {
  while (true) {
    yield ({
      value: randomValue(),
      date: new Date(),
    });
  }
})();

const INIT_DATA = (() => {
  const data = [];
  const now = Date.now();
  for (let n = -20; n < 0; ++n) {
    data.push({
      value: randomValue(),
      date: new Date(now + n * 2000),
    });
  }
  return data;
})();

const reducer = (data) => ([
  ...data.slice(1),
  dataGenerator.next().value,
]);

const selectX = datum => datum.date;
const selectY = datum => datum.value;

const WIDTH = 500;
const HEIGHT = 300;
const MARGIN = 30;

const UPDATE_ACTION = { type: 'update' };

const Diagram1 = () => {
  const [data, update] = useReducer(reducer, INIT_DATA);

  useEffect(() => {
    const intervalId = setInterval(() => {
      update(UPDATE_ACTION);
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const xScale = d3.scaleTime()
    .domain(d3.extent(data, selectX))
    .range([MARGIN, MARGIN + WIDTH]);
  const yScale = d3.scaleLinear()
    .domain([60, 120])
    .range([MARGIN + HEIGHT, MARGIN]);

  const selectScaledX = datum => xScale(selectX(datum));
  const selectScaledY = datum => yScale(selectY(datum));

  const line = d3.line()
    .x(selectScaledX)
    .y(selectScaledY);

  const linePath = line(data);

  const xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(data.length / 2);
  const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(3);

  return (
    <div
      style={{
        display: 'inline-block',
        position: 'relative',
      }}
    >
      <svg height={HEIGHT + MARGIN * 2} width={WIDTH + MARGIN * 2}>
        <g>
          <path
            stroke="blue"
            fill="transparent"
            d={linePath}
          />
          <Axis
            axis={xAxis}
            style={{
              transform: `translateY(${HEIGHT + MARGIN}px)`,
            }}
          />
          <Axis
            axis={yAxis}
            style={{
              transform: `translateX(${MARGIN}px)`,
            }}
          />
        </g>
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: MARGIN,
          fontSize: '2em',
        }}
      >
        {`${data[data.length - 1].value.toFixed(1)}`} BPM
      </div>
    </div>
  );
};

export default Diagram1;
