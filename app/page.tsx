'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Monitor,
  Smartphone,
  Tablet,
  RotateCcw,
  Moon,
  Sun,
  AlertCircle,
  Grid3X3,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCw,
  X,
  Focus,
  Layers,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { GitHubStats } from '@/components/github-stats';
import { Footer } from '@/components/footer';

const devices = [
  {
    id: 'iphone-14-pro',
    name: 'iPhone 14 Pro',
    type: 'mobile',
    width: 393,
    height: 852,
    icon: Smartphone,
    category: 'Mobile',
  },
  {
    id: 'iphone-se',
    name: 'iPhone SE',
    type: 'mobile',
    width: 375,
    height: 667,
    icon: Smartphone,
    category: 'Mobile',
  },
  {
    id: 'samsung-s23',
    name: 'Samsung Galaxy S23',
    type: 'mobile',
    width: 360,
    height: 780,
    icon: Smartphone,
    category: 'Mobile',
  },
  {
    id: 'ipad-pro',
    name: 'iPad Pro',
    type: 'tablet',
    width: 1024,
    height: 1366,
    icon: Tablet,
    category: 'Tablet',
  },
  {
    id: 'ipad-air',
    name: 'iPad Air',
    type: 'tablet',
    width: 820,
    height: 1180,
    icon: Tablet,
    category: 'Tablet',
  },
  {
    id: 'macbook-pro',
    name: 'MacBook Pro',
    type: 'desktop',
    width: 1440,
    height: 900,
    icon: Monitor,
    category: 'Desktop',
  },
  {
    id: 'desktop-hd',
    name: 'Desktop HD',
    type: 'desktop',
    width: 1920,
    height: 1080,
    icon: Monitor,
    category: 'Desktop',
  },
];

