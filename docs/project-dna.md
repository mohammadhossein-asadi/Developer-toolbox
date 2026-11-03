# Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns
---

## Technical Requirements

| Requirement | Detail |
|-------------|--------|
| **Runtime** | Node.js 20+ / Python 3.11+ |
| **Framework"@
    
    if (React, TypeScript, Vite, Radix UI, shadcn/ui, date-fns -like "*Next.js*") { # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | Next.js (App Router)" }
    elseif (React, TypeScript, Vite, Radix UI, shadcn/ui, date-fns -like "*Vite*") { # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | Vite + React" }
    elseif (Developer-toolbox -eq "Forge-CLI") { # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | Node.js CLI (Turbo)" }
    elseif (Developer-toolbox -like "*Python*") { # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | Python 3.11+" }
    else { # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | Web Framework" }
    
    # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += @"
| **Language"@
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
        # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | Python"
    } else {
        # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | TypeScript"
    }
    
    # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += @"
| **Styling"@
    if (React, TypeScript, Vite, Radix UI, shadcn/ui, date-fns -like "*Tailwind*") { # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | Tailwind CSS" }
    else { # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | CSS / Other" }
    
    # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += @"
| **Database"@
    # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | "
    
    # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += @"
| **Auth"@
    if (React, TypeScript, Vite, Radix UI, shadcn/ui, date-fns -like "*NextAuth*") { # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | NextAuth" }
    elseif (React, TypeScript, Vite, Radix UI, shadcn/ui, date-fns -like "*Clerk*") { # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | Clerk" }
    elseif (React, TypeScript, Vite, Radix UI, shadcn/ui, date-fns -like "*Supabase*") { # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | Supabase Auth" }
    else { # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | Not detected" }
    
    # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += @"
| **State"@
    if (React, TypeScript, Vite, Radix UI, shadcn/ui, date-fns -like "*Zustand*") { # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | Zustand" }
    elseif (React, TypeScript, Vite, Radix UI, shadcn/ui, date-fns -like "*TanStack*") { # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | TanStack Query" }
    else { # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | React Context / useState" }
    
    # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += @"
| **Testing"@
     = False
     = False
    # Can't detect from here, default
    # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | Not configured"
    
    # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += @"
| **Linting** | ESLint
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
        # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
        # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | pnpm (Turbo)"
    } else {
        # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += " | npm"
    }
    
    # Project DNA — Developer-toolbox

## Project Identity

| Field | Value |
|-------|-------|
| **Project Name** | Developer-toolbox
| **Repository** | \$name\
| **Type"@
    
     += " | Web App (Vite)"
    
     += @"
| **Primary Language"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | Python"
    } else {
         += " | TypeScript"
    }
    
     += @"
| **Package Manager"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TelegramMusicForwarder" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager") {
         += " | pip / pyproject.toml"
    } elseif (Developer-toolbox -eq "Forge-CLI") {
         += " | npm (Turbo)"
    } else {
         += " | npm"
    }
    
     = "None"
    if (Developer-toolbox -like "*Prisma*") {  = "PostgreSQL (Prisma)" }
    elseif (Developer-toolbox -like "*Drizzle*") {  = "PostgreSQL (Drizzle)" }
    elseif (Developer-toolbox -like "*Supabase*") {  = "PostgreSQL (Supabase)" }
    
     += @"
| **Database"@
     += " | "
    
     += @"
| **Platform"@
    
    if (Developer-toolbox -like "*Python*" -or Developer-toolbox -eq "TerminalPortfolio" -or Developer-toolbox -eq "yt-download-manager" -or Developer-toolbox -eq "TelegramMusicForwarder") {
         += " | Cross-platform (CLI/Desktop/Bot)"
    } elseif (Developer-toolbox -like "*Next.js*" -or Developer-toolbox -like "*Vite*" -or Developer-toolbox -like "*Next.js*") {
         += " | Web"
    } else {
         += " | Web"
    }
    
     += @"

---

## Purpose & Problem Statement

**Problem**: [NEEDS ANALYSIS - Determine from codebase]

**Solution**: [NEEDS ANALYSIS - Determine from codebase]

---

## Target Users

- **Primary**: [NEEDS CONFIRMATION]
- **Secondary**: [NEEDS CONFIRMATION]

---

## Core Features (Detected from Dependencies)

| Feature | Status | Evidence |
|---------|--------|----------|| Vite | ✅ Detected | vite dependency
| React | ✅ Detected | react dependency
| TypeScript | ✅ Detected | tsconfig.json
| Radix UI | ✅ Detected | @radix-ui/* packages
| shadcn/ui | ✅ Detected | cva + tailwind-merge
| date-fns | ✅ Detected | date-fns += @"

---

## Functional Requirements

| ID | Requirement | Status |
|----|-------------|--------|
| FR-01 | [NEEDS ANALYSIS] | [NEEDS ANALYSIS] |

---

## Non-Functional Requirements

| ID | Requirement | Status |
|----|-------------|--------|
| NFR-01 | TypeScript strict mode | ✅ Detected (if TS) |
| NFR-02 | ESLint configured | ✅ Detected |

---

## Known Limitations

1. **Feature scope unclear** - Dependencies only, implementation unknown
2. **Feature scope unclear** - Dependencies only, implementation unknown
3. **No database** - Local-only or not implemented
4. **Export formats unknown** - Various formats possible
5. **Collaboration features** - Not detected

---

## Future Improvements

- [ ] Full source code audit
- [ ] Define core features and user flows
- [ ] Add database layer if needed
- [ ] Implement authentication if needed
- [ ] Add automated testing
- [ ] Set up CI/CD pipeline
- [ ] Configure deployment

---

*Generated: 2026-10-30 | Stage 1 of 5 | [AUTO-GENERATED - NEEDS SOURCE INSPECTION]*
