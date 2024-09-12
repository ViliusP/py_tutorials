<template>
    <div>
        <h2>2D Loop Visualization (7x7 Grid with Code and Fake Console)</h2>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th v-for="col in 7" :key="col">Hour {{ col }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in 7" :key="row" :class="{'highlight-row': row - 1 === i}">
                    <th>Day {{ row }}</th>
                    <td v-for="col in 7" :key="col" :class="getCellClass(row - 1, col - 1)"
                        @click="highlightCell(row - 1, col - 1)">
                        {{ getCellContent(row - 1, col - 1) }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="loop-values">
            <strong>i (Day)</strong>: <span>{{ i + 1 }}</span>, <strong>j (Hour)</strong>: <span>{{ j + 1 }}</span>
        </div>
        <div class="controls">
            <button @click="togglePlayPause">{{ isPlaying ? 'Stop' : 'Play' }}</button>
            <button @click="nextIteration">Next</button>
            <button @click="prevIteration">Previous</button>
            <button @click="resetLoop">Reset</button>
        </div>
        <pre class="code-container">
            <div v-for="(line, index) in codeLines" :key="index"
          :class="['code-line', { 'active-line': index === codeLine }]">{{ line }}</div>
        </pre>
        <div class="console">
            <div v-for="(line, index) in consoleLines" :key="index">{{ line }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// Constant temperatures array with fixed values
const CONSTANT_TEMPERATURES = [
    [5, 10, 15, 20, 25, 30, 35],
    [8, 12, 18, 22, 27, 32, 37],
    [6, 11, 16, 21, 26, 31, 36],
    [7, 13, 17, 23, 28, 33, 38],
    [9, 14, 19, 24, 29, 34, 39],
    [10, 15, 20, 25, 30, 35, 40],
    [11, 16, 21, 26, 31, 36, 41]
];

// Reactive data
const temperatures = ref(CONSTANT_TEMPERATURES);
const i = ref(-1);
const j = ref(-1);
const codeLine = ref(-1);
const nextLine = ref(-1);
const interval = ref(null);
const isPlaying = ref(false);
const consoleLines = ref([]);

const codeLines = ref(`
temperatures = [[5, 10, 15, 20, 25, 30, 35], [8, 12, 18, 22, 27, 32, 37], ...]
for i in range(7):
    for j in range(7):
        print(f"day {i+1}, hour {j+1}: {temperatures[i][j]}")
`.trim().split('\n'));

const getCellClass = (rowIndex, colIndex) => {
    return rowIndex === i.value && colIndex === j.value ? 'highlight-cell' : '';
};

const getCellContent = (rowIndex, colIndex) => {
    return `${temperatures.value[rowIndex][colIndex]}°C`;
};

const highlightCell = (rowIndex, colIndex) => {
    i.value = rowIndex;
    j.value = colIndex;
};

const updateConsole = () => {
    const consoleLine = `day ${i.value + 1}, hour ${j.value + 1}: ${temperatures.value[i.value][j.value]}°C`;
    consoleLines.value.push(consoleLine);
};

const clearConsole = () => {
    consoleLines.value.pop();
};

const codeFlow = {
    0: () => { return 1; },
    1: () => firstStep(),
    2: () => { j.value++; return 3; },
    3: () => thirdStep()
};

const firstStep = () => {
    if (i.value === 6) {
        stopLoop();
        return 4;
    }
    i.value++;
    j.value = -1;
    return 2;
};

const thirdStep = () => {
    highlightCell(i.value, j.value);
    updateConsole();
    if (j.value >= 6) {
        return 1;
    }
    return 2;
};

const nextIteration = () => {
    if (nextLine.value === 4) {
        return;
    }
    if (nextLine.value === -1) {
        nextLine.value = 0
    }
    codeLine.value = nextLine.value
    nextLine.value = codeFlow[nextLine.value]();
};

const prevIteration = () => {
    prevStep();
    clearConsole();
};

const prevStep = () => {
    if (i.value > 0 || (i.value === 0 && j.value > 0)) {
        j.value > 0 ? j.value-- : (j.value = 6, i.value--);
    }
};

const playLoop = () => {
    if (interval.value === null) {
        interval.value = setInterval(() => nextIteration(), 100);
        isPlaying.value = true;
    }
};

const stopLoop = () => {
    if (interval.value !== null) {
        clearInterval(interval.value);
        interval.value = null;
        isPlaying.value = false;
    }
};

const togglePlayPause = () => {
    if (interval.value === null) {
        playLoop();
    } else {
        stopLoop();
    }
};

const resetLoop = () => {
    stopLoop();
    i.value = j.value = -1;
    consoleLines.value = [];
    codeLine.value = nextLine.value = -1;
};

onMounted(() => {
    // Any additional setup needed on component mount
});
</script>



<style scoped>
table {
    margin: 20px auto;
    border-collapse: collapse;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

th,
td {
    width: 60px;
    height: 60px;
    border: 1px solid #333;
    text-align: center;
    font-size: 18px;
    transition: background-color 0.3s, color 0.3s;
}

th {
    background-color: #e0e0e0;
}

.highlight-cell {
    background-color: #1b940385 !important;
    color: #000;
}

.highlight-row {
    background-color: #ffcc8042;
}

.loop-values {
    font-size: 24px;
    margin-top: 20px;
}

.controls {
    margin: 20px 0;
}

.controls button {
    padding: 10px 20px;
    font-size: 16px;
    margin: 5px;
    cursor: pointer;
    border: none;
    background-color: #2196f3;
    color: white;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.controls button:hover {
    background-color: #1976d2;
}

.code-container {
    margin-top: 30px;
    font-family: 'Courier New', Courier, monospace;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
}

.code-line {
    padding-left: 40px;
    margin-bottom: 5px;
    min-height: 24px;
}

.active-line {
    background-color: #d3d3d3;
}

.console {
    border: 1px solid #ccc;
    background: #222;
    color: #fff;
    padding: 10px;
    font-family: 'Courier New', Courier, monospace;
    width: 60%;
    margin: 20px auto;
    height: 200px;
    overflow-y: auto;
}
</style>
