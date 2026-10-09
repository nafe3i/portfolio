# Portfolio — Mohamed Amine Nafiai

## Overview

Personal portfolio website of a junior full-stack web developer and digital marketing
freelancer based in Morocco, built from scratch. It presents his projects, skills and
availability to recruiters and freelance clients (local and remote), and is bilingual
(English/French). Long-term positioning: future AI Engineer / Backend Engineer building
AI SaaS products.

## Goals

1. Convert visitors (clients, recruiters) into contacts via the contact form
2. Showcase real projects (EasyColoc, Minerva, Salus) with a dynamic, GitHub-fed projects section
3. Communicate a premium, senior-level image through a consistent light/dark design with a bold Hero card
4. Work fully in English and French with instant language and theme toggles
5. Ship with clean SEO, accessibility and performance fundamentals from day one

## Core User Flow

1. Visitor lands on the Hero (name, role, profile photo, CTA)
2. Scrolls to projects and opens a project (details / GitHub link)
3. Checks the technology/skills section
4. Reaches the contact section (info + availability cards, message form)
5. Sends a message; can switch EN/FR at any point via the navbar

## Features

### Content
- Hero with profile photo
- Dynamic projects section fed by the GitHub API
- Technology/skills section: grouped icons by category + scrolling marquee
- Contact section: two columns (info/availability left, form right)

### Experience
- Editorial fixed navbar, always visible, that shrinks on scroll
- EN/FR toggle (LanguageContext), language choice remembered
- Light/dark toggle (ThemeContext), theme choice remembered
- Framer Motion scroll-in animations and animated counters
- Three.js (@react-three/fiber) decorative visual in the Hero

## Scope

### In Scope
- Single-page portfolio, front-end only
- GitHub API integration for projects
- Bilingual content, SEO basics, responsive layout
- Contact form wired to EmailJS

### Out of Scope
- Blog / CMS
- User accounts or authentication
- Custom backend or database

## Success Criteria

1. Every section renders correctly on mobile, tablet and desktop
2. Toggling EN/FR translates 100% of visible text with no reload
3. Projects section loads from GitHub and degrades gracefully if the API fails
4. The whole site uses one consistent visual style end to end
5. Contact form successfully sends a message via EmailJS
6. `npm run build` passes with no console errors
7. Baseline SEO items (meta tags, headings, alt text) are in place
