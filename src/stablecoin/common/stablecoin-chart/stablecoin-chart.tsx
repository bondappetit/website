import {
  color,
  create,
  unuseTheme,
  useTheme as amchartsUseTheme,
  addLicense
} from '@amcharts/amcharts4/core';
import {
  DateAxis,
  Legend,
  LineSeries,
  ValueAxis,
  XYChart
} from '@amcharts/amcharts4/charts';
import React, { useEffect, useRef } from 'react';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import amchartsdark from '@amcharts/amcharts4/themes/amchartsdark';
import { useTheme } from 'react-jss';

import { Theme } from 'src/common';
import { config } from 'src/config';

export type StablecoinChartProps = {
  className?: string;
};

amchartsUseTheme(am4themes_animated);
if (config.AMCHARTS_LICENCE) {
  addLicense(config.AMCHARTS_LICENCE);
}

const DATA = [
  {
    '— target supply value': '0',
    '— real supply value': '0',
    date: new Date(2021, 0, 1)
  },
  {
    '— real supply value': '1',
    date: new Date(2021, 1, 1)
  },
  {
    '— real supply value': '1',
    date: new Date(2021, 2, 1)
  },
  {
    '— real supply value': '1',
    date: new Date(2021, 3, 1)
  },
  {
    '— real supply value': '1',
    date: new Date(2021, 4, 1)
  },
  {
    '— real supply value': '1',
    date: new Date(2021, 5, 1)
  },
  {
    '— real supply value': '1',
    date: new Date(2021, 6, 1)
  },
  {
    '— real supply value': '1',
    date: new Date(2021, 7, 1)
  },
  {
    '— real supply value': '1.08',
    date: new Date(2021, 8, 1)
  },
  {
    date: new Date(2021, 9, 1)
  },
  {
    date: new Date(2021, 10, 1)
  },
  {
    date: new Date(2021, 11, 1)
  },

  {
    '— target supply value': '5',
    date: new Date(2022, 0, 1)
  },
  {
    date: new Date(2022, 1, 1)
  },
  {
    date: new Date(2022, 2, 1)
  },
  {
    date: new Date(2022, 3, 1)
  },
  {
    date: new Date(2022, 4, 1)
  },
  {
    date: new Date(2022, 5, 1)
  },
  {
    date: new Date(2022, 6, 1)
  },
  {
    date: new Date(2022, 7, 1)
  },
  {
    date: new Date(2022, 8, 1)
  },
  {
    date: new Date(2022, 9, 1)
  },
  {
    date: new Date(2022, 10, 1)
  },
  {
    '— target supply value': '10',
    date: new Date(2022, 11, 1)
  }

  // {
  //   '— target supply value': '700',
  //   date: new Date(2023, 0, 1)
  // },
  // {
  //   date: new Date(2023, 1, 1)
  // },
  // {
  //   date: new Date(2023, 2, 1)
  // },
  // {
  //   date: new Date(2023, 3, 1)
  // },
  // {
  //   date: new Date(2023, 4, 1)
  // },
  // {
  //   date: new Date(2023, 5, 1)
  // },
  // {
  //   date: new Date(2023, 6, 1)
  // },
  // {
  //   date: new Date(2023, 7, 1)
  // },
  // {
  //   date: new Date(2023, 8, 1)
  // },
  // {
  //   date: new Date(2023, 9, 1)
  // },
  // {
  //   date: new Date(2023, 10, 1)
  // },
  // {
  //   date: new Date(2023, 11, 1)
  // },

  // {
  //   '— target supply value': '1000',
  //   date: new Date(2024, 0, 1)
  // },
  // {
  //   date: new Date(2024, 1, 1)
  // },
  // {
  //   date: new Date(2024, 2, 1)
  // },
  // {
  //   date: new Date(2024, 3, 1)
  // },
  // {
  //   date: new Date(2024, 4, 1)
  // },
  // {
  //   date: new Date(2024, 5, 1)
  // },
  // {
  //   date: new Date(2024, 6, 1)
  // },
  // {
  //   date: new Date(2024, 7, 1)
  // },
  // {
  //   date: new Date(2024, 8, 1)
  // },
  // {
  //   date: new Date(2024, 9, 1)
  // },
  // {
  //   date: new Date(2024, 10, 1)
  // },
  // {
  //   date: new Date(2024, 11, 1)
  // },

  // {
  //   date: new Date(2025, 0, 1)
  // },
  // {
  //   date: new Date(2025, 1, 1)
  // },
  // {
  //   date: new Date(2025, 2, 1)
  // },
  // {
  //   date: new Date(2025, 3, 1)
  // },
  // {
  //   date: new Date(2025, 4, 1)
  // },
  // {
  //   date: new Date(2025, 5, 1)
  // },
  // {
  //   date: new Date(2025, 6, 1)
  // },
  // {
  //   date: new Date(2025, 7, 1)
  // },
  // {
  //   date: new Date(2025, 8, 1)
  // },
  // {
  //   date: new Date(2025, 9, 1)
  // },
  // {
  //   date: new Date(2025, 10, 1)
  // },
  // {
  //   '— target supply value': '1700',
  //   date: new Date(2025, 11, 1)
  // }
];

