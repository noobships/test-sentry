"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Monitor, Smartphone, Tablet, RotateCcw, ExternalLink, Zap, Moon, Sun, RefreshCw, AlertCircle } from 'lucide-react'
import { useTheme } from "next-themes"

const devices = [
  {
    id: "iphone-14-pro",
    name: "iPhone 14 Pro",
    type: "mobile",
    width: 393,
    height: 852,
    icon: Smartphone,
    category: "Mobile",
  },
  {
    id: "iphone-se",
    name: "iPhone SE",
    type: "mobile",
    width: 375,
    height: 667,
    icon: Smartphone,
    category: "Mobile",
  },
  {
    id: "samsung-s23",
    name: "Samsung Galaxy S23",
    type: "mobile",
    width: 360,
    height: 780,
    icon: Smartphone,
    category: "Mobile",
  },
  {
    id: "ipad-pro",
    name: "iPad Pro",
    type: "tablet",
    width: 1024,
    height: 1366,
    icon: Tablet,
    category: "Tablet",
  },
  {
    id: "ipad-air",
    name: "iPad Air",
    type: "tablet",
    width: 820,
    height: 1180,
    icon: Tablet,
    category: "Tablet",
  },
  {
    id: "macbook-pro",
    name: "MacBook Pro",
    type: "desktop",
    width: 1440,
    height: 900,
    icon: Monitor,
    category: "Desktop",
  },
  {
    id: "desktop-hd",
    name: "Desktop HD",
    type: "desktop",
    width: 1920,
    height: 1080,
    icon: Monitor,
    category: "Desktop",
  },
]

