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
  X,
  Focus,
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
  const [focusedDevice, setFocusedDevice] = useState<string | null>(null)
  const [focusZoom, setFocusZoom] = useState(1.5)
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
    if (focusedDevice) {
      setFocusZoom((prev) => Math.min(prev + 0.25, 3))
    } else {
      setZoomLevel((prev) => Math.min(prev + 0.25, 3))
    }
  }

  const zoomOut = () => {
    if (focusedDevice) {
      setFocusZoom((prev) => Math.max(prev - 0.25, 0.5))
    } else {
      setZoomLevel((prev) => Math.max(prev - 0.25, 0.25))
    }
  }

  const resetZoom = () => {
    if (focusedDevice) {
      setFocusZoom(1.5)
    } else {
      setZoomLevel(1)
    }
  }

  const handleDeviceFocus = (deviceId: string) => {
    setFocusedDevice(deviceId)
    setFocusZoom(1.5) // Start with a nice focused zoom level
  }

  const exitFocus = () => {
    setFocusedDevice(null)
  }

  const getScaledDimensions = (device: (typeof devices)[0], isFocused = false) => {
    const currentWidth = isLandscape ? device.height : device.width
    const currentHeight = isLandscape ? device.width : device.height

    let baseScale = 1
    let appliedZoom = zoomLevel

    if (isFocused) {
      // For focused device, use larger base scale and focus zoom
      if (device.type === "desktop") {
        baseScale = 0.6
      } else if (device.type === "tablet") {
        baseScale = 0.8
      } else {
        baseScale = 1
      }
      appliedZoom = focusZoom
    } else {
      // For grid view, use smaller base scales
      if (device.type === "desktop") {
        baseScale = viewMode === "single" ? 0.4 : 0.2
      } else if (device.type === "tablet") {
        baseScale = viewMode === "single" ? 0.6 : 0.3
      } else {
        baseScale = viewMode === "single" ? 0.8 : 0.5
      }
    }

    const finalScale = baseScale * appliedZoom
    const scaledWidth = currentWidth * finalScale
    const scaledHeight = currentHeight * finalScale

    return { scaledWidth, scaledHeight, scale: finalScale, currentWidth, currentHeight }
  }

  const renderDeviceFrame = (device: (typeof devices)[0], isFocused = false) => {
    const { scaledWidth, scaledHeight, scale, currentWidth, currentHeight } = getScaledDimensions(device, isFocused)
    const deviceError = iframeError[device.id]

    return (
      <div
        className={`flex flex-col items-center space-y-3 transition-all duration-300 ${
          !isFocused && !focusedDevice ? "cursor-pointer hover:scale-105 hover:shadow-lg" : ""
        }`}
        onClick={() => !isFocused && !focusedDevice && handleDeviceFocus(device.id)}
      >
        {/* Device Info Header */}
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs font-medium">
            {device.name}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {currentWidth} × {currentHeight}
          </Badge>
          {!isFocused && !focusedDevice && (
            <Badge variant="outline" className="text-xs text-primary">
              <Focus className="w-3 h-3 mr-1" />
              Click to focus
            </Badge>
          )}
        </div>

        {/* Device Preview */}
        <div className="relative">
          <div
            className={`bg-card shadow-lg rounded-lg overflow-hidden border transition-all duration-300 ${
              isFocused ? "border-primary shadow-2xl" : "border-border"
            }`}
            style={{
              width: scaledWidth,
              height: scaledHeight,
            }}
          >
            {deviceError ? (
              <div className="flex items-center justify-center h-full bg-muted">
                <div className="text-center p-4">
                  <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Unable to load website</p>
                  <p className="text-xs text-muted-foreground mt-1">Check URL or try again</p>
                </div>
              </div>
            ) : (
              <iframe
                src={url}
                className="w-full h-full border-0 bg-background scrollable-no-bars"
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
          <div
            className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
              isFocused ? "bg-primary" : "bg-foreground"
            }`}
          >
            <device.icon className={`w-3 h-3 ${isFocused ? "text-primary-foreground" : "text-background"}`} />
          </div>
        </div>

        {/* Quick Actions for Focused Device */}
        {isFocused && (
          <div className="flex items-center space-x-2 mt-4">
            <Button variant="outline" size="sm" onClick={toggleOrientation} className="h-8 px-3 text-xs bg-transparent">
              <RotateCw className="w-3 h-3 mr-1" />
              Rotate
            </Button>
            <Button variant="outline" size="sm" onClick={exitFocus} className="h-8 px-3 text-xs bg-transparent">
              <X className="w-3 h-3 mr-1" />
              Exit Focus
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
  const focusedDeviceObject = focusedDevice ? devices.find((d) => d.id === focusedDevice) : null

  return (
    <div className="min-h-screen bg-background transition-colors duration-200">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center transition-colors duration-200">
                <Zap className="w-4 h-4 text-background" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ResponsiveView</h1>
                <p className="text-sm text-muted-foreground">
                  {focusedDevice ? `Focused on ${focusedDeviceObject?.name}` : "Test your designs across devices"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={zoomOut}
                  disabled={focusedDevice ? focusZoom <= 0.5 : zoomLevel <= 0.25}
                  className="h-8 px-2"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={resetZoom} className="h-8 px-3 text-xs font-mono">
                  {Math.round((focusedDevice ? focusZoom : zoomLevel) * 100)}%
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={zoomIn}
                  disabled={focusedDevice ? focusZoom >= 3 : zoomLevel >= 3}
                  className="h-8 px-2"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              {/* View Mode Toggle - Hidden when focused */}
              {!focusedDevice && (
                <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
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
              )}

              {/* Exit Focus Button */}
              {focusedDevice && (
                <Button variant="outline" size="sm" onClick={exitFocus} className="h-8 px-3 bg-transparent">
                  <X className="w-4 h-4 mr-1" />
                  Exit Focus
                </Button>
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full hover:bg-accent transition-colors duration-200"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className={`grid gap-8 ${focusedDevice ? "grid-cols-1" : "lg:grid-cols-4"}`}>
          {/* Sidebar - Hidden when focused */}
          {!focusedDevice && (
            <div className="lg:col-span-1 space-y-6">
              {/* URL Input */}
              <Card className="p-6 border-border bg-card transition-colors duration-200">
                <h2 className="text-lg font-semibold mb-4 text-card-foreground">Website URL</h2>
                <form onSubmit={handleUrlSubmit} className="space-y-4">
                  <div className="relative">
                    <Input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="pr-10 border-input bg-background text-foreground transition-colors duration-200"
                    />
                    <ExternalLink className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  </div>
                  <Button type="submit" className="w-full transition-colors duration-200" disabled={isLoading}>
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
              <Card className="p-6 border-border bg-card transition-colors duration-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-card-foreground">Devices</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleOrientation}
                    className="text-muted-foreground hover:bg-accent transition-colors duration-200"
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllDevices}
                    className="flex-1 text-xs bg-transparent"
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-4">
                  {["Mobile", "Tablet", "Desktop"].map((category) => (
                    <div key={category}>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">{category}</h3>
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
                                    ? "border-primary bg-accent"
                                    : "border-border hover:border-muted-foreground hover:bg-accent"
                                }`}
                              >
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={() => toggleDeviceSelection(device.id)}
                                />
                                <Icon className="w-4 h-4 text-muted-foreground" />
                                <div className="flex-1">
                                  <div className="font-medium text-sm text-foreground">{device.name}</div>
                                  <div className="text-xs text-muted-foreground">
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
              <Card className="p-6 border-border bg-card transition-colors duration-200">
                <h2 className="text-lg font-semibold mb-4 text-card-foreground">Controls</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                      {selectedDevices.length} device{selectedDevices.length !== 1 ? "s" : ""}
                    </Badge>
                  </div>
                  <Separator className="bg-border" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Zoom:</span>
                      <span className="text-foreground font-mono">{Math.round(zoomLevel * 100)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">View Mode:</span>
                      <span className="text-foreground capitalize">{viewMode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Orientation:</span>
                      <span className="text-foreground">{isLandscape ? "Landscape" : "Portrait"}</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                    <p className="text-xs text-primary">
                      💡 <strong>Tip:</strong> Click on any device preview to focus and zoom in for detailed inspection.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Preview Area */}
          <div className={focusedDevice ? "col-span-1" : "lg:col-span-3"}>
            <Card className="border-border bg-muted/50 transition-colors duration-200 overflow-hidden">
              <div className="min-h-[700px] p-8">
                {selectedDevices.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Monitor className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No devices selected</h3>
                      <p className="text-muted-foreground">
                        Select one or more devices from the sidebar to start previewing
                      </p>
                    </div>
                  </div>
                ) : focusedDevice && focusedDeviceObject ? (
                  // Focused Device View
                  <div className="flex items-center justify-center h-full">
                    {renderDeviceFrame(focusedDeviceObject, true)}
                  </div>
                ) : (
                  // Grid View
                  <div
                    className={`${
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center"
                        : "flex flex-col items-center space-y-8"
                    }`}
                  >
                    {selectedDeviceObjects.map((device) => (
                      <div key={device.id} className="flex justify-center">
                        {renderDeviceFrame(device, false)}
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
