import React from 'react'
import { Chart } from 'primereact/chart';

function Performance() {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
            {
                label: 'All Data',
                data: [321, 42, 515, 412],
                backgroundColor: [
                    '#EC407A',
                    '#AB47BC',
                    '#42A5F5',
                    '#7E57C2',
                ],
                borderWidth: 1
            }
        ]
    };
    const options = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false
                }
            }
        }
    };


    return (
        <div>
            <Chart type="bar" style={{ height: "320px" }} width='100%' data={data} options={options} />
        </div>
    )
}

export default Performance