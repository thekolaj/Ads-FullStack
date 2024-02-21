import {
  clearStoredAccessToken,
  getStoredAccessToken,
  getUserIdFromToken,
  getUserAdminFromToken,
  storeAccessToken,
} from '@/utils/auth'
import { trpc } from '@/trpc'
import { computed, ref } from 'vue'

// Auth token is string OR null.
const authToken = ref(getStoredAccessToken(localStorage))

export const authUserId = computed(() =>
  authToken.value ? getUserIdFromToken(authToken.value) : null
)

export const authUserAdmin = computed(() =>
  authToken.value ? getUserAdminFromToken(authToken.value) : null
)

export const isLoggedIn = computed(() => !!authToken.value)

/**
 * Log in a user and store the access token in the store and in the local storage.
 */
export async function login(userLogin: { email: string; password: string }) {
  const { accessToken } = await trpc.user.login.mutate(userLogin)

  authToken.value = accessToken
  storeAccessToken(localStorage, accessToken)
}

export function logout() {
  authToken.value = null
  clearStoredAccessToken(localStorage)
}

export const signup = trpc.user.signup.mutate
