import React, { Component } from 'react';
import ScatterPlot from '../shared/charts/ScatterPlot';
import { scaleLinear } from 'd3-scale';

const VIEW = [500, 400]; // ViewBox: Width, Height
const TRBL = [10, 20, 30, 30]; // Margins: Top, Right, Bottom, Left

const dims = [
  VIEW[0] - TRBL[1] - TRBL[3], // Usable dimensions width
  VIEW[1] - TRBL[0] - TRBL[2], // Usable dimensions height
];

class Metrics extends Component {

  constructor(props) {
    super(props);

    this.addDataPoint = this.addDataPoint.bind(this);

    this.state = {
      data: [
        {
          x: 10,
          y: 2.56
        },
        {
          x: 20,
          y: 2.4
        },
        {
          x: 30,
          y: 2.3
        },
        {
          x: 40,
          y: 2
        },
        {
          x: 50,
          y: 1.4
        },
        {
          x: 60,
          y: 1.3
        },
        {
          x: 70,
          y: 1
        },
        {
          x: 80,
          y: 0.9
        },
        {
          x: 90,
          y: 0.8
        },
        {
          x: 100,
          y: 0.75
        }
      ]
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.addDataPoint();
    }, 4000);
  }

  addDataPoint() {
    var data = this.state.data;
    data.push({ x: (data.length + 1) * 10, y: data[data.length - 1].y - 0.06 });
    this.setState({ data: data });

    setTimeout(() => {
      if (data.length < 20) {
        this.addDataPoint();
      }
    }, 2000);
  }

  render() {
    // Won't always be true, so just get these correctly.
    const largestX = this.state.data[this.state.data.length - 1].x;
    const largestY = this.state.data[0].y * 1.05;

    const xScale = scaleLinear()
      .range([0, dims[0]])
      .domain([0, largestX]);

    const yScale = scaleLinear()
      .range([0, dims[1]])
      .domain([0, largestY]);

    const data = this.state.data.map((d, i) => {
      return {
        name: `iter-${i}`,
        x: xScale(d.x),
        y: yScale(d.y),
      };
    });

    return (
      <div className="metrics">
        <ScatterPlot data={data} xScale={xScale} yScale={yScale}/>
      </div>
    );
  }
}

export default Metrics;