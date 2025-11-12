---
layout: page
title: Log Trick Algorithm Visualization
description: Interactive step-by-step visualization of the log trick optimization for bitwise OR subarray minimum difference problem
tags: [algorithms, visualization, interactive, bitwise, optimization, log-trick]
---

## Log Trick 算法可视化

### 问题描述

给定一个整数数组 `a` 和目标值 `k`，找出所有子数组的按位或（OR）结果中，与 `k` 的绝对差值最小的那个。

### Log Trick 优化原理

关键观察：对于任意元素 `x`，当我们不断将它与前面的元素进行 OR 操作时：
- 每次 OR 操作要么使结果**增大**（至少增加一个二进制位）
- 要么**保持不变**（x 是当前值的子集）

由于整数的二进制表示有限（最多 32 位），每个元素最多只能"增大"32 次，因此内层循环的总执行次数是 **O(n log U)**，其中 U 是数组中的最大值。

<div class="visualization-container">
  <div class="algorithm-explanation">
    <h3>算法步骤</h3>
    <pre><code>def minimumDifference(a: List[int], k: int) -> int:
    min_diff = inf
    for i, x in enumerate(a):
        min_diff = min(min_diff, abs(x - k))
        for j in range(i - 1, -1, -1):
            if (a[j] | x) == a[j]:  # x 是 a[j] 的子集
                break                # 提前退出
            a[j] |= x                # 更新 a[j]
            min_diff = min(min_diff, abs(a[j] - k))
    return min_diff</code></pre>
  </div>

  <div class="input-section">
    <h3>输入数据</h3>
    <div class="preset-buttons">
      <button id="preset1" class="btn">示例 1: [1,2,4,5], k=3</button>
      <button id="preset2" class="btn">示例 2: [1], k=10</button>
      <button id="preset3" class="btn">示例 3: [8,10,2], k=7</button>
    </div>
    <div class="custom-input">
      <label for="array-input">数组 (用逗号分隔):</label>
      <input type="text" id="array-input" placeholder="例如: 1,2,4,5">
      <label for="k-input">目标值 k:</label>
      <input type="number" id="k-input" placeholder="例如: 3">
      <button id="load-custom" class="btn btn-primary">加载自定义数据</button>
    </div>
  </div>

  <div class="control-buttons">
    <button id="prev-btn" class="btn" disabled>◀ 上一步</button>
    <button id="next-btn" class="btn" disabled>▶ 下一步</button>
    <button id="reset-btn" class="btn">↻ 重置</button>
  </div>

  <div class="status-message" id="status-message"></div>

  <div class="visualization-area">
    <div class="data-display">
      <h4>原始数组</h4>
      <div id="original-array" class="array-container"></div>
      <div class="target-display">
        <strong>目标值 k:</strong> <span id="target-k">-</span>
      </div>
    </div>

    <div class="current-state">
      <h4>当前状态</h4>
      <div class="state-grid">
        <div class="state-item">
          <span class="label">步骤:</span>
          <span id="step-number" class="value">0</span>
        </div>
        <div class="state-item">
          <span class="label">外层索引 i:</span>
          <span id="current-i" class="value">-</span>
        </div>
        <div class="state-item">
          <span class="label">当前元素 x:</span>
          <span id="current-x" class="value">-</span>
        </div>
        <div class="state-item">
          <span class="label">内层索引 j:</span>
          <span id="current-j" class="value">-</span>
        </div>
        <div class="state-item">
          <span class="label">a[j] 值:</span>
          <span id="current-aj" class="value">-</span>
        </div>
        <div class="state-item">
          <span class="label">最小差值:</span>
          <span id="min-diff" class="value">∞</span>
        </div>
      </div>
    </div>

    <div class="binary-display">
      <h4>二进制运算详情</h4>
      <div id="binary-operation" class="binary-op-container">
        <p class="placeholder">执行算法后将显示二进制运算过程</p>
      </div>
    </div>

    <div class="array-state-display">
      <h4>当前数组状态</h4>
      <div id="current-array" class="array-container"></div>
    </div>

    <div class="step-history">
      <h4>执行历史</h4>
      <div class="history-table-wrapper">
        <table id="history-table">
          <thead>
            <tr>
              <th>步骤</th>
              <th>i</th>
              <th>x</th>
              <th>j</th>
              <th>操作</th>
              <th>a[j]</th>
              <th>差值</th>
              <th>最小差值</th>
            </tr>
          </thead>
          <tbody id="history-body">
            <tr>
              <td colspan="8" class="placeholder">开始执行后将显示历史记录</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<style>
