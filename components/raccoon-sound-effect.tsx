"use client"

import { useEffect, useRef } from "react"

interface RaccoonSoundEffectProps {
  play: boolean
  volume?: number
  onEnded?: () => void
  soundUrl?: string
}

export default function RaccoonSoundEffect({
  play,
  volume = 0.7,
  onEnded,
  soundUrl = "/raccoon-revival.mp3",
}: RaccoonSoundEffectProps) {
  const hasAttemptedRef = useRef(false)

  useEffect(() => {
    if (play && !hasAttemptedRef.current) {
      hasAttemptedRef.current = true

      try {
        const audioElement = document.getElementById("raccoon-revival-audio") as HTMLAudioElement

        if (audioElement) {
          audioElement.volume = volume
          audioElement.currentTime = 0

          const playPromise = audioElement.play()

          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log("Raccoon revival audio playback started successfully")

                if (onEnded) {
                  const handleEnded = () => {
                    onEnded()
                    audioElement.removeEventListener("ended", handleEnded)
                  }
                  audioElement.addEventListener("ended", handleEnded)
                }
              })
              .catch((error) => {
                console.warn("Could not play raccoon revival audio:", error)
              })
          }
        } else {
          console.warn("Raccoon revival audio element not found")
        }
      } catch (error) {
        console.warn("Error in RaccoonSoundEffect component:", error)
      }

      const resetTimer = setTimeout(() => {
        hasAttemptedRef.current = false
      }, 1000)

      return () => clearTimeout(resetTimer)
    }
  }, [play, volume, onEnded, soundUrl])

  return null
}
