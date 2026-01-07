# HubSpot Integration Guide

This demo site includes HubSpot sandbox tracking, forms, and CTAs for marketing campaign demonstrations.

## Configuration Required

To activate the HubSpot features, you need to update the following files with your HubSpot sandbox credentials:

### 1. Tracking Code

**File:** `src/app/layout.tsx`

Replace `YOUR_HUBSPOT_ID` with your HubSpot portal ID:

```typescript
<script
  type="text/javascript"
  id="hs-script-loader"
  async
  defer
  src="//js.hs-scripts.com/YOUR_HUBSPOT_ID.js"
></script>
```

### 2. Contact Forms

**Files:**
- `src/app/page.tsx` (Homepage contact form)
- `src/app/properties/[id]/page.tsx` (Property inquiry form)

Replace the placeholder values:

```typescript
<HubSpotForm 
  portalId="YOUR_PORTAL_ID" 
  formId="YOUR_FORM_ID"
/>
```

**For property detail pages:**
```typescript
<HubSpotForm 
  portalId="YOUR_PORTAL_ID" 
  formId="YOUR_PROPERTY_INQUIRY_FORM_ID"
/>
```

### 3. CTAs (Call-to-Actions)

**File:** `src/app/properties/[id]/page.tsx`

Replace the placeholder values in property detail pages:

```typescript
<HubSpotCTA 
  ctaId="YOUR_CTA_ID" 
  portalId="YOUR_PORTAL_ID"
/>
```

## Creating HubSpot Assets

### Setting Up Forms

1. Log into your HubSpot sandbox account
2. Navigate to Marketing → Lead Capture → Forms
3. Create a new form (e.g., "Contact Form" or "Property Inquiry")
4. Copy the Form ID from the embed code
5. Update the corresponding component with the Form ID

### Setting Up CTAs

1. In HubSpot, navigate to Marketing → Lead Capture → CTAs
2. Create a new CTA (e.g., "Schedule Property Tour")
3. Copy the CTA ID from the embed code
4. Update the HubSpotCTA component with the CTA ID

### Getting Your Portal ID

1. In HubSpot, click on your account name in the top right
2. Go to Account & Billing
3. Your Hub ID (Portal ID) is displayed at the top

## Testing

After updating the configuration:

1. Start the development server: `npm run dev`
2. Open browser developer tools
3. Check the Network tab for HubSpot script loads
4. Verify forms render correctly on the homepage and property pages
5. Test form submissions to ensure they appear in HubSpot

## Campaign Tracking

The HubSpot tracking code will automatically:
- Track page views
- Identify visitors
- Track form submissions
- Enable marketing automation triggers
- Support A/B testing and personalization

## Demo Scenarios

This site is configured to demonstrate:

1. **Lead Capture**: Contact forms on homepage and property pages
2. **Property Interest**: CTAs on individual listing pages
3. **Campaign Attribution**: Track which properties generate most interest
4. **Visitor Behavior**: See how users navigate between properties
5. **Conversion Optimization**: Test different CTAs and form placements
