## Overview

The `@unbody-io/admin-api` package provides a TypeScript client for interacting with the Unbody Admin API.

## Installation

To install the package, use npm or yarn:

```bash
# using npm
npm install @unbody-io/admin-api

# using yarn
yarn add @unbody-io/admin-api
```

## Authentication

To authenticate with the Unbody Admin API, you need an admin key, which can be generated from Unbody's dashboard under **Settings > Admin Keys**.

The `UnbodyAdminAPI` class supports three methods for authentication:

- Base64 encoded `adminKey`
- Username and password (admin key ID and secret)
- Access token (Bearer token)

Example:

```typescript
import { UnbodyAdminAPI } from '@unbody-io/admin-api'

const admin = new UnbodyAdminAPI({
  auth: {
    // Auth with base64 encoded admin key
    adminKey: 'Basic ...',

    // or Username & Password
    username: 'admin-key-id',
    password: 'admin-key-secret',

    // or Access Token
    accessToken: 'Bearer ...',
  },
})
```

### Example Usage

To create a new project:

```typescript
const { data } = await admin.projects.create({
  body: {
    name: 'My New Project',
    settings: {
      textVectorizer: {
        name: 'text2vec-contextionary',
      },
    },
  },
})
```

To list projects with filters:

```typescript
await admin.projects.list({
  filter: {
    state: {
      $in: ['initialized', 'created'],
    },
    name: {
      $like: '%something%',
    },
  },
})
```

## List of Endpoints

Below is a list of endpoints available for interacting with Unbody entities such as projects, API keys, sources, and webhooks.

### Projects

#### List Projects

```typescript
const response = await admin.projects.list({
  filter: {
    name: {
      $like: '%example%',
    },
  },
  limit: 10,
  offset: 0,
})
console.log(response.data)
```

