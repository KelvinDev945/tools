---
layout: page
title: 二维差分与前缀和可视化
description: 交互式可视化展示二维差分数组的构建过程和二维前缀和的计算，帮助理解矩阵区间更新问题
tags: [算法, 可视化, 交互式, 数据结构, 前缀和, 差分]
---

<style>
    .explanation {
        background-color: #e7f3ff;
        border-left: 4px solid #2196F3;
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 4px;
    }

    .control-panel {
        background-color: #f5f5f5;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 30px;
    }

    .input-group {
        margin-bottom: 15px;
    }

    .input-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: #333;
    }

    .input-group input {
        width: 100%;
        max-width: 100px;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
    }

    .query-input {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-bottom: 10px;
    }

    .query-input input {
        width: 60px;
        padding: 5px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .btn {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s;
    }

    .btn-primary {
        background-color: #2196F3;
        color: white;
    }

    .btn-primary:hover {
        background-color: #1976D2;
    }

    .btn-secondary {
        background-color: #757575;
        color: white;
    }

    .btn-secondary:hover {
        background-color: #616161;
    }

    .btn-success {
        background-color: #4CAF50;
        color: white;
    }

    .btn-success:hover {
        background-color: #45a049;
    }

    .btn-danger {
        background-color: #f44336;
        color: white;
    }

    .btn-danger:hover {
        background-color: #da190b;
    }

    .btn-small {
        padding: 4px 8px;
        font-size: 12px;
    }

    .visualization-container {
        display: flex;
        flex-direction: column;
        gap: 30px;
        margin-bottom: 30px;
    }

    .grid-section {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .grid-section h3 {
        margin-top: 0;
        margin-bottom: 15px;
        color: #333;
    }

    .grid-container {
        display: inline-grid;
        gap: 2px;
        background-color: #ddd;
        padding: 2px;
        border-radius: 4px;
    }

    .grid-cell {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border: 1px solid #ccc;
        font-weight: bold;
        transition: all 0.3s;
        font-size: 14px;
    }

    .grid-cell.highlight {
        background-color: #ffeb3b !important;
        transform: scale(1.1);
        box-shadow: 0 0 10px rgba(255, 235, 59, 0.5);
    }

    .grid-cell.query-area {
        background-color: #bbdefb;
    }

    .grid-cell.positive {
        background-color: #c8e6c9;
    }

    .grid-cell.negative {
        background-color: #ffcdd2;
    }

    .step-controls {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: center;
        margin: 20px 0;
        flex-wrap: wrap;
    }

    .step-info {
        padding: 10px 20px;
        background-color: #e3f2fd;
        border-radius: 4px;
        font-weight: bold;
        min-width: 200px;
        text-align: center;
    }

    .step-description {
        background-color: #fff3e0;
        padding: 15px;
        border-radius: 4px;
        margin-top: 15px;
        border-left: 4px solid #ff9800;
        min-height: 60px;
    }

    .examples-section {
        background-color: #f9f9f9;
        padding: 20px;
        border-radius: 8px;
        margin-top: 30px;
    }

    .example-btn {
        margin: 5px;
    }

    .queries-list {
        background-color: white;
        padding: 10px;
        border-radius: 4px;
        margin-top: 10px;
        max-height: 200px;
        overflow-y: auto;
    }

    .author-credit {
        font-size: 12px;
        color: #666;
        margin-top: 10px;
        font-style: italic;
    }

    @media (max-width: 768px) {
        .grid-cell {
            width: 40px;
            height: 40px;
            font-size: 12px;
        }

        .step-controls {
            flex-direction: column;
        }

        .btn {
            width: 100%;
        }
    }
</style>

<div class="explanation">
    <h2>算法说明</h2>
    <p><strong>二维差分</strong>是一种高效处理二维矩阵区间更新的算法技巧。通过构建差分数组，可以将一个矩形区域的值增加操作转化为O(1)的四次标记操作。</p>
    <p><strong>二维前缀和</strong>用于快速计算差分数组还原后的结果矩阵。通过累加计算，将差分数组转换为最终的结果。</p>
    <p><strong>时间复杂度</strong>：构建差分 O(m)，计算前缀和 O(n²)，其中m是查询数量，n是矩阵大小。</p>
    <div class="author-credit">
        算法来源：灵茶山艾府 (<a href="https://leetcode.cn/problems/increment-submatrices-by-one/solutions/2062756/er-wei-chai-fen-by-endlesscheng-mh0h/" target="_blank">LeetCode题解</a>)
    </div>
</div>

<div class="control-panel">
    <h3>控制面板</h3>

    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <div class="input-group">
            <label for="matrix-size">矩阵大小 (n×n):</label>
            <input type="number" id="matrix-size" min="2" max="8" value="3">
        </div>
    </div>

    <div class="input-group">
        <label>查询列表 (Queries):</label>
        <div id="queries-container"></div>
        <button class="btn btn-success btn-small" onclick="addQuery()">+ 添加查询</button>
    </div>

    <div style="margin-top: 15px;">
        <button class="btn btn-primary" onclick="runVisualization()">运行可视化</button>
        <button class="btn btn-secondary" onclick="resetAll()">重置</button>
    </div>

    <div class="input-group" style="margin-top: 20px;">
        <label>预设示例:</label>
        <div>
            <button class="btn btn-primary btn-small example-btn" onclick="loadExample(1)">示例 1 (单个查询)</button>
            <button class="btn btn-primary btn-small example-btn" onclick="loadExample(2)">示例 2 (多个不重叠)</button>
            <button class="btn btn-primary btn-small example-btn" onclick="loadExample(3)">示例 3 (重叠查询)</button>
        </div>
    </div>
</div>

<div class="step-controls">
    <button class="btn btn-secondary" id="prev-btn" onclick="prevStep()" disabled>← 上一步</button>
    <div class="step-info" id="step-info">准备就绪</div>
    <button class="btn btn-secondary" id="next-btn" onclick="nextStep()" disabled>下一步 →</button>
</div>

<div class="step-description" id="step-description">
    点击"运行可视化"开始，或选择一个预设示例。
</div>

<div class="visualization-container">
    <div class="grid-section">
        <h3>① 原始输入 (Queries)</h3>
        <div id="input-grid"></div>
    </div>

    <div class="grid-section">
        <h3>② 差分数组 (Diff Array)</h3>
        <div id="diff-grid"></div>
    </div>

    <div class="grid-section">
        <h3>③ 结果矩阵 (前缀和)</h3>
        <div id="result-grid"></div>
    </div>
</div>

<div class="examples-section">
    <h3>示例说明</h3>
    <ul>
        <li><strong>示例 1</strong>: 3×3矩阵，单个查询 [0,0,2,2]，展示基础的差分构建过程</li>
        <li><strong>示例 2</strong>: 4×4矩阵，两个不重叠的查询，展示多次操作如何累积</li>
        <li><strong>示例 3</strong>: 5×5矩阵，包含重叠查询，展示差分数组的叠加效果</li>
    </ul>
</div>

<script>
(function() {
    'use strict';

    // 全局状态
    let currentN = 3;
    let currentQueries = [];
    let steps = [];
    let currentStep = -1;

    // 预设示例
    const examples = {
        1: {
            n: 3,
            queries: [[0, 0, 2, 2]]
        },
        2: {
            n: 4,
            queries: [[0, 0, 1, 1], [2, 2, 3, 3]]
        },
        3: {
            n: 5,
            queries: [[0, 0, 2, 2], [1, 1, 3, 3], [2, 2, 4, 4]]
        }
    };

    // 初始化
    window.addEventListener('DOMContentLoaded', function() {
        loadExample(1);
    });

    // 加载示例
    window.loadExample = function(exampleNum) {
        const example = examples[exampleNum];
        currentN = example.n;
        currentQueries = JSON.parse(JSON.stringify(example.queries));

        document.getElementById('matrix-size').value = currentN;
        renderQueryInputs();
        resetVisualization();
    };

    // 渲染查询输入框
    function renderQueryInputs() {
        const container = document.getElementById('queries-container');
        container.innerHTML = '';

        currentQueries.forEach((query, index) => {
            const div = document.createElement('div');
            div.className = 'query-input';
            div.innerHTML = `
                <span>Query ${index + 1}:</span>
                <input type="number" min="0" max="${currentN-1}" value="${query[0]}"
                       onchange="updateQuery(${index}, 0, this.value)" placeholder="r1">
                <input type="number" min="0" max="${currentN-1}" value="${query[1]}"
                       onchange="updateQuery(${index}, 1, this.value)" placeholder="c1">
                <input type="number" min="0" max="${currentN-1}" value="${query[2]}"
                       onchange="updateQuery(${index}, 2, this.value)" placeholder="r2">
                <input type="number" min="0" max="${currentN-1}" value="${query[3]}"
                       onchange="updateQuery(${index}, 3, this.value)" placeholder="c2">
                <button class="btn btn-danger btn-small" onclick="removeQuery(${index})">删除</button>
            `;
            container.appendChild(div);
        });
    }

    // 更新查询
    window.updateQuery = function(index, pos, value) {
        currentQueries[index][pos] = parseInt(value);
    };

    // 添加查询
    window.addQuery = function() {
        currentQueries.push([0, 0, currentN - 1, currentN - 1]);
        renderQueryInputs();
    };

    // 删除查询
    window.removeQuery = function(index) {
        currentQueries.splice(index, 1);
        renderQueryInputs();
    };

    // 创建网格
    function createGrid(container, n, withPadding = false) {
        const size = withPadding ? n + 2 : n;
        container.style.gridTemplateColumns = `repeat(${size}, 50px)`;
        container.innerHTML = '';

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const cell = document.createElement('div');
                cell.className = 'grid-cell';
                cell.id = `${container.id}-${i}-${j}`;
                cell.textContent = '0';
                container.appendChild(cell);
            }
        }
    }

    // 更新网格值
    function updateGrid(container, matrix, highlights = []) {
        const cells = container.querySelectorAll('.grid-cell');
        matrix.forEach((row, i) => {
            row.forEach((val, j) => {
                const index = i * row.length + j;
                const cell = cells[index];
                if (cell) {
                    cell.textContent = val;
                    cell.className = 'grid-cell';

                    // 应用颜色
                    if (val > 0 && container.id === 'diff-grid') {
                        cell.classList.add('positive');
                    } else if (val < 0 && container.id === 'diff-grid') {
                        cell.classList.add('negative');
                    } else if (val > 0 && container.id === 'result-grid') {
                        const intensity = Math.min(val * 30, 200);
                        cell.style.backgroundColor = `rgba(76, 175, 80, ${intensity / 255})`;
                    }
                }
            });
        });

        // 应用高亮
        highlights.forEach(([i, j]) => {
            const index = i * matrix[0].length + j;
            const cell = cells[index];
            if (cell) {
                cell.classList.add('highlight');
            }
        });
    }

    // 生成步骤
    function generateSteps(n, queries) {
        const steps = [];
        const diff = Array(n + 2).fill(0).map(() => Array(n + 2).fill(0));

        // 初始化步骤
        steps.push({
            description: '初始化：创建 (n+2)×(n+2) 的差分数组，所有元素初始化为0',
            inputHighlights: [],
            diff: JSON.parse(JSON.stringify(diff)),
            diffHighlights: [],
            result: Array(n).fill(0).map(() => Array(n).fill(0)),
            resultHighlights: []
        });

        // 处理每个查询
        queries.forEach((query, qIndex) => {
            const [r1, c1, r2, c2] = query;

            // 标记查询区域
            const queryArea = [];
            for (let i = r1; i <= r2; i++) {
                for (let j = c1; j <= c2; j++) {
                    queryArea.push([i, j]);
                }
            }

            steps.push({
                description: `Query ${qIndex + 1}: 处理矩形区域 [${r1},${c1}] 到 [${r2},${c2}]`,
                inputHighlights: queryArea,
                diff: JSON.parse(JSON.stringify(diff)),
                diffHighlights: [],
                result: Array(n).fill(0).map(() => Array(n).fill(0)),
                resultHighlights: []
            });

            // 四个角点操作
            const operations = [
                { pos: [r1 + 1, c1 + 1], val: 1, desc: '左上角 +1' },
                { pos: [r1 + 1, c2 + 2], val: -1, desc: '右上角的右边 -1' },
                { pos: [r2 + 2, c1 + 1], val: -1, desc: '左下角的下边 -1' },
                { pos: [r2 + 2, c2 + 2], val: 1, desc: '右下角的右下 +1' }
            ];

            operations.forEach(op => {
                diff[op.pos[0]][op.pos[1]] += op.val;
                steps.push({
                    description: `${op.desc}：diff[${op.pos[0]}][${op.pos[1]}] ${op.val > 0 ? '+' : ''}${op.val}`,
                    inputHighlights: queryArea,
                    diff: JSON.parse(JSON.stringify(diff)),
                    diffHighlights: [op.pos],
                    result: Array(n).fill(0).map(() => Array(n).fill(0)),
                    resultHighlights: []
                });
            });
        });

        // 计算前缀和
        steps.push({
            description: '开始计算二维前缀和，将差分数组还原为结果矩阵',
            inputHighlights: [],
            diff: JSON.parse(JSON.stringify(diff)),
            diffHighlights: [],
            result: Array(n).fill(0).map(() => Array(n).fill(0)),
            resultHighlights: []
        });

        const result = Array(n).fill(0).map(() => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                diff[i + 1][j + 1] += diff[i + 1][j] + diff[i][j + 1] - diff[i][j];
                result[i][j] = diff[i + 1][j + 1];

                steps.push({
                    description: `计算 result[${i}][${j}] = ${result[i][j]}`,
                    inputHighlights: [],
                    diff: JSON.parse(JSON.stringify(diff)),
                    diffHighlights: [[i + 1, j + 1]],
                    result: JSON.parse(JSON.stringify(result)),
                    resultHighlights: [[i, j]]
                });
            }
        }

        steps.push({
            description: '✅ 完成！所有查询已处理，结果矩阵已生成',
            inputHighlights: [],
            diff: JSON.parse(JSON.stringify(diff)),
            diffHighlights: [],
            result: JSON.parse(JSON.stringify(result)),
            resultHighlights: []
        });

        return steps;
    }

    // 运行可视化
    window.runVisualization = function() {
        currentN = parseInt(document.getElementById('matrix-size').value);

        if (currentQueries.length === 0) {
            alert('请至少添加一个查询！');
            return;
        }

        // 验证查询
        for (let i = 0; i < currentQueries.length; i++) {
            const q = currentQueries[i];
            if (q[0] > q[2] || q[1] > q[3]) {
                alert(`Query ${i + 1} 无效：起点必须小于等于终点`);
                return;
            }
            if (q[0] < 0 || q[2] >= currentN || q[1] < 0 || q[3] >= currentN) {
                alert(`Query ${i + 1} 超出范围`);
                return;
            }
        }

        // 生成步骤
        steps = generateSteps(currentN, currentQueries);
        currentStep = 0;

        // 创建网格
        createGrid(document.getElementById('input-grid'), currentN, false);
        createGrid(document.getElementById('diff-grid'), currentN + 2, true);
        createGrid(document.getElementById('result-grid'), currentN, false);

        // 显示第一步
        showStep(0);
        updateButtons();
    };

    // 显示步骤
    function showStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= steps.length) return;

        const step = steps[stepIndex];

        // 更新描述
        document.getElementById('step-description').textContent = step.description;
        document.getElementById('step-info').textContent = `步骤 ${stepIndex + 1} / ${steps.length}`;

        // 更新网格
        updateGrid(document.getElementById('input-grid'),
                   Array(currentN).fill(0).map(() => Array(currentN).fill(0)),
                   step.inputHighlights);
        updateGrid(document.getElementById('diff-grid'), step.diff, step.diffHighlights);
        updateGrid(document.getElementById('result-grid'), step.result, step.resultHighlights);

        // 标记输入区域的查询区域
        if (step.inputHighlights.length > 0) {
            const inputCells = document.getElementById('input-grid').querySelectorAll('.grid-cell');
            step.inputHighlights.forEach(([i, j]) => {
                const index = i * currentN + j;
                if (inputCells[index]) {
                    inputCells[index].classList.add('query-area');
                }
            });
        }
    }

    // 上一步
    window.prevStep = function() {
        if (currentStep > 0) {
            currentStep--;
            showStep(currentStep);
            updateButtons();
        }
    };

    // 下一步
    window.nextStep = function() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            showStep(currentStep);
            updateButtons();
        }
    };

    // 更新按钮状态
    function updateButtons() {
        document.getElementById('prev-btn').disabled = currentStep <= 0;
        document.getElementById('next-btn').disabled = currentStep >= steps.length - 1;
    }

    // 重置可视化
    function resetVisualization() {
        steps = [];
        currentStep = -1;
        document.getElementById('input-grid').innerHTML = '';
        document.getElementById('diff-grid').innerHTML = '';
        document.getElementById('result-grid').innerHTML = '';
        document.getElementById('step-description').textContent = '点击"运行可视化"开始，或选择一个预设示例。';
        document.getElementById('step-info').textContent = '准备就绪';
        updateButtons();
    }

    // 重置全部
    window.resetAll = function() {
        loadExample(1);
    };
})();
</script>
