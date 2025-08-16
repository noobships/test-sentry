"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Monitor,
  Smartphone,
  Tablet,
  RotateCcw,
  ExternalLink,
  Zap,
  Moon,
  Sun,
  RefreshCw,
  AlertCircle,
  Grid3X3,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from "lucide-react"
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
  const [selectedDevices, setSelectedDevices] = useState<string[]>([devices[0].id])
  const [url, setUrl] = useState("https://vercel.com")
  const [isLandscape, setIsLandscape] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [iframeError, setIframeError] = useState<Record<string, boolean>>({})
  const [mounted, setMounted] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "single">("grid")
  const [zoomLevel, setZoomLevel] = useState(1)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setIframeError({})
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000)
  }

  const toggleOrientation = () => {
    setIsLandscape(!isLandscape)
  }

  const toggleDeviceSelection = (deviceId: string) => {
    setSelectedDevices((prev) => {
      if (prev.includes(deviceId)) {
        return prev.filter((id) => id !== deviceId)
      } else {
        return [...prev, deviceId]
      }
    })
  }

  const selectAllDevices = () => {
    setSelectedDevices(devices.map((d) => d.id))
  }

  const clearAllDevices = () => {
    setSelectedDevices([])
  }

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3))
  }

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.25))
  }

  const resetZoom = () => {
    setZoomLevel(1)
  }

  const getScaledDimensions = (device: (typeof devices)[0]) => {
    const currentWidth = isLandscape ? device.height : device.width
    const currentHeight = isLandscape ? device.width : device.height

    // Base scale factors for different device types
    let baseScale = 1
    if (device.type === "desktop") {
      baseScale = viewMode === "single" ? 0.4 : 0.2
    } else if (device.type === "tablet") {
      baseScale = viewMode === "single" ? 0.6 : 0.3
    } else {
      baseScale = viewMode === "single" ? 0.8 : 0.5
    }

    // Apply zoom level
    const finalScale = baseScale * zoomLevel

    const scaledWidth = currentWidth * finalScale
    const scaledHeight = currentHeight * finalScale

    return { scaledWidth, scaledHeight, scale: finalScale, currentWidth, currentHeight }
  }

  const renderDeviceFrame = (device: (typeof devices)[0]) => {
    const { scaledWidth, scaledHeight, scale, currentWidth, currentHeight } = getScaledDimensions(device)
    const deviceError = iframeError[device.id]

    return (
      <div className="flex flex-col items-center space-y-3">
        {/* Device Info Header */}
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs font-medium">
            {device.name}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {currentWidth} × {currentHeight}
          </Badge>
        </div>

        {/* Device Preview - No Frames/Borders */}
        <div className="relative">
          <div
            className="bg-white dark:bg-neutral-950 shadow-lg rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800"
            style={{
              width: scaledWidth,
              height: scaledHeight,
            }}
          >
            {deviceError ? (
              <div className="flex items-center justify-center h-full bg-neutral-50 dark:bg-neutral-900">
                <div className="text-center p-4">
                  <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Unable to load website</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">Check URL or try again</p>
                </div>
              </div>
            ) : (
              <iframe
                src={url}
                className="w-full h-full border-0 bg-white dark:bg-neutral-950 scrollable-no-bars"
                title={`${device.name} Preview`}
                onError={() => setIframeError((prev) => ({ ...prev, [device.id]: true }))}
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                  width: `${100 / scale}%`,
                  height: `${100 / scale}%`,
                }}
              />
            )}
          </div>

          {/* Device Type Indicator */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-neutral-900 dark:bg-neutral-100 rounded-full flex items-center justify-center">
            <device.icon className="w-3 h-3 text-white dark:text-neutral-900" />
          </div>
        </div>

        {/* Quick Actions for Single View */}
        {viewMode === "single" && selectedDevices.length === 1 && (
          <div className="flex items-center space-x-2 mt-2">
            <Button variant="outline" size="sm" onClick={toggleOrientation} className="h-8 px-3 text-xs bg-transparent">
              <RotateCw className="w-3 h-3 mr-1" />
              Rotate
            </Button>
          </div>
        )}
      </div>
    )
  }

  if (!mounted) {
    return null
  }

  const selectedDeviceObjects = devices.filter((device) => selectedDevices.includes(device.id))

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

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                <Button variant="ghost" size="sm" onClick={zoomOut} disabled={zoomLevel <= 0.25} className="h-8 px-2">
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={resetZoom} className="h-8 px-3 text-xs font-mono">
                  {Math.round(zoomLevel * 100)}%
                </Button>
                <Button variant="ghost" size="sm" onClick={zoomIn} disabled={zoomLevel >= 3} className="h-8 px-2">
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 px-3"
                >
                  <Grid3X3 className="w-4 h-4 mr-1" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "single" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("single")}
                  className="h-8 px-3"
                >
                  <Maximize2 className="w-4 h-4 mr-1" />
                  Single
                </Button>
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
                  Rotate All
                </Button>
              </div>

              <div className="flex gap-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAllDevices}
                  className="flex-1 text-xs bg-transparent"
                >
                  Select All
                </Button>
                <Button variant="outline" size="sm" onClick={clearAllDevices} className="flex-1 text-xs bg-transparent">
                  Clear All
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
                          const isSelected = selectedDevices.includes(device.id)
                          return (
                            <div
                              key={device.id}
                              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                                isSelected
                                  ? "border-neutral-900 dark:border-neutral-100 bg-neutral-50 dark:bg-neutral-900"
                                  : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                              }`}
                            >
                              <Checkbox checked={isSelected} onCheckedChange={() => toggleDeviceSelection(device.id)} />
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
                          )
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Controls Info */}
            <Card className="p-6 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-colors duration-200">
              <h2 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">Controls</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  >
                    {selectedDevices.length} device{selectedDevices.length !== 1 ? "s" : ""}
                  </Badge>
                </div>
                <Separator className="bg-neutral-200 dark:bg-neutral-800" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Zoom:</span>
                    <span className="text-neutral-900 dark:text-neutral-100 font-mono">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">View Mode:</span>
                    <span className="text-neutral-900 dark:text-neutral-100 capitalize">{viewMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Orientation:</span>
                    <span className="text-neutral-900 dark:text-neutral-100">
                      {isLandscape ? "Landscape" : "Portrait"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Preview Area */}
          <div className="lg:col-span-3">
            <Card className="border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 transition-colors duration-200 overflow-hidden">
              <div className="min-h-[700px] p-8">
                {selectedDevices.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Monitor className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        No devices selected
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        Select one or more devices from the sidebar to start previewing
                      </p>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`${
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center"
                        : "flex flex-col items-center space-y-8"
                    }`}
                  >
                    {selectedDeviceObjects.map((device) => (
                      <div key={device.id} className="flex justify-center">
                        {renderDeviceFrame(device)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
