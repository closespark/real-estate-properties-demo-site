# Data Mapping: Source Records to HubSpot

This document clarifies the mapping between source property data identifiers and HubSpot Listings custom object fields.

## Identifier Fields Overview

Source property records contain multiple identifier fields. Understanding their purpose prevents confusion when integrating with HubSpot.

| Field | Description | HubSpot Mapping |
|-------|-------------|-----------------|
| `assetId` | **Primary identifier** - Unique numeric ID for each property | `external_listing_id` |
| `assetItemId` | Internal item ID (related to asset inventory) | Not mapped |
| `assetReferenceId` | Secondary, human-facing reference number | Store in `reference_id` if needed |

## Key Distinction: assetId vs assetReferenceId

### `assetId` (Primary External ID)

- **Purpose**: Authoritative unique identifier for each property listing
- **HubSpot field**: `external_listing_id`
- **Example**: `22242`
- **Used for**: HubSpot Listing lookups, Contact-Listing associations, URL routing

### `assetReferenceId` (Secondary Reference)

- **Purpose**: Human-facing reference number, often used internally
- **HubSpot field**: Should be stored separately (e.g., `reference_id`), **not** in `external_listing_id`
- **Example**: `190402`
- **Used for**: Internal tracking, legacy system references, human readability

### Why This Matters

The `external_listing_id` in HubSpot is the **authoritative join key** between:
- The website's property detail pages (URLs like `/properties/22242`)
- HubSpot's Listings custom object records
- Contact-Listing associations created when users submit inquiry forms

Using `assetId` as the external ID ensures:
1. **Consistency**: Property URLs match HubSpot lookup values
2. **Reliability**: No ambiguity about which identifier to use
3. **Simplicity**: One-to-one mapping without translation

## Example: Property at 1104 LUCHARLES AVE, MOUNT MORRIS, MI 48458

```json
{
  "assetId": 22242,           // ← This is external_listing_id in HubSpot
  "assetItemId": 22227,
  "assetReferenceId": "190402", // ← Secondary reference, NOT the external ID
  "addressLine1": "1104 LUCHARLES AVE",
  "city": "MOUNT MORRIS",
  "state": "MI",
  "zip": "48458"
}
```

In this case:
- Website URL: `/properties/22242`
- HubSpot `external_listing_id`: `22242`
- The `assetReferenceId` of `190402` is a separate internal reference

## Implementation in Code

### Property Data (`src/data/properties.ts`)

Properties use `assetId` as their `id` field:

```typescript
{
  id: '22242',  // This is the assetId from source data
  title: 'Mount Morris Property',
  address: '1104 Lucharles Ave',
  // ...
}
```

### Request Info Form (`src/app/api/request-info/route.ts`)

The API expects `external_listing_id` matching the property `id` (which is `assetId`):

```typescript
{
  external_listing_id: '22242',  // Matches property.id and assetId
  // ...
}
```

### HubSpot Lookup (`src/lib/hubspot.ts`)

The `findListingByExternalId` function searches HubSpot using `external_listing_id`:

```typescript
propertyName: 'external_listing_id',
value: externalListingId,  // e.g., '22242'
```

## Best Practices

1. **Never use `assetReferenceId` as `external_listing_id`** - This causes lookup failures
2. **Always use `assetId` for external integrations** - It's the authoritative identifier
3. **Store `assetReferenceId` separately** - If needed, use a dedicated field like `reference_id`
4. **Document ID sources clearly** - When syncing data, note which source field maps to which target

## Troubleshooting

### "Listing not found" errors

If Contact-Listing associations fail with "listing not found":
1. Verify the `external_listing_id` in HubSpot matches the `assetId` from source data
2. Ensure HubSpot records were created with `assetId`, not `assetReferenceId`
3. Check that the value is stored as a string in HubSpot

### Mismatched IDs

If HubSpot records have `assetReferenceId` in `external_listing_id`:
1. This is incorrect and should be corrected
2. Update HubSpot records to use `assetId` values instead
3. Do not change existing HubSpot record IDs - update the `external_listing_id` property value
