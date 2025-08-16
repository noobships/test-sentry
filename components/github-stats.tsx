"use client"

import { useState, useEffect } from "react"
import { Star, GitFork } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface GitHubStats {
  stars: number
  forks: number
  watchers: number
}

export function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch("https://api.github.com/repos/noobships/test-sentry")
        if (response.ok) {
          const data = await response.json()
          setStats({
            stars: data.stargazers_count,
            forks: data.forks_count,
            watchers: data.watchers_count,
          })
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGitHubStats()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="animate-pulse">
          <Star className="w-3 h-3 mr-1" />
          <span className="w-4 h-3 bg-muted rounded"></span>
        </Badge>
      </div>
    )
  }

  if (!stats) return null

  return (
    <div className="flex items-center gap-2">
      <a
        href="https://github.com/noobships/test-sentry"
        target="_blank"
        rel="noopener noreferrer"
        className="transition-opacity hover:opacity-80"
      >
        <Badge variant="outline" className="bg-background hover:bg-accent transition-colors">
          <Star className="w-3 h-3 mr-1" />
          {stats.stars}
        </Badge>
      </a>
      <a
        href="https://github.com/noobships/test-sentry/fork"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:block transition-opacity hover:opacity-80"
      >
        <Badge variant="outline" className="bg-background hover:bg-accent transition-colors">
          <GitFork className="w-3 h-3 mr-1" />
          {stats.forks}
        </Badge>
      </a>
    </div>
  )
}
