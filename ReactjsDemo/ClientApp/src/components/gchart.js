import React, { Component } from 'react';
import { Chart } from "react-google-charts";

export class GChart extends Component {
    static displayName = GChart.name;

    constructor(props) {
        super(props);
        this.state = { forecasts: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(forecasts) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td>
                            <td>{forecast.temperatureC}</td>
                            <td>{forecast.temperatureF}</td>
                            <td>{forecast.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    static renderChart(forecasts) {
        const options = {
            title: "forecast Temp. (C)(F)",
            hAxis: { title: "temperature", minValue:-50 },
            vAxis: { title: "date"},
            legend: "none"
        };
        let data = [["date", "temperatureC", "temperatureF"]];
        forecasts.map(forecast => data.push([forecast.date, forecast.temperatureC, forecast.temperatureF]));
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>BarChart</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <Chart
                                loader={<div>Loading Chart</div>}
                                chartType="BarChart"
                                data={data}
                                options={options}
                                width="100%"
                                height="400px"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : GChart.renderForecastsTable(this.state.forecasts);
        let charts = GChart.renderChart(this.state.forecasts);
        let imgs = [];
        for (var i = 0; i < 30; i++) {
            imgs.push(<img src={require('./FACE.png')} />);
        }
        return (
            <div>
                <h1 id="tabelLabel" >Weather forecast</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
                <p>This component demonstrates display a google chart.</p>
                {charts}
                <p />
                {imgs}
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
