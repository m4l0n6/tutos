export const getToken = () => {
  // Only run on client side
  if (typeof window === "undefined") return null
  
  try {
    // First check localStorage (most reliable)
    const tokenFromStorage = localStorage.getItem("access_token")
    if (tokenFromStorage) {
      console.log("[Auth] Token found in localStorage")
      return tokenFromStorage
    }

    // Then check cookies
    const tokenFromCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1]
    
    if (tokenFromCookie) {
      console.log("[Auth] Token found in cookie")
      return tokenFromCookie
    }

    console.log("[Auth] No token found")
    return null
  } catch (error) {
    console.error("[Auth] Error getting token:", error)
    return null
  }
}

export const saveToken = (token: string) => {
  try {
    // Save to localStorage
    localStorage.setItem("access_token", token)
    
    // Save to cookie (7 days expiry)
    document.cookie = `access_token=${token}; path=/; max-age=604800`
    
    console.log("[Auth] Token saved successfully")
    return true
  } catch (error) {
    console.error("[Auth] Error saving token:", error)
    return false
  }
}

export const logout = () => {
  try {
    // Remove from localStorage
    localStorage.removeItem("access_token")
    
    // Remove from cookies
    document.cookie = "access_token=; path=/; max-age=0"
    
    console.log("[Auth] Logged out successfully")
    
    // Redirect to login
    window.location.href = "/login"
  } catch (error) {
    console.error("[Auth] Error during logout:", error)
    window.location.href = "/login"
  }
}

export const isAuthenticated = () => {
  return !!getToken()
}
