const tokenName = 'access_token'
const activePage = 'active-page'

export function saveToken(token: any) {
  localStorage.setItem(tokenName, JSON.stringify(token))
}

export function getToken(): any {
  return JSON.parse(localStorage.getItem(tokenName))
}

export function removeActivePage(): any {
  localStorage.removeItem(activePage)
}
