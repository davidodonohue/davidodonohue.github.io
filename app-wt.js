document.addEventListener('DOMContentLoaded', () => {
    const weightInput = document.getElementById('weight');
const dateInput = document.getElementById('date');
const addDataButton = document.getElementById('addData');
const clearDataButton = document.getElementById('clearData');
const anchorDateInput = document.getElementById('anchorDate');
const percentageChangeSelect = document.getElementById('percentageChange');
const projectionLengthSelect = document.getElementById('projectionLength');
const updateProjectionButton = document.getElementById('updateProjection');

// Set the current date as the default value for date input
dateInput.valueAsDate = new Date();

let weightData = (JSON.parse(localStorage.getItem('weightData')) || [
    { x: new Date().getTime() - 86400000 * 7, y: 150 },
    { x: new Date().getTime() - 86400000 * 6, y: 151 },
    { x: new Date().getTime() - 86400000 * 5, y: 152 },
  ]).map((dataPoint) => ({
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
      { name: 'Projected Weight', data: [] },
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
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
  });
  
  chart.render();

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
      },
    });
  }
  
  
  
  // Calculate the projected weight based on the anchor date and percentage change
  function calculateProjectedWeight() {
    const anchorDate = anchorDateInput.value;
    const percentageChangePerWeek = parseFloat(percentageChangeSelect.value);
    const projectionLength = parseInt(projectionLengthSelect.value);
  
    if (!anchorDate) {
      return;
    }
  
    const anchorDateObj = new Date(anchorDate);
    const anchorTimestamp = anchorDateObj.getTime();
    const pastData = weightData.filter((dataPoint) => new Date(dataPoint.x).getTime() <= anchorTimestamp);
  const lastSevenDaysData = pastData.slice(Math.max(pastData.length - 7, 0));

  if (lastSevenDaysData.length === 0) {
    return;
  }

  const avgWeight = lastSevenDaysData.reduce((sum, dataPoint) => sum + dataPoint.y, 0) / lastSevenDaysData.length;
  const projectedData = [];

  for (let i = 1; i <= projectionLength; i++) {
    const projectedDate = new Date(anchorDateObj);
    projectedDate.setDate(projectedDate.getDate() + i);
    const projectedWeight = avgWeight * Math.pow(1 + percentageChangePerWeek / 7, i);
    projectedData.push({ x: projectedDate.getTime(), y: projectedWeight });
  }

  chart.updateSeries([
    { name: 'Weight', data: weightData.map((point) => ({ x: point.x, y: point.y })) },
    { name: 'Projected Weight', data: projectedData },
  ]);

  updateYAxisMinMax();
}

// Update the projection when the user clicks the "Update Projection" button
updateProjectionButton.addEventListener('click', calculateProjectedWeight);

// Initial update of the projected weight
calculateProjectedWeight();
});