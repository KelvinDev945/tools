---
layout: page
title: Compound Interest Formula Visualization
description: Interactive visualization showing how (1 + 1/n)^n approaches e as n increases
tags: [mathematics, visualization, interactive, calculus]
permalink: /compound-interest-visualization/
---

<style>
.visualization-container {
    max-width: 900px;
    margin: 0 auto;
}

.control-panel {
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
}

.input-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.input-group label {
    font-weight: 600;
    min-width: 120px;
}

.input-group input {
    padding: 0.5rem;
    border: 2px solid #dee2e6;
    border-radius: 4px;
    font-size: 1rem;
    width: 200px;
}

.input-group input:focus {
    outline: none;
    border-color: #3498db;
}

.results-display {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1.5rem;
}

.result-card {
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
    border: 2px solid #dee2e6;
    text-align: center;
}

.result-label {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 0.5rem;
}

.result-value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
}

.result-value.highlight {
    color: #e74c3c;
}

.chart-container {
    position: relative;
    height: 400px;
    margin-top: 2rem;
    background-color: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.formula-explanation {
    background-color: #e3f2fd;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    border-left: 4px solid #2196f3;
}

.formula {
    font-size: 1.3rem;
    font-family: 'Courier New', monospace;
    text-align: center;
    margin: 1rem 0;
    font-weight: bold;
}

@media (max-width: 768px) {
    .input-group {
        flex-direction: column;
        align-items: flex-start;
    }

    .input-group input {
        width: 100%;
    }

    .chart-container {
        height: 300px;
    }
}
</style>

<div class="visualization-container">
    <div class="formula-explanation">
        <h3>The Compound Interest Formula and Euler's Number</h3>
        <p>This visualization demonstrates one of the most beautiful limits in mathematics:</p>
        <div class="formula">lim<sub>n→∞</sub> (1 + 1/n)<sup>n</sup> = e</div>
        <p>As you increase n (the number of compounding periods per year with 100% annual interest), the result approaches Euler's number <strong>e ≈ 2.71828</strong>, which is fundamental to calculus and appears throughout mathematics and nature.</p>
    </div>

    <div class="control-panel">
        <div class="input-group">
            <label for="n-input">n (compounding periods):</label>
            <input type="number" id="n-input" value="1" min="1" step="1">
        </div>

        <div class="results-display">
            <div class="result-card">
                <div class="result-label">Current n</div>
                <div class="result-value" id="current-n">1</div>
            </div>
            <div class="result-card">
                <div class="result-label">Calculated Value</div>
                <div class="result-value" id="calculated-value">2.00000</div>
            </div>
            <div class="result-card">
                <div class="result-label">Euler's Number (e)</div>
                <div class="result-value highlight">2.71828</div>
            </div>
            <div class="result-card">
                <div class="result-label">Difference from e</div>
                <div class="result-value" id="difference">0.71828</div>
            </div>
            <div class="result-card">
                <div class="result-label">Error %</div>
                <div class="result-value" id="error-percent">26.42%</div>
            </div>
        </div>
    </div>

    <div class="chart-container">
        <canvas id="compoundChart"></canvas>
    </div>

    <div style="margin-top: 2rem;">
        <h3>Try These Values</h3>
        <p>See how the result changes as n increases:</p>
        <ul>
            <li><strong>n = 1</strong>: Annual compounding → (1 + 1/1)^1 = 2.00000</li>
            <li><strong>n = 12</strong>: Monthly compounding → (1 + 1/12)^12 ≈ 2.61304</li>
            <li><strong>n = 365</strong>: Daily compounding → (1 + 1/365)^365 ≈ 2.71457</li>
            <li><strong>n = 10000</strong>: → (1 + 1/10000)^10000 ≈ 2.71815</li>
            <li><strong>n = 1000000</strong>: → (1 + 1/1000000)^1000000 ≈ 2.71828</li>
        </ul>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script>
(function() {
    'use strict';

    const E = Math.E; // Euler's number
    const nInput = document.getElementById('n-input');
    const currentNDisplay = document.getElementById('current-n');
    const calculatedValueDisplay = document.getElementById('calculated-value');
    const differenceDisplay = document.getElementById('difference');
    const errorPercentDisplay = document.getElementById('error-percent');

    let chart = null;

    // Calculate (1 + 1/n)^n
    function calculateCompoundInterest(n) {
        return Math.pow(1 + 1/n, n);
    }

    // Update all displays
    function updateDisplay() {
        const n = parseInt(nInput.value) || 1;

        // Ensure n is at least 1
        if (n < 1) {
            nInput.value = 1;
            return;
        }

        const value = calculateCompoundInterest(n);
        const difference = Math.abs(E - value);
        const errorPercent = (difference / E) * 100;

        currentNDisplay.textContent = n.toLocaleString();
        calculatedValueDisplay.textContent = value.toFixed(5);
        differenceDisplay.textContent = difference.toFixed(5);
        errorPercentDisplay.textContent = errorPercent.toFixed(2) + '%';

        updateChart(n);
    }

    // Create or update chart
    function updateChart(n) {
        const ctx = document.getElementById('compoundChart').getContext('2d');

        // Generate data points from t=0 to t=n
        // x-axis: i/n where i=0, 1, ..., n (normalized time from 0 to 1)
        // y-axis: (1 + 1/n)^i (compound interest value at time i)
        const dataPoints = [];
        const rate = 1 / n; // Interest rate per period

        // For performance: limit points to max 500, but always include start and end
        const maxPoints = 500;
        let step = 1;

        if (n + 1 > maxPoints) {
            // Calculate step to sample approximately maxPoints
            step = Math.ceil(n / (maxPoints - 1));
        }

        // Generate points: i=0, step, 2*step, ..., n
        for (let i = 0; i <= n; i += step) {
            const x = i / n; // Normalized time (0 to 1)
            const y = Math.pow(1 + rate, i); // Compound interest value
            dataPoints.push({ x, y });
        }

        // Always ensure the final point (1, (1+1/n)^n) is included
        if (dataPoints[dataPoints.length - 1].x !== 1) {
            const x = 1;
            const y = Math.pow(1 + rate, n);
            dataPoints.push({ x, y });
        }

        // Destroy old chart if exists
        if (chart) {
            chart.destroy();
        }

        // Create new chart
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [
                    {
                        label: 'Compound Growth (1 + 1/n)^t',
                        data: dataPoints,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        borderWidth: 2,
                        pointRadius: Math.min(3, 200 / n), // Smaller points for larger n
                        pointHoverRadius: 5,
                        tension: 0.1
                    },
                    {
                        label: 'e (Continuous Compounding)',
                        data: [{x: 1, y: E}],
                        borderColor: '#e74c3c',
                        backgroundColor: '#e74c3c',
                        borderWidth: 0,
                        pointRadius: 8,
                        pointHoverRadius: 10,
                        pointStyle: 'circle',
                        showLine: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Compound Interest Growth Over Time (n = ' + n + ' periods)',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.datasetIndex === 0) {
                                    const x = context.parsed.x;
                                    const y = context.parsed.y;
                                    const t = Math.round(x * n);
                                    label += 'x=' + x.toFixed(3) + ', y=' + y.toFixed(5) + ' (period ' + t + ')';
                                } else {
                                    label += 'x=' + context.parsed.x.toFixed(3) + ', y=' + context.parsed.y.toFixed(5);
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        type: 'linear',
                        title: {
                            display: true,
                            text: 'Time (normalized, 0 to 1)',
                            font: {
                                size: 14
                            }
                        },
                        min: 0,
                        max: 1,
                        ticks: {
                            stepSize: 0.1
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Investment Value',
                            font: {
                                size: 14
                            }
                        },
                        min: 0.9,
                        max: Math.max(2.9, E + 0.2)
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // Event listener
    nInput.addEventListener('input', updateDisplay);

    // Initialize
    updateDisplay();
})();
</script>
