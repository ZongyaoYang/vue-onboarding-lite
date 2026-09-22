<script setup lang="ts">
import type { Member } from '@/composables/useMembers';

defineProps<{ member: Member; selected: boolean }>();
const emit = defineEmits<{ select: [id: number] }>();
</script>

<template>
    <li class="card" :class="{ selected }">
        <h2>{{ member.name }}</h2>
        <p>{{ member.email }} · {{ member.company.name }}</p>
        <button type="button" @click="emit('select', member.id)">
            {{ selected ? 'Selected' : 'Select' }}
        </button>
    </li>
</template>