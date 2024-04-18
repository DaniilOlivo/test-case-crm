<script setup lang="ts">
import TableDeals from "./components/TableDeals.vue"
import PagesTable from "./components/PagesTable.vue"
import { ref, computed, onMounted } from "vue"
import type { ObjectDeal } from "./main.interfaces"
import axios from "axios"

const leads = ref<ObjectDeal>()

// Для простоты я не стал выводить url в конфиги или настраивать прокси для Vite
const urlApi = "http://127.0.0.1:5000/api/leads"

onMounted(async () => {
  const res = await axios.get(urlApi)
  leads.value = res.data
})

const objPages = computed(() => {
  return {
    prev: leads.value?._links.prev?.href,
    next: leads.value?._links.next?.href,
  }
})

async function geyQuery(e: KeyboardEvent) {
  const input = e.target as HTMLInputElement
  const res = await axios.get(urlApi, {
    params: {query: input.value}
  })
  leads.value = res.data
}

async function prev() {
  const res = await axios.get(objPages.value.prev!)
  leads.value = res.data
}

async function next() {
  const res = await axios.get(objPages.value.next!)
  leads.value = res.data
}
</script>

<template>
  <main>
    <input
      type="text"
      class="filter_input"
      placeholder="Поиск по полю"
      @keydown.enter="geyQuery">

    <TableDeals :deals="leads?._embedded.leads"></TableDeals>

    <PagesTable
      :number-page="leads?._page"
      :links="objPages"
      @prev="prev"
      @next="next"></PagesTable>
  </main>
</template>

<style scoped>
.filter_input {
  padding: 0.5em 2em;
  border-radius: 5px;
  border: 1px solid var(--color-border);
  align-self: flex-end;
}

.filter_input:focus, .filter_input:active {
  border-color: var(--color-accent);
}

main {
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