export default function ResponsiveDesignTester() {
  const [selectedDevice, setSelectedDevice] = useState(devices[0])
  const [url, setUrl] = useState("https://vercel.com")
  const [isLandscape, setIsLandscape] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [iframeError, setIframeError] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIframeError(false)
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }

  const toggleOrientation = () => {
    setIsLandscape(!isLandscape)
  }

  const currentWidth = isLandscape ? selectedDevice.height : selectedDevice.width
  const currentHeight = isLandscape ? selectedDevice.width : selectedDevice.height

  // Calculate responsive scaling for better display
  const getScaledDimensions = () => {
    const maxWidth = 800
    const maxHeight = 600

    let scaledWidth = currentWidth
    let scaledHeight = currentHeight
    let scale = 1

    if (selectedDevice.type === "desktop") {
      scale = Math.min(maxWidth / currentWidth, maxHeight / currentHeight, 0.6)
    } else if (selectedDevice.type === "tablet") {
      scale = Math.min(maxWidth / currentWidth, maxHeight / currentHeight, 0.8)
    } else {
      scale = Math.min(maxWidth / currentWidth, maxHeight / currentHeight, 1)
    }

    scaledWidth = currentWidth * scale
    scaledHeight = currentHeight * scale

    return { scaledWidth, scaledHeight, scale }
  }

  const { scaledWidth, scaledHeight, scale } = getScaledDimensions()

  const getDeviceFrame = () => {
    if (selectedDevice.type === "mobile") {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="relative flex-shrink-0">
            {/* Mobile Frame */}
            <div
              
              style={{
                width: scaledWidth,
                height: scaledHeight,
                padding: "16px",
              }}
            >
              {/* Screen Container */}
              <div
                className="bg-black rounded-[2rem] overflow-hidden relative"
                style={{
                  width: scaledWidth,
                  height: scaledHeight,
                }}
              >
               

                {/* Screen Content */}
                <div className="w-full h-full bg-white dark:bg-neutral-950 rounded-[1.8rem] overflow-hidden relative device-preview-container">
                  {iframeError ? (
                    <div className="flex items-center justify-center h-full bg-neutral-50 dark:bg-neutral-900">
                      <div className="text-center p-4">
                        <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Unable to load website</p>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src={url}
                      className="w-full h-full border-0 bg-white dark:bg-neutral-950 scrollable-no-bars"
                      title="Website Preview"
                      onError={() => setIframeError(true)}
                      style={{
                        transform: `scale(${scale})`,
                        transformOrigin: "top left",
                        width: `${100 / scale}%`,
                        height: `${100 / scale}%`,
                      }}
                    />
                  )}
                </div>
              </div>

              
            </div>
          </div>
        </div>
      )
    }

    if (selectedDevice.type === "tablet") {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="relative flex-shrink-0">
            {/* Tablet Frame */}
            <div
              
              style={{
                width: scaledWidth,
                height: scaledHeight,
                padding: "24px",
              }}
            >
              {/* Screen */}
              <div
                className="bg-white dark:bg-neutral-950 rounded-[1.2rem] overflow-hidden relative transition-colors duration-200 device-preview-container"
                style={{
                  width: scaledWidth,
                  height: scaledHeight,
                }}
              >
                {iframeError ? (
                  <div className="flex items-center justify-center h-full bg-neutral-50 dark:bg-neutral-900">
                    <div className="text-center p-4">
                      <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Unable to load website</p>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={url}
                    className="w-full h-full border-0 bg-white dark:bg-neutral-950 scrollable-no-bars"
                    title="Website Preview"
                    onError={() => setIframeError(true)}
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: "top left",
                      width: `${100 / scale}%`,
                      height: `${100 / scale}%`,
                    }}
                  />
                )}
              </div>

             
            </div>
          </div>
        </div>
      )
    }

    // Desktop
    return (
      <div className="flex items-center justify-center p-8">
        <div className="relative flex-shrink-0">
          {/* Monitor */}
          <div
           
            style={{
              width: scaledWidth,
              height: scaledHeight,
              padding: "24px",
            }}
          >
            {/* Screen */}
            <div
              className="bg-white dark:bg-neutral-950 rounded-lg overflow-hidden relative transition-colors duration-200 device-preview-container"
              style={{
                width: scaledWidth,
                height: scaledHeight,
              }}
            >
              {iframeError ? (
                <div className="flex items-center justify-center h-full bg-neutral-50 dark:bg-neutral-900">
                  <div className="text-center p-4">
                    <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Unable to load website</p>
                  </div>
                </div>
              ) : (
                <iframe
                  src={url}
                  className="w-full h-full border-0 bg-white dark:bg-neutral-950 scrollable-no-bars"
                  title="Website Preview"
                  onError={() => setIframeError(true)}
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                    width: `${100 / scale}%`,
                    height: `${100 / scale}%`,
                  }}
                />
              )}
            </div>
          </div>

          
        </div>
      </div>
    )
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-200">
      {/* Header */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-neutral-900 dark:bg-neutral-100 rounded-lg flex items-center justify-center transition-colors duration-200">
                <Zap className="w-4 h-4 text-white dark:text-neutral-900" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">ResponsiveView</h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Test your designs across devices</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* URL Input */}
            <Card className="p-6 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-colors duration-200">
              <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">Website URL</h2>
              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="pr-10 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200"
                  />
                  <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 dark:text-neutral-900 text-white transition-colors duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Preview Website"
                  )}
                </Button>
              </form>
            </Card>

            {/* Device Selection */}
            <Card className="p-6 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-colors duration-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Devices</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleOrientation}
                  className="text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Rotate
                </Button>
              </div>

              <div className="space-y-4">
                {["Mobile", "Tablet", "Desktop"].map((category) => (
                  <div key={category}>
                    <h3 className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">{category}</h3>
                    <div className="space-y-2">
                      {devices
                        .filter((device) => device.category === category)
                        .map((device) => {
                          const Icon = device.icon
                          return (
                            <button
                              key={device.id}
                              onClick={() => setSelectedDevice(device)}
                              className={`w-full p-3 rounded-lg border text-left transition-all duration-200 ${
                                selectedDevice.id === device.id
                                  ? "border-neutral-900 dark:border-neutral-100 bg-neutral-50 dark:bg-neutral-900"
                                  : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Icon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                                <div className="flex-1">
                                  <div className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                                    {device.name}
                                  </div>
                                  <div className="text-xs text-neutral-500 dark:text-neutral-500">
                                    {device.width} × {device.height}
                                  </div>
                                </div>
                              </div>
                            </button>
                          )
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Device Info */}
            <Card className="p-6 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-colors duration-200">
              <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">Current Device</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  >
                    {selectedDevice.name}
                  </Badge>
                </div>
                <Separator className="bg-neutral-200 dark:bg-neutral-800" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Width:</span>
                    <span className="font-mono text-neutral-900 dark:text-neutral-100">{currentWidth}px</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Height:</span>
                    <span className="font-mono text-neutral-900 dark:text-neutral-100">{currentHeight}px</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Orientation:</span>
                    <span className="text-neutral-900 dark:text-neutral-100">
                      {isLandscape ? "Landscape" : "Portrait"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Scale:</span>
                    <span className="font-mono text-neutral-900 dark:text-neutral-100">{Math.round(scale * 100)}%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-3">
            <Card className="border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 transition-colors duration-200 overflow-hidden">
              <div className="min-h-[700px] flex items-center justify-center">{getDeviceFrame()}</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
