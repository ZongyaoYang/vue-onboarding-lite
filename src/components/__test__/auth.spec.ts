import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useAuthStore } from "@/stores/auth";

beforeEach(() => setActivePinia(createPinia()));

describe("auth store", () => {
  it("logs in with the right password", async () => {
    const auth = useAuthStore();
    await auth.login("a@b.com", "password");
    expect(auth.isLoggedIn).toBe(true);
  });

  it("rejects a wrong password", async () => {
    const auth = useAuthStore();
    await expect(auth.login("a@b.com", "nope")).rejects.toThrow();
    expect(auth.isLoggedIn).toBe(false);
  });
});