.visualization-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.algorithm-explanation {
  background: var(--card-bg, #fff);
  border: 1px solid var(--border-color, #ddd);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.algorithm-explanation pre {
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 15px;
  overflow-x: auto;
  margin: 10px 0;
}

.algorithm-explanation code {
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
}

.input-section {
  background: var(--card-bg, #fff);
  border: 1px solid var(--border-color, #ddd);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.preset-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.custom-input {
  display: grid;
  gap: 10px;
}

.custom-input label {
  font-weight: bold;
  margin-top: 10px;
}

.custom-input input {
  padding: 8px 12px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 4px;
  font-size: 14px;
}

.btn {
  padding: 10px 20px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 4px;
  background: var(--card-bg, #fff);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.btn:hover:not(:disabled) {
  background: var(--primary-color, #007bff);
  color: white;
  border-color: var(--primary-color, #007bff);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--primary-color, #007bff);
  color: white;
  border-color: var(--primary-color, #007bff);
}

.control-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}

.status-message {
  text-align: center;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  font-weight: bold;
  min-height: 20px;
}

.status-message.info {
  background: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.status-message.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.status-message.warning {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
}

.visualization-area > div {
  background: var(--card-bg, #fff);
  border: 1px solid var(--border-color, #ddd);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.data-display h4,
.current-state h4,
.binary-display h4,
.array-state-display h4,
.step-history h4 {
  margin-top: 0;
  margin-bottom: 15px;
  color: var(--primary-color, #007bff);
}

.array-container {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  padding: 10px 0;
}

.array-item {
  min-width: 60px;
  padding: 12px;
  background: #f8f9fa;
  border: 2px solid #dee2e6;
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
  font-family: 'Courier New', monospace;
}

.array-item.highlighted {
  background: #fff3cd;
  border-color: #ffc107;
}

.array-item.modified {
  background: #d4edda;
  border-color: #28a745;
}

.array-item small {
  display: block;
  font-size: 11px;
  color: #6c757d;
  margin-top: 4px;
}

.target-display {
  margin-top: 15px;
  padding: 10px;
  background: #e7f3ff;
  border-radius: 4px;
}

.state-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.state-item {
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.state-item .label {
  font-weight: bold;
  color: #495057;
}

.state-item .value {
  font-family: 'Courier New', monospace;
  font-size: 16px;
  color: #212529;
}

.binary-op-container {
  font-family: 'Courier New', monospace;
  font-size: 16px;
  line-height: 1.8;
}

.binary-op-container .placeholder {
  color: #6c757d;
  font-style: italic;
}

.binary-row {
  display: flex;
  align-items: center;
  margin: 8px 0;
  gap: 10px;
}

.binary-label {
  min-width: 100px;
  font-weight: bold;
  color: #495057;
}

.binary-value {
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
}

.binary-digit {
  display: inline-block;
  width: 20px;
  text-align: center;
}

.binary-digit.changed {
  background: #ffc107;
  color: #000;
  font-weight: bold;
  border-radius: 3px;
}

.binary-digit.set {
  color: #007bff;
  font-weight: bold;
}

.bit-positions {
  margin-top: 10px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
  font-size: 14px;
}

.break-notice {
  padding: 12px;
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  border-radius: 4px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.break-notice::before {
  content: '⚠';
  font-size: 24px;
}

.history-table-wrapper {
  overflow-x: auto;
}

#history-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

#history-table th {
  background: #f8f9fa;
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #dee2e6;
  position: sticky;
  top: 0;
}

#history-table td {
  padding: 8px 10px;
  border-bottom: 1px solid #dee2e6;
}

#history-table tr:hover {
  background: #f8f9fa;
}

#history-table tr.current-step {
  background: #fff3cd;
}

#history-table tr.break-step {
  background: #ffe8cc;
}

#history-table .placeholder {
  text-align: center;
  color: #6c757d;
  font-style: italic;
  padding: 20px;
}

@media (max-width: 768px) {
  .state-grid {
    grid-template-columns: 1fr;
  }

  .preset-buttons {
    flex-direction: column;
  }

  .control-buttons {
    flex-direction: column;
  }

  .array-container {
    justify-content: center;
  }
}
</style>

<script>
(function() {
  'use strict';

  // 状态管理
  let originalArray = [];
  let targetK = 0;
  let steps = [];
  let currentStepIndex = -1;

  // DOM 元素
  const elements = {
    preset1: document.getElementById('preset1'),
    preset2: document.getElementById('preset2'),
    preset3: document.getElementById('preset3'),
    arrayInput: document.getElementById('array-input'),
    kInput: document.getElementById('k-input'),
    loadCustom: document.getElementById('load-custom'),
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    resetBtn: document.getElementById('reset-btn'),
    statusMessage: document.getElementById('status-message'),
    originalArray: document.getElementById('original-array'),
    targetKDisplay: document.getElementById('target-k'),
    stepNumber: document.getElementById('step-number'),
    currentI: document.getElementById('current-i'),
    currentX: document.getElementById('current-x'),
    currentJ: document.getElementById('current-j'),
    currentAj: document.getElementById('current-aj'),
    minDiff: document.getElementById('min-diff'),
    binaryOperation: document.getElementById('binary-operation'),
    currentArray: document.getElementById('current-array'),
    historyBody: document.getElementById('history-body')
  };

  // 预设示例
  const presets = [
    { array: [1, 2, 4, 5], k: 3 },
    { array: [1], k: 10 },
    { array: [8, 10, 2], k: 7 }
  ];

  // 初始化事件监听
  elements.preset1.addEventListener('click', () => loadPreset(0));
  elements.preset2.addEventListener('click', () => loadPreset(1));
  elements.preset3.addEventListener('click', () => loadPreset(2));
  elements.loadCustom.addEventListener('click', loadCustomData);
  elements.prevBtn.addEventListener('click', previousStep);
  elements.nextBtn.addEventListener('click', nextStep);
  elements.resetBtn.addEventListener('click', reset);

  // 加载预设数据
  function loadPreset(index) {
    const preset = presets[index];
    originalArray = [...preset.array];
    targetK = preset.k;
    initializeVisualization();
  }

  // 加载自定义数据
  function loadCustomData() {
    try {
      const arrayStr = elements.arrayInput.value.trim();
      const kStr = elements.kInput.value.trim();

      if (!arrayStr || !kStr) {
        showMessage('请输入数组和目标值', 'warning');
        return;
      }

      const array = arrayStr.split(',').map(s => {
        const num = parseInt(s.trim());
        if (isNaN(num) || num < 0) {
          throw new Error('数组必须包含非负整数');
        }
        return num;
      });

      const k = parseInt(kStr);
      if (isNaN(k) || k < 0) {
        throw new Error('目标值必须是非负整数');
      }

      originalArray = array;
      targetK = k;
      initializeVisualization();
    } catch (error) {
      showMessage('输入格式错误: ' + error.message, 'warning');
    }
  }

  // 初始化可视化
  function initializeVisualization() {
    steps = generateSteps(originalArray, targetK);
    currentStepIndex = -1;

    displayOriginalArray();
    elements.targetKDisplay.textContent = targetK;

    reset();

    showMessage('数据已加载，点击"下一步"开始执行', 'info');
    elements.nextBtn.disabled = false;
  }

  // 生成所有执行步骤
  function generateSteps(nums, k) {
    const steps = [];
    const a = [...nums];
    let minDiff = Infinity;

    // 初始状态
    steps.push({
      type: 'init',
      i: -1,
      x: null,
      j: -1,
      array: [...a],
      minDiff: minDiff,
      operation: '初始化'
    });

    for (let i = 0; i < a.length; i++) {
      const x = nums[i]; // 保存原始值

      // 检查当前元素
      const currentDiff = Math.abs(x - k);
      const prevMinDiff = minDiff;
      minDiff = Math.min(minDiff, currentDiff);

      steps.push({
        type: 'check_current',
        i: i,
        x: x,
        j: -1,
        array: [...a],
        ajBefore: null,
        ajAfter: null,
        minDiff: minDiff,
        diff: currentDiff,
        operation: `检查 a[${i}] = ${x}`,
        minDiffChanged: minDiff !== prevMinDiff
      });

      // 内层循环
      for (let j = i - 1; j >= 0; j--) {
        const ajBefore = a[j];
        const orResult = ajBefore | x;

        // 检查是否是子集（break 条件）
        if (orResult === ajBefore) {
          steps.push({
            type: 'break',
            i: i,
            x: x,
            j: j,
            array: [...a],
            ajBefore: ajBefore,
            ajAfter: ajBefore,
            minDiff: minDiff,
            operation: `a[${j}] | ${x} = ${ajBefore}，无变化，跳出`,
            isBreak: true
          });
          break;
        }

        // 执行 OR 操作
        a[j] = orResult;
        const newDiff = Math.abs(a[j] - k);
        const prevMinDiff = minDiff;
        minDiff = Math.min(minDiff, newDiff);

        steps.push({
          type: 'or_operation',
          i: i,
          x: x,
          j: j,
          array: [...a],
          ajBefore: ajBefore,
          ajAfter: a[j],
          minDiff: minDiff,
          diff: newDiff,
          operation: `a[${j}] |= ${x}`,
          minDiffChanged: minDiff !== prevMinDiff
        });
      }
    }

    // 最终状态
    steps.push({
      type: 'final',
      i: -1,
      x: null,
      j: -1,
      array: [...a],
      minDiff: minDiff,
      operation: '算法完成'
    });

    return steps;
  }

  // 显示原始数组
  function displayOriginalArray() {
    elements.originalArray.innerHTML = originalArray.map((num, idx) =>
      `<div class="array-item">
        <div>${num}</div>
        <small>索引 ${idx}</small>
      </div>`
    ).join('');
  }

  // 显示当前数组状态
  function displayCurrentArray(array, highlightIndex = -1, modifiedIndices = []) {
    elements.currentArray.innerHTML = array.map((num, idx) => {
      let className = 'array-item';
      if (idx === highlightIndex) className += ' highlighted';
      if (modifiedIndices.includes(idx)) className += ' modified';

      return `<div class="${className}">
        <div>${num}</div>
        <small>索引 ${idx}</small>
      </div>`;
    }).join('');
  }

  // 显示二进制运算
  function displayBinaryOperation(step) {
    if (!step || step.type === 'init') {
      elements.binaryOperation.innerHTML = '<p class="placeholder">执行算法后将显示二进制运算过程</p>';
      return;
    }

    if (step.type === 'check_current') {
      const xBinary = toBinaryString(step.x);
      const setBits = getSetBits(step.x);

      elements.binaryOperation.innerHTML = `
        <div class="binary-row">
          <span class="binary-label">当前元素 x:</span>
          <span class="binary-value">${step.x} = ${xBinary}</span>
        </div>
        <div class="bit-positions">
          <strong>设置的位:</strong> [${setBits.join(', ')}]
        </div>
        <div style="margin-top: 10px; color: #6c757d;">
          计算差值: |${step.x} - ${targetK}| = ${step.diff}
        </div>
      `;
      return;
    }

    if (step.type === 'break' || step.type === 'or_operation') {
      const ajBeforeBinary = toBinaryString(step.ajBefore);
      const xBinary = toBinaryString(step.x);
      const ajAfterBinary = toBinaryString(step.ajAfter);
      const changedBits = getChangedBits(step.ajBefore, step.ajAfter);
      const setBitsAfter = getSetBits(step.ajAfter);

      let html = `
        <div class="binary-row">
          <span class="binary-label">a[${step.j}] (操作前):</span>
          <span class="binary-value">${step.ajBefore} = ${ajBeforeBinary}</span>
        </div>
        <div class="binary-row">
          <span class="binary-label">x (a[${step.i}]):</span>
          <span class="binary-value">${step.x} = ${xBinary}</span>
        </div>
        <div class="binary-row">
          <span class="binary-label">a[${step.j}] (操作后):</span>
          <span class="binary-value">${step.ajAfter} = ${highlightChangedBits(ajAfterBinary, changedBits)}</span>
        </div>
        <div class="bit-positions">
          <strong>操作后设置的位:</strong> [${setBitsAfter.join(', ')}]
        </div>
      `;

      if (step.type === 'break') {
        html += `
          <div class="break-notice">
            <div>
              <strong>子集检测</strong><br>
              ${step.x} 的所有位都已在 a[${step.j}] 中，无需继续，提前退出循环
            </div>
          </div>
        `;
      } else {
        html += `
          <div style="margin-top: 10px; color: #6c757d;">
            ${changedBits.length > 0 ? `变化的位: [${changedBits.join(', ')}]<br>` : ''}
            计算差值: |${step.ajAfter} - ${targetK}| = ${step.diff}
          </div>
        `;
      }

      elements.binaryOperation.innerHTML = html;
      return;
    }

    if (step.type === 'final') {
      elements.binaryOperation.innerHTML = `
        <div style="padding: 20px; text-align: center; background: #d4edda; border-radius: 4px;">
          <h4 style="margin-top: 0; color: #155724;">算法执行完成</h4>
          <p style="font-size: 18px; margin: 10px 0;">
            <strong>最小绝对差值: ${step.minDiff}</strong>
          </p>
        </div>
      `;
    }
  }

  // 转换为二进制字符串（8位）
  function toBinaryString(num) {
    return num.toString(2).padStart(8, '0');
  }

  // 获取设置的位
  function getSetBits(num) {
    const bits = [];
    for (let i = 0; i < 8; i++) {
      if ((num >> i) & 1) {
        bits.push(i);
      }
    }
    return bits;
  }

  // 获取变化的位
  function getChangedBits(before, after) {
    const changed = [];
    for (let i = 0; i < 8; i++) {
      const bitBefore = (before >> i) & 1;
      const bitAfter = (after >> i) & 1;
      if (bitBefore !== bitAfter) {
        changed.push(i);
      }
    }
    return changed;
  }

  // 高亮变化的位
  function highlightChangedBits(binaryStr, changedBits) {
    const bits = binaryStr.split('');
    return bits.map((bit, idx) => {
      const bitPosition = 7 - idx; // 从右往左数
      const isChanged = changedBits.includes(bitPosition);
      const isSet = bit === '1';

      let className = 'binary-digit';
      if (isChanged) className += ' changed';
      else if (isSet) className += ' set';

      return `<span class="${className}">${bit}</span>`;
    }).join('');
  }

  // 更新状态显示
  function updateStateDisplay(step) {
    if (!step) return;

    elements.stepNumber.textContent = currentStepIndex + 1;
    elements.currentI.textContent = step.i >= 0 ? step.i : '-';
    elements.currentX.textContent = step.x !== null ? step.x : '-';
    elements.currentJ.textContent = step.j >= 0 ? step.j : '-';
    elements.currentAj.textContent = step.j >= 0 && step.ajAfter !== undefined ? step.ajAfter : '-';
    elements.minDiff.textContent = step.minDiff === Infinity ? '∞' : step.minDiff;

    // 更新数组显示
    const highlightIndex = step.j >= 0 ? step.j : step.i;
    const modifiedIndices = [];

    if (step.type === 'or_operation' && step.j >= 0) {
      modifiedIndices.push(step.j);
    }

    displayCurrentArray(step.array, highlightIndex, modifiedIndices);
    displayBinaryOperation(step);
    updateHistoryTable();
  }

  // 更新历史表格
  function updateHistoryTable() {
    if (currentStepIndex < 0) {
      elements.historyBody.innerHTML = '<tr><td colspan="8" class="placeholder">开始执行后将显示历史记录</td></tr>';
      return;
    }

    const html = steps.slice(0, currentStepIndex + 1).map((step, idx) => {
      let rowClass = '';
      if (idx === currentStepIndex) rowClass = 'current-step';
      if (step.type === 'break') rowClass += ' break-step';

      const iVal = step.i >= 0 ? step.i : '-';
      const xVal = step.x !== null ? step.x : '-';
      const jVal = step.j >= 0 ? step.j : '-';
      const ajVal = step.ajAfter !== undefined ? step.ajAfter : '-';
      const diffVal = step.diff !== undefined ? step.diff : '-';
      const minDiffVal = step.minDiff === Infinity ? '∞' : step.minDiff;

      return `
        <tr class="${rowClass}">
          <td>${idx + 1}</td>
          <td>${iVal}</td>
          <td>${xVal}</td>
          <td>${jVal}</td>
          <td>${step.operation}</td>
          <td>${ajVal}</td>
          <td>${diffVal}</td>
          <td><strong>${minDiffVal}</strong></td>
        </tr>
      `;
    }).join('');

    elements.historyBody.innerHTML = html;
  }

  // 下一步
  function nextStep() {
    if (currentStepIndex >= steps.length - 1) {
      showMessage('已到达最后一步', 'info');
      return;
    }

    currentStepIndex++;
    const step = steps[currentStepIndex];
    updateStateDisplay(step);

    // 更新按钮状态
    elements.prevBtn.disabled = false;
    elements.nextBtn.disabled = currentStepIndex >= steps.length - 1;

    // 显示消息
    if (step.type === 'break') {
      showMessage('检测到子集关系，提前退出循环', 'warning');
    } else if (step.type === 'final') {
      showMessage('算法执行完成！', 'success');
    } else if (step.minDiffChanged) {
      showMessage('找到更小的差值！', 'success');
    } else {
      showMessage('', '');
    }
  }

  // 上一步
  function previousStep() {
    if (currentStepIndex <= 0) {
      showMessage('已到达第一步', 'info');
      return;
    }

    currentStepIndex--;
    const step = steps[currentStepIndex];
    updateStateDisplay(step);

    // 更新按钮状态
    elements.prevBtn.disabled = currentStepIndex <= 0;
    elements.nextBtn.disabled = false;

    showMessage('', '');
  }

  // 重置
  function reset() {
    if (steps.length === 0) {
      showMessage('请先加载数据', 'warning');
      return;
    }

    currentStepIndex = -1;

    // 重置显示
    elements.stepNumber.textContent = '0';
    elements.currentI.textContent = '-';
    elements.currentX.textContent = '-';
    elements.currentJ.textContent = '-';
    elements.currentAj.textContent = '-';
    elements.minDiff.textContent = '∞';

    displayCurrentArray(originalArray);
    elements.binaryOperation.innerHTML = '<p class="placeholder">执行算法后将显示二进制运算过程</p>';
    elements.historyBody.innerHTML = '<tr><td colspan="8" class="placeholder">开始执行后将显示历史记录</td></tr>';

    // 更新按钮状态
    elements.prevBtn.disabled = true;
    elements.nextBtn.disabled = false;

    showMessage('已重置，点击"下一步"开始执行', 'info');
  }

  // 显示消息
  function showMessage(message, type = '') {
    elements.statusMessage.textContent = message;
    elements.statusMessage.className = 'status-message' + (type ? ' ' + type : '');
  }

  // 初始化
  showMessage('请选择预设示例或输入自定义数据', 'info');
})();
</script>