- **Method**: `GET`
- **Path**: `/projects`
- **Filterable Fields**: [Reference](#filterable-fields)
- **Pagination Parameters**: `limit`, `offset`, `sort`

#### Create Project

```typescript
const response = await admin.projects.create({
  body: {
    name: 'New Project Name',
    settings: {
      textVectorizer: {
        name: 'text2vec-contextionary',
      },
    },
  },
})
console.log(response.data)
```

- **Method**: `POST`
- **Path**: `/projects`

#### Update Project

```typescript
const response = await admin.projects.patch({
  projectId: 'your-project-id',
  body: {
    name: 'Updated Project Name',
  },
})
console.log(response.data)
```

- **Method**: `PATCH`
- **Path**: `/projects/{projectId}`

#### Delete Project

```typescript
await admin.projects.delete({
  projectId: 'your-project-id',
})
console.log('Project deleted successfully')
```

- **Method**: `DELETE`
- **Path**: `/projects/{projectId}`

#### Restore Project

```typescript
const response = await admin.projects.restore({
  projectId: 'your-project-id',
})
console.log(response.data)
```

- **Method**: `POST`
- **Path**: `/projects/{projectId}/restore`

### API Keys

#### Create Admin API Key

```typescript
const response = await admin.apiKeys.create({
  body: {
    name: 'New Admin API Key',
    expiresAfter: '2024-12-31',
  },
})
console.log(response.data)
```

- **Method**: `POST`
- **Path**: `/api-keys`

#### Delete Admin API Key

```typescript
await admin.apiKeys.delete({
  id: 'api-key-id',
})
console.log('Admin API Key deleted successfully')
```

- **Method**: `DELETE`
- **Path**: `/api-keys/{id}`

### Project API Keys

#### Create Project API Key

```typescript
const { data } = await admin.projects.createApiKey({
  projectId: 'your-project-id',
  body: {
    name: 'New Project API Key',
  },
})

console.log('Secret: ', data.data.key)
```

- **Method**: `POST`
- **Path**: `/projects/{projectId}/api-keys`

#### Delete Project API Key

```typescript
await admin.projects.deleteApiKey({
  projectId: 'your-project-id',
  id: 'api-key-id',
})
```

- **Method**: `DELETE`
- **Path**: `/projects/{projectId}/api-keys`

### Project Webhooks

#### List Project Webhooks

```typescript
const response = await admin.projects.listWebhooks({
  projectId: 'your-project-id',
})
console.log(response.data)
```

- **Method**: `GET`
- **Path**: `/projects/{projectId}/webhooks`
- **Filterable Fields**: [Reference](#filterable-fields)

#### Create Project Webhook

```typescript
const response = await admin.projects.createWebhook({
  projectId: 'your-project-id',
  body: {
    url: 'https://your-webhook-url.com',
  },
})
console.log(response.data)
```

- **Method**: `POST`
- **Path**: `/projects/{projectId}/webhooks`

#### Delete Project Webhook

```typescript
await admin.projects.deleteWebhook({
  projectId: 'your-project-id',
  webhookId: 'webhook-id',
})
console.log('Webhook deleted successfully')
```

- **Method**: `DELETE`
- **Path**: `/projects/{projectId}/webhooks/{webhookId}`

### Project Sources

#### List Project Sources

```typescript
const response = await admin.projects.listSources({
  projectId: 'your-project-id',
})
console.log(response.data)
```

- **Method**: `GET`
- **Path**: `/projects/{projectId}/sources`
- **Filterable Fields**: [Reference](#filterable-fields)

#### Create Source

```typescript
const response = await admin.projects.createSource({
  projectId: 'your-project-id',
  body: {
    name: 'New Source',
    provider: 'github_issues',
  },
})
console.log(response.data)
```

- **Method**: `POST`
- **Path**: `/projects/{projectId}/sources`

#### Update Source

```typescript
const response = await admin.projects.patchSource({
  projectId: 'your-project-id',
  sourceId: 'source-id',
  body: {
    name: 'Updated Source Name',
  },
})
console.log(response.data)
```

- **Method**: `PATCH`
- **Path**: `/projects/{projectId}/sources/{sourceId}`

#### Delete Source

```typescript
await admin.projects.deleteSource({
  projectId: 'your-project-id',
  sourceId: 'source-id',
})
```

- **Method**: `DELETE`
- **Path**: `/projects/{projectId}/sources/{sourceId}`

### Source Indexing

#### Initialize Source

```typescript
await admin.projects.initializeSource({
  projectId: 'your-project-id',
  sourceId: 'source-id',
})
```

- **Method**: `POST`
- **Path**: `/projects/{projectId}/sources/{sourceId}/indexing/initialize`

#### Trigger Manual Update

```typescript
await admin.projects.updateSource({
  projectId: 'your-project-id',
  sourceId: 'source-id',
})
```

- **Method**: `POST`
- **Path**: `/projects/{projectId}/sources/{sourceId}/indexing/update`

#### Rebuild Source

```typescript
await admin.projects.rebuildSource({
  projectId: 'your-project-id',
  sourceId: 'source-id',
})
```

- **Method**: `POST`
- **Path**: `/projects/{projectId}/sources/{sourceId}/indexing/rebuild`

## Filterable Fields

### Project Filterable Fields

| Field                                     | Type   | Filter Operators                                             |
| ----------------------------------------- | ------ | ------------------------------------------------------------ |
| `name`                                    | string | [String Filter Operators](#string-and-enum-filter-operators) |
| [`state`](#project-state-possible-values) | enum   | [Enum Filter Operators](#string-and-enum-filter-operators);  |
| `pausedAt`                                | Date   | [Date Filter Operators](#date-filter-operators)              |
| `restoredAt`                              | Date   | [Date Filter Operators](#date-filter-operators)              |
| `createdAt`                               | Date   | [Date Filter Operators](#date-filter-operators)              |
| `updatedAt`                               | Date   | [Date Filter Operators](#date-filter-operators)              |

#### Project State Possible Values

- `created`
- `initializing`
- `initialized`
- `paused`
- `pausing`
- `restoring`

### Source Filterable Fields

| Field                                    | Type    | Filter Operators                                             |
| ---------------------------------------- | ------- | ------------------------------------------------------------ |
| `name`                                   | string  | [String Filter Operators](#string-and-enum-filter-operators) |
| `initialized`                            | boolean | [Boolean Filter Operators](#boolean-filter-operators)        |
| [`state`](#source-state-possible-values) | enum    | [Enum Filter Operators](#string-and-enum-filter-operators)   |
| [`type`](#source-type-possible-values)   | enum    | [Enum Filter Operators](#string-and-enum-filter-operators)   |
| `pausedAt`                               | Date    | [Date Filter Operators](#date-filter-operators)              |
| `restoredAt`                             | Date    | [Date Filter Operators](#date-filter-operators)              |
| `createdAt`                              | Date    | [Date Filter Operators](#date-filter-operators)              |
| `updatedAt`                              | Date    | [Date Filter Operators](#date-filter-operators)              |

#### Source State Possible Values

- `initializing`
- `updating`
- `deleting`
- `paused`
- `idle`

#### Source Type Possible Values

- `google_drive`
- `google_calendar`
- `discord`
- `github_branch`
- `github_issues`
- `push_api`

### Webhook Filterable Fields

| Field       | Type | Filter Operators                                |
| ----------- | ---- | ----------------------------------------------- |
| `createdAt` | Date | [Date Filter Operators](#date-filter-operators) |

## Filter Operators

### String and Enum Filter Operators

- `$eq`, `$ne`, `$in`, `$nin`, `$null`, `$like`

### Number Filter Operators

- `$eq`, `$ne`, `$gt`, `$lt`, `$gte`, `$lte`, `$null`

### Boolean Filter Operators

- `$eq`, `$ne`, `$null`

### Date Filter Operators

- `$gt`, `$gte`, `$lt`, `$lte`, `$null`
