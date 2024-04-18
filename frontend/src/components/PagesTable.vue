<script setup lang="ts">
interface Props {
    numberPage?: number,
    links: {
        next?: string,
        prev?: string
    }
}

defineProps<Props>()
defineEmits(["next", "prev"])
</script>

<template>
    <div class="paginator">
        <button
            class="paginator__btn"
            v-if="links.prev"
            @click="$emit('prev')">&lt</button>

        <button class="paginator__btn">{{ numberPage }}</button>

        <button
            class="paginator__btn"
            v-if="links.next"
            @click="$emit('next')">&gt</button>
    </div>
</template>

<style scoped>
.paginator {
    display: flex;
    gap: 1em;
}

.paginator__btn {
    border: 2px solid var(--color-accent);
    background-color: transparent;
    padding: 10px 10px;
}
</style>
