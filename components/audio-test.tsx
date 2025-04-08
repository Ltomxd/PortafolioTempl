"use client"
import { useState } from "react"

export default function AudioTest() {
  const [audioStatus, setAudioStatus] = useState("Not played yet")

  const testAudio = (path: string) => {
    setAudioStatus(`Trying to play ${path}...`)

    const audio = new Audio(path)
    audio.volume = 1.0

    audio.oncanplaythrough = () => {
      setAudioStatus(`${path} loaded successfully, playing...`)
    }

    audio.onended = () => {
      setAudioStatus(`${path} played successfully!`)
    }

    audio.onerror = (e) => {
      setAudioStatus(`Error loading ${path}: ${e}`)
    }

    audio
      .play()
      .then(() => {
        console.log(`${path} is playing`)
      })
      .catch((err) => {
        setAudioStatus(`Failed to play ${path}: ${err}`)
      })
  }

  // Return null to hide the component completely
  return null
}