const DATA_FIELDS = [
  {
    valueY: '— target supply value',
    dashed: '4 4',
    color: 'grey',
    dateX: 'date'
  },
  {
    valueY: '— real supply value',
    dashed: '',
    color: 'primary',
    dateX: 'date'
  }
] as const;

const id = 'stablecoin-chart';

const isDashed = (value: unknown): value is { dashed: string } => {
  return typeof value === 'object' && value !== null && 'dashed' in value;
};

export const StablecoinChart: React.VFC<StablecoinChartProps> = (props) => {
  const chartRef = useRef<null | XYChart>(null);

  const theme = useTheme<Theme>();

  useEffect(() => {
    if (theme.currentTheme === 'dark') {
      amchartsUseTheme(amchartsdark);
    } else {
      unuseTheme(amchartsdark);
    }
  }, [theme.currentTheme]);

  useEffect(() => {
    chartRef.current = create(id, XYChart);

    const dateAxis = chartRef.current.xAxes.push(new DateAxis());
    dateAxis.renderer.minGridDistance = 40;
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.fontSize = 14;
    dateAxis.opacity = 0.4;
    dateAxis.baseInterval = { timeUnit: 'month', count: 1 };
    dateAxis.groupData = true;
    dateAxis.dateFormats.setKey('month', 'yyyy');
    dateAxis.gridIntervals.setAll([
      { timeUnit: 'year', count: 1 },
      { timeUnit: 'year', count: 2 },
      { timeUnit: 'year', count: 5 },
      { timeUnit: 'year', count: 10 },
      { timeUnit: 'year', count: 50 },
      { timeUnit: 'year', count: 100 }
    ]);

    DATA_FIELDS.forEach((field, index) => {
      if (!chartRef.current) return;

      const valueAxis = chartRef.current.yAxes.push(new ValueAxis());
      if (chartRef.current.yAxes.indexOf(valueAxis) !== 0) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        valueAxis.syncWithAxis = chartRef.current.yAxes.getIndex(0);
      }

      valueAxis.width = 30;

      valueAxis.min = 0;
      valueAxis.max = 10;
      valueAxis.strictMinMax = true;
      valueAxis.renderer.grid.template.disabled = true;
      valueAxis.renderer.labels.template.disabled = true;
      valueAxis.fontSize = 14;
      valueAxis.opacity = 0.4;

      const series = chartRef.current.series.push(new LineSeries());

      series.dataFields.valueY = field.valueY;
      series.dataFields.dateX = field.dateX;

      series.dummyData = {
        strokeDasharray: field.dashed
      };

      function createGrid(value: number) {
        const range = valueAxis.axisRanges.create();
        range.value = value;
        // eslint-disable-next-line no-template-curly-in-string
        range.label.text = value ? '${value}M' : '${value}';
      }

      if (!index) {
        createGrid(0);
        createGrid(2);
        createGrid(4);
        createGrid(6);
        createGrid(8);
        createGrid(10);
      }

      series.strokeDasharray = field.dashed;

      series.stroke = color(theme.colors[field.color]);

      series.dataFields.valueY = field.valueY;
      series.dataFields.dateX = field.dateX;
    });

    const legend = new Legend();

    chartRef.current.legend = legend;
    chartRef.current.legend.useDefaultMarker = true;

    const data = DATA_FIELDS.map((field) => {
      return {
        name: field.valueY,
        stroke: color(theme.colors[field.color]),
        fill: 'none',
        dashed: field.dashed
      };
    });

    chartRef.current.legend.markers.template.height = 4;
    chartRef.current.legend.markers.template.width = 24;
    chartRef.current.legend.itemContainers.template.clickable = false;
    chartRef.current.legend.itemContainers.template.focusable = false;

    data.forEach((field, index) => {
      const marker =
        chartRef.current?.legend.markers.template.children.getIndex(index);

      marker?.adapter.add('fill', () => color(theme.colors.secondary));

      marker?.adapter.add('strokeDasharray', (_, target) => {
        if (isDashed(target.dataItem?.dataContext)) {
          return target.dataItem?.dataContext?.dashed;
        }
      });

      if (marker) {
        marker.strokeWidth = 1;
        marker.strokeOpacity = 1;
        marker.opacity = 1;
        marker.stroke = field.stroke;
      }
    });

    chartRef.current.legend.data = data;

    return () => {
      chartRef.current?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    chartRef.current.data = DATA;
  }, []);

  return <div className={props.className} id={id} />;
};
