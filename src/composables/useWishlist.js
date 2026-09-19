import { reactive } from 'vue'

// A single shared reactive set persisted for the session.
const state = reactive({
  ids: new Set()
})

export function useWishlist() {
  function toggle(id) {
    if (state.ids.has(id)) {
      state.ids.delete(id)
    } else {
      state.ids.add(id)
    }
  }
  function isSaved(id) {
    return state.ids.has(id)
  }
  return { toggle, isSaved, count: () => state.ids.size }
}
