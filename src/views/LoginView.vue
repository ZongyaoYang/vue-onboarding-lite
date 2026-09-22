<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();

const form = reactive({
    email: "",
    password: "",
});
const submitted = ref(false);
const isSubmitting = ref(false);
const serverError = ref('');


const errors = computed(() => {
    const e: { email?: string; password?: string } = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        e.email = 'Enter a valid email address.';
    }
    if (form.password.length === 0) {
        e.password = 'Enter your password.'
    }
    return e;
})

async function onSubmit() {
    if (isSubmitting.value) {
        return; //guard in code: ignore double-submits
    }
    submitted.value = true;
    if (Object.keys(errors.value).length > 0) {
        return;
    }

    isSubmitting.value = true; // disable ths button

    serverError.value = ''

    try {
        await auth.login(form.email, form.password)
        const redirect = route.query.redirect;

        const safe =
            typeof redirect === "string" &&
            redirect.startsWith("/") &&
            !redirect.startsWith("//");

        router.push(safe ? redirect : '/members');
    } catch (e) {
        serverError.value = e instanceof Error ? e.message : 'Login failed';
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<template>
    <h1>Sign in</h1>
    <form novalidate @submit.prevent="onSubmit">
        <div class="field">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" autocomplete="email"
                :aria-invalid="submitted && !!errors.email"
                :aria-describedby="submitted && errors.email ? 'email-error' : undefined" />
        </div>

        <div class="field">
            <label for="password">Password</label>
            <input id="password" v-model="form.password" type="password" autocomplete="current-password"
                :aria-invalid="submitted && !!errors.password"
                :aria-describedby="submitted && errors.password ? 'password-error' : 'undefined'" />
        </div>

        <p v-if="serverError" role="alert" class="error">{{ serverError }}</p>

        <button type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Signing in...' : 'Sign in' }}
        </button>
    </form>
</template>