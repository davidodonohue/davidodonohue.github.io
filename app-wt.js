document.addEventListener('DOMContentLoaded', () => {
  const weightInput = document.getElementById('weight');
  const dateInput = document.getElementById('date');
  const addDataButton = document.getElementById('addData');
  const clearDataButton = document.getElementById('clearData');
  const anchorDateInput = document.getElementById('anchorDate');
  const projectionLengthSelect = document.getElementById('projectionLength');

  // Set the current date as the default value for date input
  const currentDate = new Date();
  const timezoneOffset = currentDate.getTimezoneOffset() * 60000;
  const localDate = new Date(currentDate - timezoneOffset);
  dateInput.valueAsDate = localDate;
  

  let weightData = (JSON.parse(localStorage.getItem('weightData')) || []).map((dataPoint) => ({
    x: new Date(dataPoint.x).getTime(),
    y: dataPoint.y,
  }));
  

// Initialize the chart
const chart = new ApexCharts(document.querySelector('#weightChart'), {
    chart: {
      type: 'line',
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    series: [
      { name: 'Weight', data: weightData.map((point) => ({ x: point.x, y: point.y })) },
      { name: '-1% Projected Weight', data: [] },
      { name: '-0.5% Projected Weight', data: [] },
      { name: '+0.5% Projected Weight', data: [] },
      { name: '+1% Projected Weight', data: [] },
    ],
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (val) {
          const date = new Date(val);
          const month = date.toLocaleString('default', { month: 'short' });
          return `${month} ${date.getDate()}, ${date.getFullYear()}`;
        },
      },
    },
    yaxis: {
      min: 0,
      labels: {
        formatter: yAxisFormatter
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
  });

    // Set the anchor date from local storage or use the current date
    const storedAnchorDate = localStorage.getItem('anchorDate');
    anchorDateInput.value = storedAnchorDate ? storedAnchorDate : new Date().toISOString().slice(0, 10);  

    // Set the graph length from local storage or use the default value (60 days)
const storedGraphLength = localStorage.getItem('graphLength');
projectionLengthSelect.value = storedGraphLength ? storedGraphLength : "60";

function yAxisFormatter(val) {
  const roundedVal = Math.round(val * 10) / 10;
  return parseFloat(roundedVal).toFixed(1);
}
  
  chart.render();
    // Update the Y-axis min and max values and show the projected data after rendering the chart
    updateYAxisMinMax();
    calculateProjectedWeight();

  addDataButton.addEventListener('click', () => {
    const weight = parseFloat(weightInput.value);
    const date = dateInput.value;
  
    if (!isNaN(weight) && date) {
      const timestamp = new Date(date).getTime();
  
      // Check if the date is already in the dataset
      if (weightData.some((dataPoint) => dataPoint.x === timestamp)) {
        alert('A data point with the same date already exists.');
        return;
      }
  
      const newDataPoint = { x: timestamp, y: weight };
      weightData.push(newDataPoint);
  
      // Update the chart options with new series data
      chart.updateOptions({
        series: [
          { name: 'Weight', data: weightData.map((point) => ({ x: point.x, y: point.y })) },
          { name: 'Projected Weight', data: chart.w.globals.series[1].data },
        ],
      });
      updateYAxisMinMax();
  
      localStorage.setItem('weightData', JSON.stringify(weightData));
    }
  });
  
  
  
  
  

  // Clear data from the chart and local storage
clearDataButton.addEventListener('click', () => {
    weightData = [];
  
    chart.updateSeries([
      { name: 'Weight', data: [] },
      { name: 'Projected Weight', data: chart.w.globals.series[1].data },
    ]);

    updateYAxisMinMax();
  
    localStorage.removeItem('weightData');
  });

  function updateYAxisMinMax() {
    const allDataPoints = [
      ...weightData.map((point) => point.y),
      ...(chart.w.globals.series[1]?.data || []).map((point) => point.y),
    ];
  
    if (allDataPoints.length === 0) {
      return;
    }
  
    const minY = Math.min(...allDataPoints) - 10;
    const maxY = Math.max(...allDataPoints) + 10;
  
    chart.updateOptions({
      yaxis: {
        min: minY,
        max: maxY,
        labels: {
          formatter: yAxisFormatter,
        },
      },
    });
  }
  
  
  
  // Calculate the projected weight based on the anchor date and percentage change
  function calculateProjectedWeight() {
    const anchorDate = anchorDateInput.value;
    const projectionLength = parseInt(projectionLengthSelect.value);
  
    if (!anchorDate) {
      return;
    }

    const percentages = [-0.01, -0.005, 0.005, 0.01];
    const projectedData = percentages.map(() => []);
  
    const anchorDateObj = new Date(anchorDate);
    const anchorTimestamp = anchorDateObj.getTime();
    const pastData = weightData.filter((dataPoint) => new Date(dataPoint.x).getTime() <= anchorTimestamp);
  const lastSevenDaysData = pastData.slice(Math.max(pastData.length - 7, 0));

  if (lastSevenDaysData.length === 0) {
    return;
  }

  const avgWeight = lastSevenDaysData.reduce((sum, dataPoint) => sum + dataPoint.y, 0) / lastSevenDaysData.length;

  for (let i = 1; i <= projectionLength; i++) {
    const projectedDate = new Date(anchorDateObj);
    projectedDate.setDate(projectedDate.getDate() + i);

    percentages.forEach((percentage, index) => {
      const projectedWeight = avgWeight * Math.pow(1 + percentage / 7, i);
      projectedData[index].push({ x: projectedDate.getTime(), y: projectedWeight });
    });
  }

  chart.updateSeries([
    { name: 'Weight', data: weightData.map((point) => ({ x: point.x, y: point.y })) },
    { name: '-1% Projected Weight', data: projectedData[0] },
    { name: '-0.5% Projected Weight', data: projectedData[1] },
    { name: '+0.5% Projected Weight', data: projectedData[2] },
    { name: '+1% Projected Weight', data: projectedData[3] },
  ]);

  updateYAxisMinMax();
}

  // Update the graph length when the user changes the "Graph Length" selection
  projectionLengthSelect.addEventListener('change', () => {
    const graphLength = parseInt(projectionLengthSelect.value);
    const now = new Date();
    const startTime = now.getTime() - graphLength * 86400000 / 2;

    chart.updateOptions({
      xaxis: {
        min: startTime,
        max: startTime + graphLength * 86400000,
      },
    });

    // Update the projection when the graph length changes
    calculateProjectedWeight();

        // Store the selected graph length in local storage
        localStorage.setItem('graphLength', projectionLengthSelect.value);
  });

  // Update the projection when the anchor date changes
  anchorDateInput.addEventListener('change', calculateProjectedWeight);

  // Initial update of the projected weight and graph length
  calculateProjectedWeight();
  projectionLengthSelect.dispatchEvent(new Event('change'));

  // Update the anchor date in local storage when it changes
  anchorDateInput.addEventListener('change', () => {
    localStorage.setItem('anchorDate', anchorDateInput.value);
    calculateProjectedWeight();
  });
});
