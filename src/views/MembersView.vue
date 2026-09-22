<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const router = useRouter();

function logout() {
    auth.logout()
    router.push({ name: 'login'})
}

</script>

<template>
    <header class="bar">
        <span>Singed in as {{ auth.email }}</span>
        <button type="button" @click="logout">Log out</button>
    </header>
    <h1>Members (placeholder)</h1>
</template>