export const getToken = () => {
  if (typeof window === "undefined") return null
  const tokenFromCookie =
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1] ?? null

  if (tokenFromCookie) return tokenFromCookie

  return localStorage.getItem("access_token")
}

export const logout = () => {
  document.cookie = "access_token=; path=/; max-age=0"
  localStorage.removeItem("access_token")
  window.location.href = "/login"
}
