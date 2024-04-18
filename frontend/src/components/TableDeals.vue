<script setup lang="ts">
import type { Deal } from "../main.interfaces"

defineProps<{
    deals?: Deal[]
}>()

function getDate(timestamp: number) {
    const date = new Date(timestamp * 1000)

    const day = date.getDay()
    const strDay = day > 9 ? day : "0" + day

    const month = date.getMonth()
    const strMonth = month > 9 ? month : "0" + month

    return `${strDay}.${strMonth}.${date.getFullYear()}`
}
</script>

<template>
    <table class="table-deals">
        <tr class="table-deals-head">
            <td>Название</td>

            <td>Бюджет</td>

            <td>Статус</td>

            <td>Отвественный</td>

            <td>Дата создания</td>
        </tr>

        <tr v-for="deal in deals" :key="deal.id" class="table-deals-row">
            <td>{{deal.name}}</td>

            <td>{{ deal.price }} ₽</td>

            <td>{{ deal.status_name }}</td>

            <td>{{ deal.responsible_user_name }}</td>

            <td>{{ getDate(deal.created_at) }}</td>
        </tr>
    </table>
</template>

<style scoped>
.table-deals {
    border-collapse: collapse;
    box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.table-deals td {
    padding: 1.5em 3em;
    text-align: center;
} 

.table-deals-head {
    font-size: 20px;
    font-family: "Title";
    background: rgb(55,160,255);
    background: linear-gradient(137deg, rgba(55,160,255,1) 35%, rgba(176,203,255,1) 100%);
}

.table-deals-row {
    transition: 200ms;
}

.table-deals-row:nth-child(even) {
    background-color: white;
}

.table-deals-row:hover {
    background-color: rgba(176,203,255, 0.5);
}

</style>
