<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import MemberCard from "@/components/MemberCard.vue";
import { useMembers } from "@/composables/useMembers";

const auth = useAuthStore();
const router = useRouter();
const { members, status, error, load } = useMembers();

const search = ref("");
const debounced = ref("");
const selectedId = ref<number | null>(null);

watch(search, (value, _old, onCleanup) => {
  const timer = setTimeout(() => (debounced.value = value), 300);
  onCleanup(() => clearTimeout(timer));
});

const visible = computed(() => {
  const q = debounced.value.trim().toLowerCase();
  return members.value.filter((m) => m.name.toLowerCase().includes(q));
});

function logout() {
  auth.logout();
  router.push({ name: "login" });
}
</script>

<template>
  <header class="bar">
    <span>Singed in as {{ auth.email }}</span>
    <button type="button" @click="logout">Log out</button>
  </header>

  <h1>Members</h1>
  <label> Search <input v-model="search" type="search" /></label>

  <p v-if="status === 'loading'">Loading...</p>

  <div v-else-if="status === 'error'" role="alert">
    <p>Something went wrong: {{ error }}</p>
    <button type="button" @click="load">Retry</button>
  </div>

  <p v-else-if="members.length === 0">No members yet.</p>
  <p v-else-if="visible.length === 0">No members match "{{ debounced }}".</p>

  <ul>
    <MemberCard
      v-for="m in visible"
      :key="m.id"
      :member="m"
      :selected="m.id === selectedId"
      @select="selectedId = $event"
    />
  </ul>
</template>
