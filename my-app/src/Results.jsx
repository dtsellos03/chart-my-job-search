import * as React from "react";
import _ from "lodash";
import moment from "moment";
import emojiMap from './EmojiMap';
import {
    VictoryChart,
    VictoryScatter,
    VictoryTheme,
    VictoryAxis,
    VictoryTooltip,
    VictoryVoronoiContainer,
    VictoryLegend,
} from 'victory';

class ChartPoint extends React.Component {
    render() {
        const {x, y, datum} = this.props;
        const icon = emojiMap[datum.event] || '⚪';
        return (
            <text x={x} y={y} fontSize={10}>
                {icon}
            </text>
        );
    }
}

class MatPoint extends React.Component {
    render() {
        const {x, y, datum} = this.props;
        const icon = emojiMap[datum.name] || '🔴';
        return (
            <text x={x - 3} y={y + 3} fontSize={8}>
                {icon}
            </text>
        );
    }
}

class LabelComponent extends React.Component {
    render() {
        return <VictoryTooltip labelComponent={10}/>
    }
}

class Results extends React.Component {

    transformEventsIntoSeries(events) {
        let groupedByCompanies = _.groupBy(events, 'company');
        let inverseGrouping = {};
        let companies = _.reduce(_.keys(groupedByCompanies), (result, key, index) => {
                result[key] = index + 1;
                inverseGrouping[index + 1] = key;
                return result;
            }
            , {});
        return _.map(events, (event) => {
            return {
                "x": moment(event.date).valueOf(),
                "event": event.event,
                "company": event.company,
                'y': companies[event.company]
            };
        });
    }

    transformCompaniesToY(events) {
        let groupedByCompanies = _.groupBy(events, 'company');
        let inverseGrouping = {};
        _.reduce(_.keys(groupedByCompanies), (result, key, index) => {
                result[key] = index + 1;
                inverseGrouping[index + 1] = key;
                return result;
            }
            , {});
        return inverseGrouping;
    }

    render() {
        let rawData = this.props.data;
        let data = this.transformEventsIntoSeries(rawData);
        if (_.isEmpty(data)) {
            return (<h1 className="noData">Awaiting data</h1>);
        }
        let mapYToCompanies = this.transformCompaniesToY(rawData);
        let minX = moment(_.minBy(data, 'x').x).add(-2, 'days').valueOf();
        let maxX = _.get(_.maxBy(data, 'x'), 'x');
        let minY = 0;
        let maxY = _.get(_.maxBy(data, 'y'), 'y');
        let yValues = _.map(data, thing => _.get(thing, 'y'));
        let style = {width: 1000, height: 500, margin: 'auto'};
        return (
            <div style={style}>
                <VictoryChart
                    containerComponent={
                        <VictoryVoronoiContainer
                            voronoiDimension="x"
                            labels={(d) => {
                                console.log(d);
                                return `${d.company}: ${d.event}`;
                            }
                            }
                            labelComponent={<LabelComponent/>}
                        />
                    }
                    width={500}
                    scale={{x: "time"}}
                    theme={VictoryTheme.material}
                    domain={{x: [minX, maxX], y: [minY, maxY]}}
                    domainPadding={{x: [0, 20], y: 0}}
                >
                    <VictoryLegend x={20} y={10}
                                   orientation="horizontal"
                                   gutter={0}
                                   itemsPerRow={6}
                                   colorScale={["navy", "blue", "cyan"]}
                                   dataComponent={<MatPoint/>}
                                   style={{border: {stroke: "none"}, labels: {fontSize: 5}}}
                                   data={_.map(emojiMap, (key, value) => {
                                       return {name: value}
                                   })}
                    />
                    <VictoryAxis crossAxis
                                 theme={VictoryTheme.material}
                                 offsetY={50}
                                 tickFormat={(t) => {
                                     return moment(t).format('ddd') + '\n' + moment(t).format('MMM') + '\n' + moment(t).format('DD')
                                 }}

                                 style={{tickLabels: {fontSize: 7, padding: 10, angle: 0}}}
                                 standalone={false}
                    />
                    <VictoryAxis dependentAxis crossAxis
                                 tickFormat={(t) => mapYToCompanies[t]}
                                 theme={VictoryTheme.material}
                                 tickValues={yValues}
                                 offsetX={50}
                                 style={{tickLabels: {fontSize: 7, padding: 0}}}
                                 standalone={false}
                    />
                    <VictoryScatter
                        style={{data: {fill: "#c43a31"}}}
                        size={2}
                        dataComponent={<ChartPoint/>}
                        data={data}
                    />
                </VictoryChart>
            </div>
        );
    }
}

export default Results;