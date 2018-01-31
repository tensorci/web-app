import React, { PureComponent } from 'react';
import { easeExp, easePoly } from 'd3-ease';
import ChartSurface from './ChartSurface';
import NodeGroup from 'resonance/NodeGroup';
import TickGroup from 'resonance/TickGroup';

const VIEW = [500, 400]; // ViewBox: Width, Height
const TRBL = [10, 20, 30, 30]; // Margins: Top, Right, Bottom, Left
const DIMS = [
  VIEW[0] - TRBL[1] - TRBL[3], // Adjusted dimensions width
  VIEW[1] - TRBL[0] - TRBL[2], // Adjusted dimensions height
];

class ScatterPlot extends PureComponent {

  constructor(props) {
    super(props);

    this.updates = 0;
    this.duration = 700;

    this.getChartTitle = this.getChartTitle.bind(this);
    this.getAxesTitles = this.getAxesTitles.bind(this);
    this.getLegend = this.getLegend.bind(this);

    this.state = {
      xScale0: this.props.xScale,
      xScale1: this.props.xScale,
      yScale0: this.props.yScale,
      yScale1: this.props.yScale,
      legend: this.props.legend,
      xAxisTitle: this.props.xAxisTitle,
      yAxisTitle: this.props.yAxisTitle,
      title: this.props.title
    };
  }

  componentWillReceiveProps(next) {
    this.setState(() => ({
      xScale0: this.props.xScale,
      xScale1: next.xScale,
      yScale0: this.props.yScale,
      yScale1: next.yScale,
    }));
  }

  getChartTitle() {
    if (!this.state.title) {
      return;
    }

    return <div className="chart-title">{this.state.title}</div>;
  }

  getAxesTitles() {
    var titles = [];

    if (this.state.yAxisTitle) {
      titles.push(<div key="y-axis" className="chart-axis-title y-axis">{this.state.yAxisTitle}</div>);
    }

    if (this.state.xAxisTitle) {
      titles.push(<div key="x-axis" className="chart-axis-title x-axis">{this.state.xAxisTitle}</div>);
    }

    return titles;
  }

  getLegend() {
    if (!this.state.legend) {
      return;
    }

    const legendInfo = this.state.legend.map((series, i) => {
      return (
        <div className="legend-series">
          <i className="fa fa-circle" style={{ color: series.color || '#333' }}></i>
          <span>{series.name}</span>
        </div>
      );
    });

    return <div className="chart-legend">{legendInfo}</div>;
  }

  render() {
    this.updates++;
    const { data } = this.props;
    const { xScale0, xScale1, yScale0, yScale1 } = this.state;

    return (
      <div className="scatter-plot">
        {this.getChartTitle()}
        {this.getAxesTitles()}
        {this.getLegend()}
        <ChartSurface view={VIEW} trbl={TRBL}>
          <TickGroup
            scale={this.props.yScale}

            start={({ val }) => ({
              opacity: 1e-6,
              transform: `translate(0,${DIMS[1] - yScale0(val)})`,
            })}

            enter={({ val }) => ({
              opacity: [1],
              transform: [`translate(0,${DIMS[1] - yScale1(val)})`],
              timing: { duration: this.duration, ease: easeExp },
            })}

            update={({ val }) => ({
              opacity: [1],
              transform: [`translate(0,${DIMS[1] - yScale1(val)})`],
              timing: { duration: this.duration, ease: easeExp },
            })}

            leave={({ val }) => ({
              opacity: [1e-6],
              transform: [`translate(0,${DIMS[1] - yScale1(val)})`],
              timing: { duration: this.duration, ease: easeExp },
            })}
          >
            {(nodes) => (
              <g>
                {nodes.map(({ key, data: { val }, state }) => (
                  <g key={key} {...state}>
                    <line
                      x1={0}
                      y1={0}
                      x2={DIMS[0]}
                      y2={0}
                      stroke={'#e6e6e9'}
                      opacity={1}
                    />
                    <text
                      x={-15}
                      y={3}
                      textAnchor="middle"
                      fill={'#333'}
                      fontSize="10px"
                    >{val}</text>
                  </g>
                ))}
              </g>
            )}
          </TickGroup>
          <TickGroup
            scale={this.props.xScale}

            start={({ val }) => ({
              opacity: 1e-6,
              transform: `translate(${xScale0(val)},0)`,
            })}

            enter={({ val }) => ({
              opacity: [1],
              transform: [`translate(${xScale1(val)},0)`],
              timing: { duration: this.duration, ease: easeExp },
            })}

            update={({ val }) => ({
              opacity: [1],
              transform: [`translate(${xScale1(val)},0)`],
              timing: { duration: this.duration, ease: easeExp },
            })}

            leave={({ val }) => ({
              opacity: [1e-6],
              transform: [`translate(${xScale1(val)},0)`],
              timing: { duration: this.duration, ease: easeExp },
            })}
          >
            {(nodes) => (
              <g>
                {nodes.map(({ key, data: { val }, state }) => (
                  <g key={key} {...state}>
                    <text
                      x={0}
                      y={DIMS[1] + 20}
                      textAnchor="middle"
                      fill={'#333'}
                      fontSize="10px"
                    >{val}</text>
                  </g>
                ))}
              </g>
            )}
          </TickGroup>
          <NodeGroup
            data={data}
            keyAccessor={(d) => d.name}

            start={(node) => ({
              node: {
                opacity: 1e-6,
                transform: this.updates === 1 ? `translate(${node.x},${DIMS[1]})` : `translate(${node.x},${DIMS[1] - node.y})`,
              },
              circle: {
                r: 1e-6,
                fill: '#ff7277',
              }
            })}

            enter={(node) => {
              const index = parseInt(node.name.split('-').pop());

              return {
                node: {
                  opacity: [1e-6, 1],
                  transform: this.updates === 1 ?
                    [`translate(${node.x},${DIMS[1]})`, `translate(${node.x},${DIMS[1] - node.y})`] :
                    [`translate(${node.x},${DIMS[1] - node.y})`],
                },
                circle: { r: [3] },
                timing: { duration: this.duration, delay: this.updates === 1 ? (index * 50) : 0, ease: easePoly }
              };
            }}

            update={(node) => ({
              node: {
                opacity: [1],
                transform: [`translate(${node.x},${DIMS[1] - node.y})`],
              },
              circle: { r: [3] },
              timing: { duration: this.duration, ease: easePoly }
            })}

            leave={(node) => ({
              node: {
                opacity: [1e-6],
                transform: [`translate(${node.x},${DIMS[1]})`],
              },
              timing: { duration: this.duration, ease: easePoly },
            })}
          >
            {(nodes) => (
              <g>
                {nodes.map(({ key, data: { name, x, y }, state }) => (
                  <g key={key} {...state.node}>
                    <circle
                      fill={'#ff7277'}
                      opacity={1}
                      {...state.circle}
                    />
                  </g>
                ))}
              </g>
            )}
          </NodeGroup>
        </ChartSurface>
      </div>
    );
  }
}

export default ScatterPlot;
