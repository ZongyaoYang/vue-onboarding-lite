import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const email = ref<string | null>(null)
    const isLoggedIn = computed(() => email.value !== null)

    async function login(userEmail: string, password: string) {
        await new Promise(resolve => setTimeout(resolve, 800))
        if (password !== 'password') {
            throw new Error('Wrong password (hint: "password")')
        }

        email.value = userEmail;
    }


    function logout() {
        email.value = null
    }

    return { email, isLoggedIn, login, logout }
})