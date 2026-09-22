import { ref } from "vue";

export type Member = {
  id: number;
  name: string;
  email: string;
  company: { name: string };
};

const URL = "https://jsonplaceholder.typicode.com/users";

export function useMembers() {
  const members = ref<Member[]>([]);
  const status = ref<"loading" | "success" | "error">("loading");
  const error = ref("");

  async function load() {
    status.value = "loading";

    try {
      const res = await fetch(URL);
      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }
      members.value = await res.json();
      status.value = "success";
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Unknown error";
      status.value = "error";
    }
  }

  load();
  return { members, status, error, load };
}