export default function ResponsiveDesignTester() {
  const [selectedDevices, setSelectedDevices] = useState<string[]>([
    devices[0].id,
  ]);
  const [url, setUrl] = useState('https://openai.com/gpt-5/');
  const [isLandscape, setIsLandscape] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [iframeError, setIframeError] = useState<Record<string, boolean>>({});
  const [iframeBlocked, setIframeBlocked] = useState<Record<string, boolean>>(
    {}
  );
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'single'>('grid');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [focusedDevice, setFocusedDevice] = useState<string | null>(null);
  const [focusZoom, setFocusZoom] = useState(1.5);
  const [customZoomInput, setCustomZoomInput] = useState('');
  const { theme, setTheme } = useTheme();
  const detectionTimeouts = useRef<Record<string, NodeJS.Timeout>>({});

  const handleDeviceFocus = (deviceId: string) => {
    setFocusedDevice(deviceId);
  };

  const exitFocus = () => {
    setFocusedDevice(null);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIframeError({});
    setIframeBlocked({});

    Object.values(detectionTimeouts.current).forEach((timeout) =>
      clearTimeout(timeout)
    );
    detectionTimeouts.current = {};

    setTimeout(() => setIsLoading(false), 1000);
  };

  const toggleOrientation = () => {
    setIsLandscape(!isLandscape);
  };

  const toggleDeviceSelection = (deviceId: string) => {
    setSelectedDevices((prev) => {
      if (prev.includes(deviceId)) {
        return prev.filter((id) => id !== deviceId);
      } else {
        return [...prev, deviceId];
      }
    });
  };

  const selectAllDevices = () => {
    setSelectedDevices(devices.map((d) => d.id));
  };

  const clearAllDevices = () => {
    setSelectedDevices([]);
  };

  const zoomIn = () => {
    if (focusedDevice) {
      setFocusZoom((prev) => Math.min(prev + 0.25, 3));
    } else {
      setZoomLevel((prev) => Math.min(prev + 0.25, 3));
    }
  };

  const zoomOut = () => {
    if (focusedDevice) {
      setFocusZoom((prev) => Math.max(prev - 0.25, 0.5));
    } else {
      setZoomLevel((prev) => Math.max(prev - 0.25, 0.25));
    }
  };

  const resetZoom = () => {
    if (focusedDevice) {
      setFocusZoom(1.5);
    } else {
      setZoomLevel(1);
    }
  };

  const handleCustomZoom = (value: string) => {
    setCustomZoomInput(value);
    const numValue = Number.parseFloat(value);
    if (!isNaN(numValue) && numValue > 0 && numValue <= 500) {
      const zoomValue = numValue / 100;
      if (focusedDevice) {
        setFocusZoom(Math.min(Math.max(zoomValue, 0.1), 5));
      } else {
        setZoomLevel(Math.min(Math.max(zoomValue, 0.1), 5));
      }
    }
  };

  const syncZoomInput = () => {
    const currentZoom = focusedDevice ? focusZoom : zoomLevel;
    setCustomZoomInput(Math.round(currentZoom * 100).toString());
  };

  const getScaledDimensions = (
    device: (typeof devices)[0],
    isFocused = false
  ) => {
    const currentWidth = isLandscape ? device.height : device.width;
    const currentHeight = isLandscape ? device.width : device.height;

    let baseScale = 1;
    let appliedZoom = zoomLevel;

    if (isFocused) {
      if (device.type === 'desktop') {
        baseScale = 0.6;
      } else if (device.type === 'tablet') {
        baseScale = 0.8;
      } else {
        baseScale = 1;
      }
      appliedZoom = focusZoom;
    } else {
      if (device.type === 'desktop') {
        baseScale = viewMode === 'single' ? 0.4 : 0.2;
      } else if (device.type === 'tablet') {
        baseScale = viewMode === 'single' ? 0.6 : 0.3;
      } else {
        baseScale = viewMode === 'single' ? 0.8 : 0.5;
      }
    }

    const finalScale = baseScale * appliedZoom;
    const scaledWidth = currentWidth * finalScale;
    const scaledHeight = currentHeight * finalScale;

    return {
      scaledWidth,
      scaledHeight,
      scale: finalScale,
      currentWidth,
      currentHeight,
    };
  };

  const renderDeviceFrame = (
    device: (typeof devices)[0],
    isFocused = false
  ) => {
    const { scaledWidth, scaledHeight, scale, currentWidth, currentHeight } =
      getScaledDimensions(device, isFocused);
    const deviceError = iframeError[device.id];
    const deviceBlocked = iframeBlocked[device.id];

    const hasValidUrl = isValidUrl(url);

    return (
      <div
        className={`flex flex-col items-center space-y-3 transition-all duration-300 ${
          !isFocused && !focusedDevice ? 'cursor-pointer' : ''
        }`}
        onClick={() =>
          !isFocused && !focusedDevice && handleDeviceFocus(device.id)
        }
      >
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

        <div className="relative">
          <div
            className={`bg-card rounded-lg overflow-hidden transition-all duration-300 ${
              isFocused ? 'shadow-2xl' : 'shadow-lg border border-border'
            }`}
            style={{
              width: scaledWidth,
              height: scaledHeight,
              overflow: 'hidden',
            }}
          >
            {!hasValidUrl ? (
              <div className="flex items-center justify-center h-full bg-muted">
                <div className="text-center p-4 max-w-xs">
                  <Monitor className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground mb-1">
                    Enter a URL to preview
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Type a website URL in the input field above to start
                    previewing
                  </p>
                </div>
              </div>
            ) : deviceError || deviceBlocked ? (
              <div className="flex items-center justify-center h-full bg-muted">
                <div className="text-center p-4 max-w-xs">
                  <AlertCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  {deviceBlocked ? (
                    <>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Website blocks iframe embedding
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        This website uses X-Frame-Options or CSP headers to
                        prevent embedding in iframes for security.
                      </p>
                      <a
                        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        Learn more about iframe restrictions →
                      </a>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-muted-foreground">
                        Unable to load website
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Check URL or try again
                      </p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <iframe
                src={url}
                className="w-full h-full border-0 bg-background scrollable-no-bars"
                title={`${device.name} Preview`}
                onError={() => handleIframeError(device.id)}
                onLoad={(e) => handleIframeLoad(device.id, e.currentTarget)}
                referrerPolicy="no-referrer-when-downgrade"
                key={`${device.id}-${url}`}
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  width: `${100 / scale}%`,
                  height: `${100 / scale}%`,
                }}
              />
            )}
          </div>
        </div>

        {isFocused && (
          <div className="flex items-center justify-center gap-1 sm:gap-2 mt-4 w-full max-w-xs sm:max-w-none">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleOrientation}
              className="h-8 px-2 sm:px-3 text-xs bg-transparent flex-shrink-0"
            >
              <RotateCw className="w-3 h-3 sm:mr-1" />
              <span className="hidden sm:inline">Rotate</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={exitFocus}
              className="h-8 px-2 sm:px-3 text-xs bg-transparent flex-shrink-0"
            >
              <X className="w-3 h-3 sm:mr-1" />
              <span className="hidden sm:inline">Exit</span>
            </Button>
          </div>
        )}
      </div>
    );
  };

  const handleIframeError = (deviceId: string) => {
    console.log(`[v0] Iframe error for ${deviceId}`);
    setIframeError((prev) => ({ ...prev, [deviceId]: true }));
    setIframeBlocked((prev) => ({ ...prev, [deviceId]: false }));
  };

  const handleIframeLoad = (deviceId: string, iframe: HTMLIFrameElement) => {
    console.log(`[v0] Iframe loaded for ${deviceId}`);

    if (!isValidUrl(url)) {
      console.log(`[v0] Skipping detection for ${deviceId} - invalid URL`);
      return;
    }

    if (detectionTimeouts.current[deviceId]) {
      clearTimeout(detectionTimeouts.current[deviceId]);
    }

    setIframeError((prev) => ({ ...prev, [deviceId]: false }));
    setIframeBlocked((prev) => ({ ...prev, [deviceId]: false }));

    detectionTimeouts.current[deviceId] = setTimeout(() => {
      try {
        if (
          iframe.src === 'about:blank' ||
          iframe.src === '' ||
          iframe.src === window.location.href
        ) {
          console.log(
            `[v0] Iframe blocked for ${deviceId} - redirected to about:blank or same origin`
          );
          setIframeBlocked((prev) => ({ ...prev, [deviceId]: true }));
          return;
        }

        if (iframe.contentDocument === null && iframe.contentWindow === null) {
          console.log(
            `[v0] Iframe blocked for ${deviceId} - no content access`
          );
          setIframeBlocked((prev) => ({ ...prev, [deviceId]: true }));
          return;
        }

        if (iframe.contentWindow) {
          try {
            const location = iframe.contentWindow.location;
            if (
              location &&
              (location.href === 'about:blank' ||
                location.href === '' ||
                location.href === window.location.href)
            ) {
              console.log(
                `[v0] Iframe blocked for ${deviceId} - location indicates blocking`
              );
              setIframeBlocked((prev) => ({ ...prev, [deviceId]: true }));
              return;
            }
          } catch (e) {
            console.log(
              `[v0] Cross-origin access for ${deviceId} - normal behavior`
            );
          }
        }

        console.log(`[v0] Iframe working correctly for ${deviceId}`);
        setIframeBlocked((prev) => ({ ...prev, [deviceId]: false }));
      } catch (error) {
        console.log(
          `[v0] Unexpected error for ${deviceId}, treating as working:`,
          error
        );
        setIframeBlocked((prev) => ({ ...prev, [deviceId]: false }));
      }
    }, 1500);
  };

  useEffect(() => {
    return () => {
      Object.values(detectionTimeouts.current).forEach((timeout) =>
        clearTimeout(timeout)
      );
    };
  }, []);

  useEffect(() => {
    Object.values(detectionTimeouts.current).forEach((timeout) =>
      clearTimeout(timeout)
    );
    detectionTimeouts.current = {};

    if (!isValidUrl(url)) {
      setIframeError({});
      setIframeBlocked({});
    }
  }, [url]);

  const isValidUrl = (urlString: string) => {
    if (!urlString || urlString.trim() === '') return false;
    try {
      const url = new URL(urlString);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  if (!mounted) {
    return null;
  }

  const selectedDeviceObjects = devices.filter((device) =>
    selectedDevices.includes(device.id)
  );
  const focusedDeviceObject = focusedDevice
    ? devices.find((d) => d.id === focusedDevice)
    : null;

  return (
    <div className="min-h-screen bg-background transition-colors duration-200 flex flex-col">
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-3 flex-shrink-0">
              <span className="text-2xl">⛡</span>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  TestSentry
                </h1>
              </div>
            </div>

            <div className="md:hidden flex items-center flex-shrink-0">
              <span className="text-lg font-bold">⛡</span>
            </div>

            <div className="flex-1 mx-2 md:max-w-md md:mx-4">
              <Input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="border-input bg-background text-foreground transition-colors duration-200"
              />
            </div>

            <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
              <GitHubStats />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full hover:bg-accent transition-colors duration-200"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <h2 className="text-lg font-semibold text-foreground">
              Device Preview
            </h2>
            <Badge
              variant="secondary"
              className="bg-secondary text-secondary-foreground w-fit"
            >
              {selectedDevices.length} selected
            </Badge>
          </div>

          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                className="bg-transparent w-full sm:w-auto"
              >
                <Layers className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Select Devices</span>
                <span className="sm:hidden">Devices</span>
                <span className="ml-2 text-xs bg-muted px-2 py-1 rounded">
                  {selectedDevices.length}
                </span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Select Devices</DrawerTitle>
                <DrawerDescription>
                  Choose which devices to preview your website on
                </DrawerDescription>
              </DrawerHeader>

              <div className="px-4 pb-6 overflow-y-auto">
                <div className="flex gap-2 mb-6">
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleOrientation}
                    className="flex-1 text-xs bg-transparent"
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Rotate All
                  </Button>
                </div>

                <div className="space-y-6">
                  {['Mobile', 'Tablet', 'Desktop'].map((category) => (
                    <div key={category}>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        {category}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {devices
                          .filter((device) => device.category === category)
                          .map((device) => {
                            const Icon = device.icon;
                            const isSelected = selectedDevices.includes(
                              device.id
                            );
                            return (
                              <div
                                key={device.id}
                                className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                                  isSelected
                                    ? 'border-primary bg-accent'
                                    : 'border-border hover:border-muted-foreground hover:bg-accent'
                                }`}
                                onClick={() => toggleDeviceSelection(device.id)}
                              >
                                <Checkbox
                                  checked={isSelected}
                                  onCheckedChange={() =>
                                    toggleDeviceSelection(device.id)
                                  }
                                />
                                <Icon className="w-4 h-4 text-muted-foreground" />
                                <div className="flex-1">
                                  <div className="font-medium text-sm text-foreground">
                                    {device.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {device.width} × {device.height}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8 flex-1">
        {!focusedDevice && selectedDevices.length > 0 && (
          <div className="mb-6">
            <Card className="border-border bg-card transition-colors duration-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      Orientation: {isLandscape ? 'Landscape' : 'Portrait'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={zoomOut}
                      disabled={
                        focusedDevice ? focusZoom <= 0.5 : zoomLevel <= 0.25
                      }
                      className="h-8 px-2"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Input
                      type="number"
                      min="10"
                      max="500"
                      value={
                        customZoomInput ||
                        Math.round(
                          (focusedDevice ? focusZoom : zoomLevel) * 100
                        )
                      }
                      onChange={(e) => handleCustomZoom(e.target.value)}
                      onFocus={syncZoomInput}
                      onBlur={() => setCustomZoomInput('')}
                      className="h-8 w-16 px-2 text-xs font-mono text-center border-0 bg-transparent"
                      placeholder={Math.round(
                        (focusedDevice ? focusZoom : zoomLevel) * 100
                      ).toString()}
                    />
                    <span className="text-xs text-muted-foreground">%</span>
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

                  <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="h-8 px-3"
                    >
                      <Grid3X3 className="w-4 h-4 mr-1" />
                      Grid
                    </Button>
                    <Button
                      variant={viewMode === 'single' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('single')}
                      className="h-8 px-3"
                    >
                      <Maximize2 className="w-4 h-4 mr-1" />
                      Single
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {focusedDevice && focusedDeviceObject && (
          <div className="mb-6">
            <Card className="border-border bg-card transition-colors duration-200">
              <div className="p-2 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <Badge
                      variant="default"
                      className="bg-primary text-primary-foreground w-fit"
                    >
                      Focused: {focusedDeviceObject.name}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        {isLandscape
                          ? focusedDeviceObject.height
                          : focusedDeviceObject.width}{' '}
                        ×{' '}
                        {isLandscape
                          ? focusedDeviceObject.width
                          : focusedDeviceObject.height}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-1 bg-muted rounded-lg px-1 w-fit">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={zoomOut}
                        disabled={focusZoom <= 0.5}
                        className="h-8 px-2 flex-shrink-0"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                      <Input
                        type="number"
                        min="10"
                        max="500"
                        value={customZoomInput || Math.round(focusZoom * 100)}
                        onChange={(e) => handleCustomZoom(e.target.value)}
                        onFocus={syncZoomInput}
                        onBlur={() => setCustomZoomInput('')}
                        className="h-8 w-14 sm:w-16 px-1 sm:px-2 text-xs font-mono text-center border-0 bg-transparent"
                        placeholder={Math.round(focusZoom * 100).toString()}
                      />
                      <span className="text-xs text-muted-foreground">%</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={zoomIn}
                        disabled={focusZoom >= 3}
                        className="h-8 px-2 flex-shrink-0"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex gap-1 sm:gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleOrientation}
                        className="h-8 px-2 sm:px-3 bg-transparent flex-1 sm:flex-initial"
                      >
                        <RotateCw className="w-3 h-3 sm:mr-1" />
                        Rotate
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={exitFocus}
                        className="h-8 px-2 sm:px-3 bg-transparent flex-1 sm:flex-initial"
                      >
                        <X className="w-3 h-3 sm:mr-1" />
                        Exit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        <Card className="border-border bg-muted/50 transition-colors duration-200 overflow-hidden">
          <div className="min-h-[700px] p-8">
            {selectedDevices.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Monitor className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No devices selected
                  </h3>
                  <p className="text-muted-foreground">
                    Click "Select Devices" to choose devices for preview
                  </p>
                </div>
              </div>
            ) : focusedDevice && focusedDeviceObject ? (
              <div className="flex items-center justify-center h-full">
                {renderDeviceFrame(focusedDeviceObject, true)}
              </div>
            ) : (
              <div
                className={`${
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center'
                    : 'flex flex-col items-center space-y-8'
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

      <Footer />
    </div>
  );
}
