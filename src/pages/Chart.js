import React from 'react';

import { htmlSvgToPdfSvg } from './imageFromSvg';

export const ChartSvg = ({ debug, style, children, width, height }) => {
  return chartToPdfSvg(children, width, height, debug, style);
};

const chartToPdfSvg = (children, width, height, debug, style) => {
  const component = htmlSvgToPdfSvg(children);
  const result = React.cloneElement(component, { width, height, debug, style });
  return result;
};