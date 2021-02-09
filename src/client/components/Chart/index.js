import React from 'react';
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const ChartContainer = styled.div`
  width: 500px;
`;

const Chart = ({chartType, categories, chartData, title, tollTipText}) => {
  const data = {
    series: [{
      name: tollTipText,
      data: chartData
    }],
    options: {
      chart: {
        type: chartType,
        height: 350,
        zoom: {
          enabled: false
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: categories,
      },
      title: {
          text: title,
          align: 'center',
          floating: true
      }
    },
  };


  return (
    <ChartContainer id="chart">
      <ReactApexChart options={data.options} series={data.series} type={chartType} height={350} />
    </ChartContainer>
  )
}

export default Chart;