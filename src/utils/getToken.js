
import { LocalStorage, SessionStorage } from 'quasar'

export function setSession(name,info) {
  return SessionStorage.set(name, JSON.stringify(info))
    // return sessionStorage.setItem(name, JSON.stringify(info))
}

export function getSession(name) {
  // return sessionStorage.getItem(name)
  return SessionStorage.getItem(name)
}

export function removeSession(name) {
    return SessionStorage.remove(name)
  // return sessionStorage.removeItem(name)
}

export function clearSession() {
    return SessionStorage.clear()
  // return sessionStorage.clear()
}
