import { ExternalLink, Github, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">⛡</span>
              <span className="font-semibold text-foreground">TestSentry</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Open-source tool for testing responsive designs across devices.
            </p>
          </div>

          {/* Project Links */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Project</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/noobships/test-sentry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <Github className="w-3 h-3" />
                  Source Code
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/noobships/test-sentry/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  Issues
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/noobships/test-sentry/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  Contributing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/noobships/test-sentry/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/noobships/test-sentry/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Releases
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/noobships/test-sentry/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  License
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/noobships/test-sentry/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Discussions
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/noobships/test-sentry/stargazers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Stargazers
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/noobships/test-sentry/network/members"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contributors
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border w-full">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">© {currentYear} TestSentry. Open source under MIT License.</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-current" />
              <span>for the community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
