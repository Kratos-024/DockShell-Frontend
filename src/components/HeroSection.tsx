import { Shield, Lock, Globe, AlertTriangle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative px-6 py-20 text-center overflow-hidden z-10">
      <div className="absolute inset-0 opacity-10 -z-10">
        <Shield className="absolute top-20 left-10 h-12 w-12 text-primary animate-pulse" />
        <Lock className="absolute top-32 right-16 h-8 w-8 text-accent animate-pulse delay-1000" />
        <Globe className="absolute bottom-40 left-20 h-10 w-10 text-primary animate-pulse delay-500" />
        <AlertTriangle className="absolute bottom-20 right-12 h-6 w-6 text-accent animate-pulse delay-1500" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1
                className="text-5xl lg:text-7xl font-mono
               font-bold  text-[#9fef00]
               leading-tight"
              >
                text-primary Hack. Learn.
                <br />
                <span className="text-secondary ">Conquer.</span>
              </h1>
              <p className="text-xl font-mono text-muted-foreground max-w-lg leading-relaxed">
                Step into a gamified cybersecurity arena. Solve challenges,
                capture the flag, and sharpen your skills.
              </p>
            </div>
          </div>

          <div className="relative">
            <div
              className="aspect-square bg-gradient-to-br 
            from-card/50
             to-background border border-border
              glow-purple rounded-lg p-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div
                    className="w-48 h-32 bg-background
                   border border-primary
                   glow-green rounded-lg p-4 mb-4"
                  >
                    <div
                      className="space-y-1 font-mono 
                    text-xs text-primary"
                    >
                      <div className="flex items-center space-x-1">
                        <span className="text-secondary">$</span>
                        <span className="animate-pulse">
                          nmap -sS target.ctf
                        </span>
                      </div>
                      <div className="text-muted-foreground">
                        Scanning ports...
                      </div>
                      <div className="text-primary">Port 22: OPEN</div>
                      <div className="text-primary">Port 80: OPEN</div>
                      <div className="text-secondary animate-pulse">
                        Exploiting...
                      </div>
                    </div>
                  </div>

                  <div className="w-16 h-20 mx-auto relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-muted-foreground to-transparent rounded-t-full opacity-80"></div>
                    <div className="absolute bottom-0 w-full h-8 bg-muted-foreground rounded-b-lg opacity-60"></div>
                  </div>
                </div>
              </div>

              {/* Glowing digital flag */}
              <div className="absolute top-4 right-4 animate-bounce">
                <div className="relative">
                  <div className="w-12 h-8 bg-gradient-to-r from-primary to-secondary glow-green rounded-sm flex items-center justify-center">
                    <span className="text-xs font-mono font-bold text-background">
                      CTF
                    </span>
                  </div>
                  <div className="w-1 h-16 bg-muted-foreground absolute -bottom-16 left-1/2 transform -translate-x-1/2"></div>
                </div>
              </div>

              {/* Floating code particles */}
              <div className="absolute top-8 left-8 text-primary text-glow-green font-mono text-xs animate-pulse">
                {"01101000"}
              </div>
              <div className="absolute bottom-12 left-12 text-secondary text-glow-purple font-mono text-xs animate-pulse delay-300">
                {"0x41414141"}
              </div>
              <div className="absolute top-16 right-16 text-primary text-glow-green font-mono text-xs animate-pulse delay-700">
                {"#!/bin/sh"}
              </div>

              {/* Success message */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-card border border-primary glow-green rounded px-3 py-1">
                <div className="font-mono text-xs text-primary animate-pulse">
                  {"[FLAG_CAPTURED]"}
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-card border border-primary glow-green rounded-lg p-3 font-mono text-xs text-primary animate-float">
              <div className="text-secondary mb-1">{"root@ctf:~#"}</div>
              <div>{"whoami"}</div>
              <div className="text-primary">{"elite_hacker"}</div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-card border border-secondary rounded-lg p-3 font-mono text-xs text-secondary animate-float-delayed">
              <div className="text-muted-foreground mb-1">
                {"~/challenges$"}
              </div>
              <div>{"cat flag.txt"}</div>
              <div className="text-secondary">{"CTF{h4ck3r_m0d3}"}</div>
            </div>

            <div
              className="absolute top-1/2 -left-8 
            bg-card border border-primary
            glow- rounded-lg p-2 font-mono
             text-xs text-primary animate-float-slow"
            >
              <div>{"SSH: Connected"}</div>
              <div className="text-secondary">{"Access: ROOT"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
