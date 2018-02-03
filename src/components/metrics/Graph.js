import React, { Component } from 'react';
import { scaleLinear } from 'd3-scale';
import ScatterPlot from '../shared/charts/ScatterPlot';

class Graph extends Component {

  constructor(props) {
    super(props);
    this.viewSize = [500, 350]; // ViewBox: Width, Height
    this.margins = [10, 20, 30, 30]; // Margins: Top, Right, Bottom, Left
    this.dims = [
      this.viewSize[0] - this.margins[1] - this.margins[3], // Usable dimensions width
      this.viewSize[1] - this.margins[0] - this.margins[2], // Usable dimensions height
    ];
  }

  formatData(groups) {
    var allData = [];
    var group, dataPoints, dataPoint;

    for (var i = 0; i < groups.length; i++) {
      group = groups[i];
      dataPoints = group.data || [];

      for (var j = 0; j < dataPoints.length; j++) {
        dataPoint = dataPoints[j];

        dataPoint.color = group.color;
        dataPoint.name = `${group.name.replace(' ', '-')}-index-${j}`;

        allData.push(dataPoint);
      }
    }

    return allData;
  }

  formatLegend(groups) {
    return groups.map((g) => {
      return {
        name: g.name,
        color: g.color
      };
    });
  }

  largestOfSeries(series, key) {
    const vals = series.map((data) => { return data[key]; });
    return Math.max.apply(null, vals);
  }

  render() {
    const title = this.props.title;
    const xAxisTitle = this.props.x_axis;
    const yAxisTitle = this.props.y_axis;
    const groups = this.props.data_groups || [];

    const legend = this.formatLegend(groups);
    const data = this.formatData(groups);

    const xScale = scaleLinear()
      .range([0, this.dims[0]])
      .domain([0, this.largestOfSeries(data, 'x')]);

    const yScale = scaleLinear()
      .range([0, this.dims[1]])
      .domain([0, this.largestOfSeries(data, 'y')]);

    data.forEach((d) => {
      d.x = xScale(d.x);
      d.y = yScale(d.y);
    });

    return (
      <div className="card graph">
        <div className="card-header">
          <div className="title">
            <i className="graph-icon fa fa-bar-chart"></i>
            {title}
          </div>
          <div className="right-side">
            <i className="fa fa-download" title="Download Graph"></i>
          </div>
        </div>
        <div className="card-body">
          <ScatterPlot
            data={data}
            xScale={xScale}
            yScale={yScale}
            xAxisTitle={xAxisTitle}
            yAxisTitle={yAxisTitle}
            legend={legend}
            viewSize={this.viewSize}
            margins={this.margins}
            dims={this.dims}/>
        </div>
      </div>
    );
  }
}

export default Graph;