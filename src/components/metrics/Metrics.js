import React, { Component } from 'react';
import ScatterPlot from '../shared/charts/ScatterPlot';
import { scaleLinear } from 'd3-scale';

const VIEW = [500, 400]; // ViewBox: Width, Height
const TRBL = [30, 20, 10, 30]; // Margins: Top, Right, Bottom, Left

const dims = [
  VIEW[0] - TRBL[1] - TRBL[3], // Usable dimensions width
  VIEW[1] - TRBL[0] - TRBL[2], // Usable dimensions height
];

class Metrics extends Component {

  constructor(props) {
    super(props);

    this.setShowTop = this.setShowTop.bind(this);

    this.state = {
      duration: 1000,
      showTop: this.props.showTop
    };
  }

  // currently changes the number of bar charts -- use this to modify # of entries?
  setShowTop(e, value) {
    this.setState({
      showTop: value,
    });
  }

  render() {
    var data = [
      {
        x: 1,
        y: 1
      },
      {
        x: 2,
        y: 2
      },
      {
        x: 3,
        y: 3
      },
      {
        x: 4,
        y: 4
      },
      {
        x: 5,
        y: 5
      },
      {
        x: 6,
        y: 6
      },
      {
        x: 7,
        y: 7
      },
      {
        x: 8,
        y: 8
      },
      {
        x: 9,
        y: 9
      },
      {
        x: 10,
        y: 10
      }
    ];

    const biggestX = 10;
    const biggestY = 10;

    const xScale = scaleLinear()
      .range([0, dims[0]])
      .domain([0, biggestX]);

    const yScale = scaleLinear()
      .range([0, dims[1]])
      .domain([0, biggestY]);

    data = data.map((d, i) => {
      return {
        name: `iter-${i}`,
        x: xScale(d.x),
        y: yScale(d.y),
      };
    });

    return (
      <div className="metrics">
        <ScatterPlot data={data} xScale={xScale} yScale={yScale} duration={this.state.duration}/>
      </div>
    );
  }
}

export default Metrics;