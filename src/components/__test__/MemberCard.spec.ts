import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import MemberCard from "../MemberCard.vue";

const member = {
  id: 1,
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: { name: "Analytical" },
};

describe("MemberCard", () => {
  it("renders the member", () => {
    const wrapper = mount(MemberCard, { props: { member, selected: false } });
    expect(wrapper.text()).toContain("Ada Lovelace");
  });

  it('emits "select" with the id when clicked', async () => {
    const wrapper = mount(MemberCard, { props: { member, selected: false } });
    await wrapper.get('button').trigger('click');
    expect(wrapper.emitted('select')).toEqual([[1]]);
  });
});
