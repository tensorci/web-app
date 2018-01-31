import React, { PureComponent } from 'react';
import { easeExp, easePoly } from 'd3-ease';
import ChartSurface from './ChartSurface';
import NodeGroup from 'resonance/NodeGroup';
import TickGroup from 'resonance/TickGroup';

const VIEW = [500, 400]; // ViewBox: Width, Height
const TRBL = [30, 20, 10, 30]; // Margins: Top, Right, Bottom, Left
const DIMS = [
  VIEW[0] - TRBL[1] - TRBL[3], // Adjusted dimensions width
  VIEW[1] - TRBL[0] - TRBL[2], // Adjusted dimensions height
];

class BarChart extends PureComponent {
  
  state = {
    xScale0: this.props.xScale,
    xScale1: this.props.xScale,
  };

  componentWillReceiveProps(next) {
    this.setState(() => ({
      xScale0: this.props.xScale,
      xScale1: next.xScale,
    }));
  }

  render() {
    const { data, yScale, duration } = this.props;
    const { xScale0, xScale1 } = this.state;

    return (
      <ChartSurface view={VIEW} trbl={TRBL}>
        <TickGroup
          scale={this.props.xScale}

          start={({ val }) => ({
            opacity: 1e-6,
            transform: `translate(${xScale0(val)},0)`,
          })}

          enter={({ val }) => ({
            opacity: [1],
            transform: [`translate(${xScale1(val)},0)`],
            timing: { duration, ease: easeExp },
          })}

          update={({ val }) => ({
            opacity: [1],
            transform: [`translate(${xScale1(val)},0)`],
            timing: { duration, ease: easeExp },
          })}

          leave={({ val }) => ({
            opacity: [1e-6],
            transform: [`translate(${xScale1(val)},0)`],
            timing: { duration, ease: easeExp },
          })}
        >
          {(nodes) => (
            <g>
              {nodes.map(({ key, data: { val }, state }) => (
                <g key={key} {...state}>
                  <line
                    x1={0}
                    y1={0}
                    x2={0}
                    y2={DIMS[1]}
                    stroke={'#333'}
                    opacity={0.2}
                  />
                  <text
                    x={0}
                    y={-5}
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
              transform: 'translate(0,500)',
            },
            rect: {
              width: node.xVal,
              height: yScale.bandwidth(),
            },
            text: {
              x: node.xVal - 3,
            },
          })}

          enter={(node) => ({
            node: {
              opacity: [1e-6, 1],
              transform: ['translate(0,500)', `translate(0,${node.yVal})`],
            },
            rect: { width: node.xVal, height: yScale.bandwidth() },
            text: { x: node.xVal - 3 },
            timing: { duration, ease: easePoly },
          })}

          update={(node) => ({
            node: {
              opacity: [1],
              transform: [`translate(0,${node.yVal})`],
            },
            rect: { width: [node.xVal], height: [yScale.bandwidth()] },
            text: { x: [node.xVal - 3] },
            timing: { duration, ease: easePoly },
          })}

          leave={() => ({
            node: {
              opacity: [1e-6],
              transform: ['translate(0,500)'],
            },
            timing: { duration, ease: easePoly },
          })}
        >
          {(nodes) => (
            <g>
              {nodes.map(({ key, data: { name, xVal }, state }) => (
                <g key={key} {...state.node}>
                  <rect
                    fill={'#455a64'}
                    opacity={0.4}
                    {...state.rect}
                  />
                  <text
                    dy="0.35em"
                    x={-15}
                    textAnchor="middle"
                    fill={'#333'}
                    fontSize={10}
                    y={yScale.bandwidth() / 2}
                  >{name}</text>
                  <text
                    textAnchor="end"
                    dy="0.35em"
                    fill="white"
                    fontSize={10}
                    y={yScale.bandwidth() / 2}
                    {...state.text}
                  >{xScale1.invert(xVal) * 100 + '%'}</text>
                </g>
              ))}
            </g>
          )}
        </NodeGroup>
      </ChartSurface>
    );
  }
}

export default BarChart;
