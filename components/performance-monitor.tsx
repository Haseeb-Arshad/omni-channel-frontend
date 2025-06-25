"use client";

import { useEffect, useState } from "react";
import { AlertCircle, BarChart3 } from "lucide-react";

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  ttfb: number | null;
}

/**
 * Performance Monitor Component
 * 
 * This component measures Core Web Vitals and other performance metrics
 * to help identify bottlenecks during development.
 * 
 * Only shown in development mode and can be toggled on/off.
 */
export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null,
  });
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Only run in development environment
    if (process.env.NODE_ENV !== "development") return;

    // Show toggle button after a short delay
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 1000);

    // Measure TTFB (Time to First Byte)
    const navigationEntries = performance.getEntriesByType("navigation");
    if (navigationEntries[0]) {
      const nav = navigationEntries[0] as PerformanceNavigationTiming;
      setMetrics((prev) => ({
        ...prev,
        ttfb: Math.round(nav.responseStart - nav.requestStart),
      }));
    }

    // Measure FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const fcp = entries[0];
        setMetrics((prev) => ({
          ...prev,
          fcp: Math.round(fcp.startTime),
        }));
      }
    });
    
    fcpObserver.observe({ type: "paint", buffered: true });

    // Measure LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        setMetrics((prev) => ({
          ...prev,
          lcp: Math.round(lastEntry.startTime),
        }));
      }
    });
    
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

    // Measure CLS (Cumulative Layout Shift)
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0;
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      setMetrics((prev) => ({
        ...prev,
        cls: Math.round(clsValue * 1000) / 1000,
      }));
    });
    
    clsObserver.observe({ type: "layout-shift", buffered: true });

    // Measure FID (First Input Delay)
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const firstInput = entries[0];
        setMetrics((prev) => ({
          ...prev,
          fid: Math.round((firstInput as any).processingStart - firstInput.startTime),
        }));
      }
    });
    
    fidObserver.observe({ type: "first-input", buffered: true });

    return () => {
      clearTimeout(timeout);
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      clsObserver.disconnect();
      fidObserver.disconnect();
    };
  }, []);

  if (!visible) return null;

  // Rating system
  const getRating = (metric: string, value: number | null): "good" | "needs-improvement" | "poor" | "unknown" => {
    if (value === null) return "unknown";
    
    switch (metric) {
      case "fcp":
        return value < 1800 ? "good" : value < 3000 ? "needs-improvement" : "poor";
      case "lcp":
        return value < 2500 ? "good" : value < 4000 ? "needs-improvement" : "poor";
      case "cls":
        return value < 0.1 ? "good" : value < 0.25 ? "needs-improvement" : "poor";
      case "fid":
        return value < 100 ? "good" : value < 300 ? "needs-improvement" : "poor";
      case "ttfb":
        return value < 200 ? "good" : value < 600 ? "needs-improvement" : "poor";
      default:
        return "unknown";
    }
  };

  const getMetricLabel = (name: string): string => {
    switch (name) {
      case "fcp": return "First Contentful Paint";
      case "lcp": return "Largest Contentful Paint";
      case "cls": return "Cumulative Layout Shift";
      case "fid": return "First Input Delay";
      case "ttfb": return "Time to First Byte";
      default: return name.toUpperCase();
    }
  };

  const getMetricUnit = (name: string): string => {
    if (name === "cls") return "";
    return "ms";
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`flex items-center gap-2 rounded-lg px-3 py-2 shadow-lg transition-colors 
          ${expanded 
            ? "bg-orange-500 text-white" 
            : "bg-white text-gray-800 hover:bg-gray-100"}`}
      >
        <BarChart3 size={18} />
        <span className="text-sm font-medium">Performance</span>
      </button>

      {expanded && (
        <div className="absolute bottom-full right-0 mb-2 w-80 rounded-lg bg-white p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Performance Metrics</h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <AlertCircle size={12} />
              <span>Development only</span>
            </div>
          </div>

          <div className="space-y-3">
            {(Object.keys(metrics) as Array<keyof PerformanceMetrics>).map((metric) => {
              const value = metrics[metric];
              const rating = getRating(metric, value);

              return (
                <div key={metric} className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-medium">{getMetricLabel(metric)}</div>
                    <div className="text-xs text-gray-500">{metric.toUpperCase()}</div>
                  </div>
                  <div 
                    className={`rounded-md px-2 py-1 text-xs font-medium
                      ${rating === "good" ? "bg-green-100 text-green-800" : ""}
                      ${rating === "needs-improvement" ? "bg-yellow-100 text-yellow-800" : ""}
                      ${rating === "poor" ? "bg-red-100 text-red-800" : ""}
                      ${rating === "unknown" ? "bg-gray-100 text-gray-800" : ""}
                    `}
                  >
                    {value !== null ? `${value}${getMetricUnit(metric)}` : "Measuring..."}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 text-xs text-gray-500">
            <p className="mt-1">Lower values are better for all metrics except CLS (0-1 range).</p>
          </div>
        </div>
      )}
    </div>
  );
}
