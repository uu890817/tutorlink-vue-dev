<template>
    <h1>
        <BarChart style="width: 40px; margin: 0 10px;" />營收管理
    </h1>
    <div>
        <div class="d-flex my-3 justify-content-center">
            <div class="revenue mx-3 p-3 text-center">
                <h3>分類營收</h3>
                <div>
                    <div id="chart"></div>
                </div>
            </div>
            <div class="revenue p-3 text-center">
                <h3>總營收</h3>
                <div class="totalPriceStyle">TWD <n-number-animation ref="numberAnimationInstRef" :from="0" :to="totalPrice"
                        show-separator />
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center">
            <div class="revenue mx-3 p-3 text-center">
                <h3>營收成長</h3>
                <div>
                    <div id="growingChart"></div>
                </div>
            </div>
            <div class="revenue p-3 text-center">
                <h3>各科營收</h3>
                <div>
                    <div id="projectChart"></div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup lang='js'>
import { ref, onMounted } from 'vue';
import { BarChart } from "@vicons/ionicons5"
import c3 from 'c3';
import 'c3/c3.css';
import tutorlink from '../../api/tutorlink.js'

const numberAnimationInstRef = ref(null);

const lessonsPrice = ref(0)
const videosPrice = ref(0)
const totalPrice = ref(0)
const chartElement = ref(null);
const subjectDataRevenue = ref([])

const fetchData = async () => {
    try {
        const response = await tutorlink.get("/purchase/manager/revenue");
        lessonsPrice.value = response.data.lessons;
        videosPrice.value = response.data.videos
        totalPrice.value = response.data.videos + response.data.lessons
        createChart(chartElement.value);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
const subjectData = async () => {
    try {
        const response = await tutorlink.get("/purchase/manager/subjectrevenue");
        subjectDataRevenue.value = response.data;
        init()
        createChart(chartElement.value);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
onMounted(() => {
    subjectData()
    fetchData()
});

const xAxis = ref(['x']);
const vedio = ref(['影音課程']);
const lesson = ref(['線上課程']);
const init = () => {
    subjectDataRevenue.value.forEach(item => {
        xAxis.value.push(item.subject);
        vedio.value.push(item.videos);
        lesson.value.push(item.lessons)
    })
}
function createChart(element) {
    const chart = c3.generate({
        bindto: "#chart",
        data: {
            columns: [
                ['線上課程', lessonsPrice.value],
                ['影音課程', videosPrice.value],
            ],
            type: 'donut',
            colors: {
                '線上課程': '#4a4e69',
                '影音課程': '#6c584c',
            },
        }
    });

    const growingChart = c3.generate({
        bindto: "#growingChart",
        data: {
            x: 'x',
            columns: [
                ['x', '2023-01-01', '2023-02-02', '2023-03-03', '2023-04-04', '2023-05-05', '2023-06-06'],
                ['月營收(千元)', 30, 200, 100, 300, 250, 350],
            ]
        },
        colors: {
            '月營收(千元)': '#6c584c',
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m'
                }
            }
        }
    });

    const projectChart = c3.generate({
        bindto: "#projectChart",
        data: {
            x: 'x',
            columns: [
                xAxis.value,
                vedio.value,
                lesson.value
            ],
            type: 'bar',
            colors: {
                '線上課程': '#4a4e69',
                '影音課程': '#6c584c',
            }
        },
        axis: {
            x: {
                type: 'category',
                categories: ['數學', '科學', '歷史', '英文', '日文', '藝術'],
            }
        }
    });
}


</script>
    
<style scoped>
thead tr th {
    color: white;
    font-weight: bold;
    background-color: #3a4c64;
    text-align: center;

}

tbody tr td {
    padding-left: 1%;
}

.table-body {
    margin-top: 10px;
}

.content-body {
    display: flex;
    align-items: center
}

input {
    margin-left: 10px;
}

button {
    margin-left: 10px;
    padding: 2px 5px 2px 5px;
    display: flex;
    align-items: center
}

h1 {
    margin: 5px 5px 15px 2%;
    padding: 5px;
}

.body {
    display: flex;
    flex-direction: column;
}

.title {
    background-color: #fbfbfb;
    width: 95%;
    margin: 0 auto;
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
    font-weight: bold;
    font-size: 20px;
}

.content {
    background-color: #fbfbfb;
    width: 95%;
    margin: 0 auto;
    padding: 12px;
    border-bottom: 1px solid #e0e0e0;
    font-weight: bold;
    font-size: 16px;
}

.revenue {
    background-color: #e9ecef;
    border-radius: 10px;
    width: 45%;
    height: 380px;
    box-shadow: 0 0 5px 1px #4a4e6942;
}

.totalPriceStyle {
    margin: 0 auto;
    margin-top: 90px;
    font-size: 74px;
    color: #4a4e69;
}
</style>