<template>
    <v-table class="my-4">
        <thead class="header">
            <tr>
                <th></th>
                <th v-for="col in header_row" :key="col">{{ col }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in 7" :key="row" :class="{ 'highlight-row': row - 1 === i }">
                <th class="header">{{ header_col[row - 1] }}</th>
                <td v-for="col in 7" :key="col" :class="getCellClass(row - 1, col - 1)">
                    {{ getCellContent(row - 1, col - 1) }}
                </td>
            </tr>
        </tbody>
    </v-table>

    <div class="pa-4 d-flex align-center">

        <v-btn @click="resetLoop" prepend-icon="mdi-reload" class="mx-1" variant="tonal">
            Reset
        </v-btn>

        <v-btn @click="togglePlayPause" class="mx-1" color="primary" variant="tonal">
            <template v-slot:prepend>
                <v-icon v-if="isPlaying" color="primary">mdi-pause-box-outline</v-icon>
                <v-icon v-if="!isPlaying" color="primary">mdi-play-box-outline</v-icon>

            </template>

            {{ isPlaying ? 'Stop' : 'Play' }}
        </v-btn>

        <v-spacer></v-spacer>

        <!-- <v-btn @click="prevIteration" class="mx-1" prepend-icon="mdi-chevron-left" color="primary" variant="tonal">
            Previous
        </v-btn> -->

        <v-btn @click="nextBtnCallback" class="" prepend-icon="mdi-chevron-right" color="primary" variant="tonal">
            Next
        </v-btn>

        <div class="ml-3 custom-font">
            <strong>i</strong>=<span>{{ i === -1 ? '&nbsp;' : i }}</span>, <strong>j</strong>=<span>{{ j === -1 ? '&nbsp;' : j }}</span>
        </div>
    </div>


    <MDC class="mb-4" :value="mdComputed" />
    <MDC class="animation-console" :value="consoleOutput" />


</template>

<script setup>
import { ref, nextTick } from 'vue';

const TIME_FOR_ITERATION = 200 // smaller value - faster animation

const header_row = ["00:00", "03:25", "06:50", "10:15", "13:40", "17:05", "20:30"]
const header_col = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

const md = `
\`\`\`python {-1}
temperatures = [[5, 10, 15, 20, 25, 30, 35], [8, 12, 18, 22, 27, 32, 37], ...]
for i in range(len(temperatures)):
    for j in range(len(temperatures[i])):
        print(f"day {i+1}, hour {j+1}: {temperatures[i][j]}°C")
\`\`\`
`

const consoleOutputTmpl = `
\`\`\`console height=200
{code}
\`\`\`
`

const mdComputed = computed(() => {
    return md.replace("{-1}", `{${codeLine.value + 1}}`);
});

const consoleOutput = computed(() => {
    return consoleOutputTmpl.replace("{code}", consoleLines.value.join("\n"));
})

// Reactive data
const temperatures = ref(CONSTANT_TEMPERATURES);
const i = ref(-1);
const j = ref(-1);
const codeLine = ref(-1);
const nextLine = ref(-1);
const interval = ref(null);
const isPlaying = ref(false);
const consoleLines = ref([]);

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

    // Add a delay to ensure the Shiki card has fully updated its content before scrolling
    nextTick(() => {
        setTimeout(() => {
            scrollToBottom();
        }, 25);
    });
};


const codeFlow = {
    0: () => { return 1; },
    1: () => firstStep(),
    2: () => { j.value++; return 3; },
    3: () => thirdStep()
};

const firstStep = () => {
    if (i.value === 6) {
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

const nextBtnCallback = () => {
    stopLoop()
    nextIteration()
};

const nextIteration = () => {
    if (nextLine.value === -1) {
        nextLine.value = 0
    }
    codeLine.value = nextLine.value
    if (nextLine.value === 4) {
        stopLoop();
        return;
    }
    nextLine.value = codeFlow[nextLine.value]();
};

// For future development
// const prevIteration = () => {
//     prevStep();
//     consoleLines.value.pop();
// };

// const prevStep = () => {
//     if (i.value > 0 || (i.value === 0 && j.value > 0)) {
//         j.value > 0 ? j.value-- : (j.value = 6, i.value--);
//     }
// };

const playLoop = () => {
    if (interval.value === null) {
        interval.value = setInterval(() => nextIteration(), TIME_FOR_ITERATION);
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

// Mutations for scrolling
function scrollToBottom() {
    const targetNode = document.querySelector('.animation-console .v-card');
    nextTick(() => {
        targetNode.scrollTo({
            top: targetNode.scrollHeight,
            behavior: 'smooth'
        });
    });

}

</script>

<style scoped>
.header {
    background-color: rgba(var(--v-theme-on-background), 0.05) !important;
}

:root {
    --bbyis: #1e90ff;
    --white: #ffffff;
}

.highlight-cell {
    background-color: rgba(var(--v-theme-secondary), 0.35) !important;
    font-weight: 500;
    font-size: 16px;
    transition: font 0.35s ease, background-color 0.35s ease;
}

.highlight-row {
    background-color: rgba(var(--v-theme-secondary), .3) !important;
}
</style>

<style>
.animation-console .v-card {
    padding: 0 !important;
    overflow: auto;
}
</style>