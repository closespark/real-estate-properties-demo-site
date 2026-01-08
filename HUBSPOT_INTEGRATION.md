# HubSpot Integration Guide

This demo site includes HubSpot sandbox tracking, forms, and CTAs for marketing campaign demonstrations.

## External Form Integration

All forms on this site use **HubSpot's external form embed** approach, which means:
- Forms submit directly to your HubSpot sandbox instance
- Lead data is captured in real-time in HubSpot
- Marketing automation workflows can be triggered immediately
- No server-side proxy or API keys required
- Forms work with HubSpot's GDPR and consent features

## Server-Side Request Info Integration

Property detail pages include an enhanced "Request Info" form that uses server-side processing for:
- Contact creation/update with email-based deduplication
- Marketing consent management (explicit opt-in)
- Listing lookup and Contact-Listing association

See [REQUEST_INFO_INTEGRATION.md](./REQUEST_INFO_INTEGRATION.md) for detailed documentation.

## Configuration Required

To activate the HubSpot features, you need to set the following environment variables in your Render dashboard or `.env.local` file for local development:

### Environment Variables

#### Client-Side (Tracking & Basic Forms)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | Your HubSpot portal ID (Hub ID) |
| `NEXT_PUBLIC_HUBSPOT_FORM_GUID` | Form GUID for all HubSpot forms |

#### Server-Side (Request Info Form Integration)

| Variable | Required | Description |
|----------|----------|-------------|
| `HUBSPOT_PORTAL_ID` | Yes | HubSpot portal ID (Hub ID) |
| `HUBSPOT_FORM_GUID` | Yes | Form GUID for contact creation |
| `HUBSPOT_ACCESS_TOKEN` | Yes | Private App access token (keep secret!) |
| `HUBSPOT_LISTINGS_OBJECT_TYPE` | No | Custom object type ID (default: `listings`) |
| `HUBSPOT_CONTACT_LISTING_ASSOCIATION_TYPE` | No | Association type ID (default: `contact_to_listing`) |

### Local Development Setup

Create a `.env.local` file in the project root:

```bash
# Client-side (tracking)
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=your_portal_id
NEXT_PUBLIC_HUBSPOT_FORM_GUID=your_form_guid

# Server-side (Request Info form)
HUBSPOT_PORTAL_ID=your_portal_id
HUBSPOT_FORM_GUID=your_form_guid
HUBSPOT_ACCESS_TOKEN=your_private_app_access_token
```

### Render Deployment Setup

The environment variables are pre-configured in `render.yaml`. Set their values in the Render dashboard:

1. Go to your Render service dashboard
2. Navigate to **Environment** tab
3. Add the HubSpot environment variables with your actual values

## Creating HubSpot Assets

### Setting Up External Forms in HubSpot Sandbox

1. Log into your HubSpot sandbox account
2. Navigate to Marketing → Lead Capture → Forms
3. Create a form to use across the site (name, email, phone, message)

4. For the form:
   - Click on the form you created
   - Click "Share" or "Embed" button
   - Select "Embed code"
   - Find the Form GUID in the embed code (looks like: `formId: "abc123-def456-ghi789"`)
   - Copy the Form GUID
   - Set the `NEXT_PUBLIC_HUBSPOT_FORM_GUID` environment variable

### Region Configuration

If your HubSpot sandbox is in a different data center (EU, etc.), you can pass the `region` prop to the HubSpotForm component:

```typescript
<HubSpotForm 
  formId="your-form-id"
  region="eu1"  // or "na1" for North America (default)
/>
```

Available regions:
- `na1` - North America (default)
- `eu1` - Europe
- `ap1` - Asia Pacific

### Getting Your Portal ID

1. In HubSpot, click on your account name in the top right
2. Go to Account & Billing
3. Your Hub ID (Portal ID) is displayed at the top
4. Set the `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` environment variable

## Testing External Form Submissions

After configuring the environment variables:

1. Start the development server: `npm run dev`
2. Open browser developer tools
3. Check the Network tab for HubSpot script loads:
   - Look for `js.hsforms.net/forms/embed/v2.js`
   - Verify `js.hs-scripts.com/{YOUR_PORTAL_ID}.js` loads
4. Verify forms render correctly on each page:
   - Homepage: Contact form
   - Property detail pages: Property inquiry form
   - `/agents`: Agent registration form
   - `/financing`: VA financing application form
5. Test form submissions:
   - Fill out and submit a form
   - Check the browser console for confirmation messages
   - Verify the submission appears in HubSpot (Contacts → Forms)
   - Confirm contact is created with form field data

## Form Submission Flow

When a user submits a form:

1. **Form Validation**: HubSpot validates required fields client-side
2. **Direct Submission**: Form data submits directly to HubSpot sandbox via AJAX
3. **Lead Creation**: HubSpot creates or updates contact record in real-time
4. **Workflow Triggers**: Any marketing automation workflows are triggered immediately
5. **Confirmation**: User sees thank you message or is redirected
6. **Analytics**: Submission is tracked in HubSpot analytics and reports

## Campaign Tracking

The HubSpot tracking code will automatically:
- Track page views across all pages (homepage, properties, agents, financing)
- Identify visitors and create anonymous contacts
- Track form submissions from all 4 forms
- Enable marketing automation triggers based on form submissions
- Support A/B testing and personalization
- Track property views for lead scoring (which properties generate most interest)
- Enable retargeting campaigns based on visitor behavior

## Marketing Automation Examples

With these external forms, you can create workflows like:

1. **New Property Inquiry**: 
   - Trigger: Property inquiry form submitted
   - Action: Send automated email with property details
   - Action: Notify sales team
   - Action: Add to "Hot Leads" list

2. **Agent Registration**:
   - Trigger: Agent registration form submitted
   - Action: Send welcome email with portal access
   - Action: Enroll in agent training email sequence
   - Action: Assign to agent success manager

3. **VA Financing Application**:
   - Trigger: VA financing form submitted
   - Action: Send financing guide PDF
   - Action: Schedule follow-up call task
   - Action: Add to "VA Loan Prospects" list

4. **Lead Nurturing**:
   - Trigger: Contact form submitted but no follow-up
   - Action: Wait 3 days, send property recommendations
   - Action: Wait 7 days, send success stories
   - Action: Wait 14 days, send limited time offer

## Demo Scenarios

This site is configured to demonstrate:

1. **Lead Capture**: Contact forms on homepage and property pages
2. **Property Interest**: CTAs on individual listing pages
3. **Campaign Attribution**: Track which properties generate most interest
4. **Visitor Behavior**: See how users navigate between properties
5. **Conversion Optimization**: Test different CTAs and form placements
