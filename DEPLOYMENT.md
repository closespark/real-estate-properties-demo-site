# Deployment Guide

This guide explains how to deploy the VRM Properties demo site.

## Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- HubSpot sandbox account (for marketing features)

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure HubSpot (Optional):**
   - See `HUBSPOT_INTEGRATION.md` for detailed instructions
   - Update Portal IDs, Form IDs, and CTA IDs in the code

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Run production build locally:**
   ```bash
   npm start
   ```

## Deployment Options

### Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and configure build settings
4. Add environment variables if needed
5. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Netlify

1. Push your code to GitHub
2. Connect repository in Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Deploy!

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t vrm-properties .
docker run -p 3000:3000 vrm-properties
```

### Static Export

For static hosting (GitHub Pages, S3, etc.):

1. Update `next.config.ts`:
   ```typescript
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
   };
   ```

2. Build:
   ```bash
   npm run build
   ```

3. Deploy the `out` folder to your static host

## Environment Variables

If you need to use environment variables for HubSpot configuration:

Create `.env.local`:
```
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id
NEXT_PUBLIC_HUBSPOT_FORM_GUID=your_form_guid
```

Then update the components to use these variables instead of hardcoded values.

## Performance Optimization

The site is already optimized with:
- Static Site Generation (SSG) for all pages
- Image optimization (when using proper image URLs)
- Code splitting and lazy loading
- Tailwind CSS purging unused styles

## Monitoring

After deployment:
1. Enable HubSpot tracking to monitor visitors
2. Set up form submission tracking in HubSpot
3. Monitor CTA performance in HubSpot Analytics
4. Use Vercel Analytics (if deployed on Vercel)

## Troubleshooting

**Build fails:**
- Ensure Node.js version is 18.17 or later
- Clear `.next` folder and rebuild
- Run `npm install` again

**HubSpot forms not loading:**
- Check browser console for blocked scripts
- Verify Portal ID and Form IDs are correct
- Ensure HubSpot scripts are not blocked by ad blockers

**Images not displaying:**
- Replace placeholder SVGs with actual property images
- Ensure images are in the `public/images` folder
- Use proper Next.js Image component configuration
