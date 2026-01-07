# Deploying to Render

This guide explains how to deploy the VRM Properties demo site to Render.

## Quick Deploy

### Option 1: Deploy via Dashboard (Recommended)

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up or log in with your GitHub account

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `closespark/vrm-properties-demo-site`
   - Render will auto-detect this is a Next.js app

3. **Configure Service**
   - **Name**: `vrm-properties-demo` (or your preferred name)
   - **Region**: Choose closest to your users (e.g., Oregon, Ohio, Frankfurt)
   - **Branch**: `main` or your deployment branch
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid plan for production)

4. **Environment Variables** (Optional but recommended)
   - Add `NODE_ENV` = `production`
   - Add `NODE_VERSION` = `20.11.0`
   - Add HubSpot configuration (if ready):
     - `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` = your portal ID
     - Other HubSpot-related env vars as needed

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - You'll get a URL like: `https://vrm-properties-demo.onrender.com`

### Option 2: Deploy via Infrastructure as Code

This repository includes a `render.yaml` blueprint file for automated deployment.

1. **Sign up/Login to Render**
   - Go to [render.com](https://render.com)
   - Sign up or log in with your GitHub account

2. **Create New Blueprint**
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`
   - Click "Apply"

3. **Configure Environment Variables** (if needed)
   - Update any environment-specific values in the Render dashboard

## Build Configuration

The application uses these commands (already configured):

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

## Environment Variables

### Required for Production

- `NODE_ENV`: Set to `production` (Render sets this automatically)
- `NODE_VERSION`: `20.11.0` (specified in render.yaml)

### Optional - HubSpot Integration

To enable HubSpot forms and tracking, add these in Render dashboard:

- `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`: Your HubSpot Portal ID
- `NEXT_PUBLIC_HUBSPOT_REGION`: `na1`, `eu1`, or `ap1` (default: `na1`)

**Note**: For client-side HubSpot integration, you can also hardcode IDs directly in the components as documented in `HUBSPOT_INTEGRATION.md`.

## Post-Deployment

### 1. Update HubSpot Configuration

After deployment, update the placeholder IDs in your components:

**Tracking Code** (`src/app/layout.tsx`):
```typescript
// Replace YOUR_HUBSPOT_ID with your actual Portal ID
```

**Forms** (various pages):
```typescript
// Replace form IDs:
// - YOUR_FORM_ID (homepage)
// - YOUR_PROPERTY_INQUIRY_FORM_ID (property pages)
// - YOUR_AGENT_REGISTRATION_FORM_ID (/agents)
// - YOUR_VA_FINANCING_FORM_ID (/financing)
```

**CTAs** (`src/app/properties/[id]/page.tsx`):
```typescript
// Replace YOUR_CTA_ID with your actual CTA ID
```

### 2. Custom Domain (Optional)

1. In Render dashboard, go to your service settings
2. Click "Custom Domain"
3. Add your domain (e.g., `demo.vrmproperties.com`)
4. Update DNS records as instructed by Render
5. Render provides free SSL certificates via Let's Encrypt

### 3. Continuous Deployment

Render automatically deploys when you push to your connected branch:

- **Push to main branch** → Automatic deployment
- **View build logs** in Render dashboard
- **Rollback** available if needed

## Monitoring & Logs

- **Build Logs**: View in Render dashboard during deployment
- **Runtime Logs**: Available in Render dashboard under "Logs" tab
- **Metrics**: CPU, memory, and bandwidth usage in dashboard

## Scaling

### Free Tier Limitations

- Spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- 750 hours/month free
- Good for demos and testing

### Upgrading to Paid Plan

For production use, consider upgrading to:

- **Starter ($7/mo)**: Always-on, no spin-down
- **Standard ($25/mo)**: Better performance, more resources
- **Pro ($85/mo)**: Dedicated resources, priority support

## Troubleshooting

### Build Fails

1. Check build logs in Render dashboard
2. Verify Node version compatibility (20.11.0 recommended)
3. Ensure all dependencies are in `package.json`
4. Check for TypeScript errors: `npm run build` locally

### Site Won't Load

1. Verify start command: `npm start`
2. Check runtime logs for errors
3. Ensure port binding (Next.js handles automatically)
4. Verify environment variables are set

### HubSpot Forms Not Working

1. Check browser console for errors
2. Verify Portal ID and Form IDs are correct
3. Ensure HubSpot domain is not blocked by CORS
4. Check HubSpot form settings (active, published)

## Resources

- [Render Documentation](https://render.com/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Render Support](https://render.com/support)

## Cost Estimate

**Free Tier**: $0/month
- Perfect for this demo site
- 750 hours free compute
- Automatic SSL
- Global CDN

**Starter Tier**: $7/month (recommended for production)
- Always-on (no spin-down)
- Better performance
- Same features as free tier

## Additional Notes

- **Static Assets**: Automatically served via Render's global CDN
- **Image Optimization**: Next.js image optimization works out of the box
- **SSG Pages**: All 100+ property pages pre-rendered at build time
- **Fast Builds**: Typically 2-3 minutes for initial build
- **Auto-SSL**: Free SSL certificates automatically provisioned

## Summary

This repository is **ready to deploy on Render** with:

✅ `render.yaml` blueprint configuration
✅ Proper build and start scripts
✅ Next.js optimized for production
✅ Static site generation for all routes
✅ HubSpot integration ready to configure
✅ Free SSL and global CDN included

Simply connect your GitHub repository to Render and deploy!
