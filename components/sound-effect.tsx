"use client"

import { useEffect, useRef } from "react"

interface SoundEffectProps {
  play: boolean
  volume?: number
  onEnded?: () => void
  soundUrl?: string
}

export default function SoundEffect({
  play,
  volume = 1.0, // Increased volume to maximum
  onEnded,
  soundUrl = "/Aundio.wav", // Changed path to root directory
}: SoundEffectProps) {
  const hasAttemptedRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Verify the audio file exists
  const verifyAudioFile = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      fetch(url, { method: "HEAD" })
        .then((response) => {
          resolve(response.ok)
        })
        .catch(() => {
          resolve(false)
        })
    })
  }

  useEffect(() => {
    // Try to get the audio element from the DOM
    const domAudio = document.getElementById("thanos-snap-audio") as HTMLAudioElement
    if (domAudio) {
      audioRef.current = domAudio

      // Make sure the src is set correctly
      if (domAudio.src !== window.location.origin + soundUrl) {
        domAudio.src = soundUrl
      }
    }
  }, [soundUrl])

  useEffect(() => {
    if (play && !hasAttemptedRef.current) {
      hasAttemptedRef.current = true
      console.log("Attempting to play sound:", soundUrl)

      // First verify the audio file exists
      verifyAudioFile(soundUrl).then((exists) => {
        if (!exists) {
          console.error(`Audio file not found: ${soundUrl}`)
          // Try fallback audio paths in sequence
          const fallbackUrls = [
            "/Aundio.wav",

          ]

          // Try each fallback URL until one works
          tryFallbackAudio(fallbackUrls, 0)
        } else {
          playAudio(soundUrl)
        }
      })

      // Reset the flag after a delay
      setTimeout(() => {
        hasAttemptedRef.current = false
      }, 1000)
    }
  }, [play, volume, soundUrl])

  // Try fallback audio files one by one
  const tryFallbackAudio = (urls: string[], index: number) => {
    if (index >= urls.length) {
      console.error("All fallback audio files failed")
      return
    }

    const currentUrl = urls[index]
    console.log(`Trying fallback audio #${index + 1}:`, currentUrl)

    verifyAudioFile(currentUrl).then((exists) => {
      if (exists) {
        console.log("Fallback audio found:", currentUrl)
        playAudio(currentUrl)
      } else {
        // Try next fallback
        tryFallbackAudio(urls, index + 1)
      }
    })
  }

  const playAudio = (url: string) => {
    try {
      // Method 1: Try to play using the DOM audio element
      if (audioRef.current) {
        audioRef.current.volume = volume
        audioRef.current.currentTime = 0
        audioRef.current.src = url

        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Audio played successfully using DOM element")
            })
            .catch((error) => {
              console.warn("DOM audio playback failed:", error)
              playWithNewAudio(url)
            })
        } else {
          console.warn("Play promise is undefined, trying alternative method")
          playWithNewAudio(url)
        }
      } else {
        console.warn("No DOM audio element found, trying alternative method")
        playWithNewAudio(url)
      }
    } catch (error) {
      console.error("Error playing audio:", error)
      playWithNewAudio(url)
    }
  }

  // Alternative method using a new Audio object
  const playWithNewAudio = (url: string) => {
    try {
      console.log("Attempting to play with new Audio object:", url)
      const newAudio = new Audio(url)
      newAudio.volume = volume

      newAudio.onended = () => {
        if (onEnded) onEnded()
      }

      // Add error handling for loading
      newAudio.onerror = (e) => {
        console.error("Audio loading error:", e)
        console.error(`Failed to load audio: ${url}`)
      }

      newAudio
        .play()
        .then(() => {
          console.log("Audio played successfully using new Audio object")
        })
        .catch((error) => {
          console.error("New Audio playback failed:", error)

          // Last resort - try with a button click
          console.log("Attempting last resort method")
          const tempButton = document.createElement("button")
          tempButton.style.display = "none"
          document.body.appendChild(tempButton)

          tempButton.addEventListener("click", () => {
            const clickAudio = new Audio(url)
            clickAudio.volume = volume
            clickAudio.play().catch((e) => console.error("Even click-triggered audio failed:", e))
            document.body.removeChild(tempButton)
          })

          tempButton.click()
        })
    } catch (error) {
      console.error("Error creating new Audio:", error)
    }
  }

  return null
}
