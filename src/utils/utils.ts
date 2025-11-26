// utils/utils.ts

// ----------------------
// 1) Auth → extension (direct chrome.runtime)
// ----------------------
type AuthData = {
  email: string
  picture?: string
  accessToken: string
  refreshToken?: string
}

// Guard so TS knows chrome might exist
const hasChromeRuntime =
  typeof window !== "undefined" &&
  (window as any).chrome &&
  (window as any).chrome.runtime

export const sendDataToExtension = (userData: AuthData) => {
  console.log("Sending auth data to extension")
  console.log("Email being sent:", userData.email)

  if (!hasChromeRuntime || !(window as any).chrome.runtime.id) {
    console.log("Chrome extension API not available or extension not installed")
    return
  }

  try {
    ;(window as any).chrome.runtime.sendMessage(
      "lhlifmnncceikipmjamgeacngkkghhmm",
      { action: "saveAuthData", userData },
      (response: any) => {
        const err = (window as any).chrome.runtime.lastError
        if (err) {
          // Common when extension context is invalidated / reloaded
          if (err.message?.includes("Extension context invalidated")) {
            console.warn(
              "Extension context invalidated while sending auth data, ignoring:",
              err
            )
            return
          }
          console.log("Extension communication error:", err.message)
          return
        }
        console.log("Response from extension:", response)
      }
    )
  } catch (e: any) {
    if (e?.message?.includes("Extension context invalidated")) {
      console.warn("Caught invalidated context error (auth), ignoring:", e)
      return
    }
    console.error("sendDataToExtension failed:", e)
  }
}

// ----------------------
// 2) Generic page → extension bridge (via window.postMessage)
//    - used for auth *and* for photo upload
// ----------------------

// extend this as needed for other message types
export type ExtensionPagePayload =
  | AuthData
  | {
      type: "USER_BASE_PHOTO_UPLOAD"
      fileName: string
      mimeType: string
      dataUrl: string
    }
  | Record<string, any>

// make sure we only attach the FROM_EXTENSION listener once
let fromExtensionListenerAttached = false

export const sendMessageToExtension = (payload: ExtensionPagePayload) => {
  console.log("Full payload to extension:", payload)

  // Send a message to the content script
  window.postMessage({ type: "FROM_PAGE", payload }, "*")

  // Attach the listener only once
  if (!fromExtensionListenerAttached) {
    window.addEventListener(
      "message",
      (event: MessageEvent) => {
        if (!event.data || typeof event.data !== "object") return
        if (event.data.type === "FROM_EXTENSION") {
          console.log(
            "Web page received message from extension:",
            event.data.payload
          )
        }
      },
      false
    )
    fromExtensionListenerAttached = true
  }
}
