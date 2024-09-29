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

For more details on configuring project settings, see the [Project Settings Reference](#project-settings-reference).

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

## Project Settings Reference

### Project Settings Fields

- **`textVectorizer`**
  - Defines the text vectorization model used for representing text as vectors, which is essential for search operations.
  - **`name: string`** - Possible values:
    - `text2vec-contextionary`
    - `text2vec-transformers`
    - `text2vec-openai-ada-002`
    - `text2vec-openai-text-embedding-3-large`
    - `text2vec-openai-text-embedding-small`
    - `text2vec-cohere-multilingual-v3.0`
    - `text2vec-cohere-multilingual-light-v3.0`
    - `text2vec-cohere-english-v3.0`
    - `text2vec-cohere-english-light-v3.0`
    - `text2vec-cohere-english-v2.0`
    - `text2vec-cohere-english-light-v2.0`

- **`imageVectorizer`**
  - Sets the model used for representing images as vectors.
  - **`name: string`** - Possible value:
    - `img2vec-neural`

- **`qnaProvider`**
  - Defines the provider used for Q&A capabilities within the project.
  - **`name: string`** - Possible values:
    - `qna-transformers`
    - `qna-openai-gpt-3.5-turbo-instruct`

- **`generativeSearch`**
  - **`name: string`** - Possible value:
    - `generative-unbody`
  - **`options`**
    - **`model: string`** - Possible values:
      - `gpt-3.5-turbo`
      - `gpt-4`
      - `gpt-4-turbo`
      - `gpt-4o`
      - `gpt-4o-mini`
      - `command`
      - `command-light`
      - `command-r`
      - `command-r-plus`
      - `open-mistral-7b`
      - `open-mixtral-8x7b`

- **`reranker`**
  - Specifies the reranking model used to prioritize search results.
  - **`name: string`** - Possible values:
    - `reranker-transformers`
    - `reranker-cohere-multilingual-v3.0`
    - `reranker-cohere-multilingual-v2.0`
    - `reranker-cohere-english-v3.0`
    - `reranker-cohere-english-v2.0`

- **`spellcheck`**
  - Configures the spellcheck functionality.
  - **`name: string`** - Possible value:
    - `text-spellcheck`

- **`autoSummary`**
  - Automatically generates summaries for text content.
  - **`name: string`** - Possible values:
    - `autosum-openai-gpt-3.5-turbo`
    - `autosum-openai-gpt-4o`
    - `autosum-openai-gpt-4o-mini`
    - `autosum-cohere-command-r`

- **`autoKeywords`**
  - Extracts keywords from text automatically.
  - **`name: string`** - Possible values:
    - `autokeywords-openai-gpt-3.5-turbo`
    - `autokeywords-openai-gpt-4o`
    - `autokeywords-openai-gpt-4o-mini`

- **`autoEntities`**
  - Automatically identifies and extracts entities from text.
  - **`name: string`** - Possible values:
    - `autoentities-openai-gpt-3.5-turbo`
    - `autoentities-openai-gpt-4o`
    - `autoentities-openai-gpt-4o-mini`

- **`autoTopics`**
  - Automatically generates topics from the content.
  - **`name: string`** - Possible values:
    - `autotopics-openai-gpt-3.5-turbo`
    - `autotopics-openai-gpt-4o`
    - `autotopics-openai-gpt-4o-mini`

- **`autoVision`**
  - Generates captions, labels, and extracts texts from image files.
  - **`name: string`** - Possible values:
    - `autovision-openai-gpt-4o`
    - `autovision-openai-gpt-4o-mini`
    - `autovision-openai-gpt-4-turbo`

- **`customSchema`**
  - Allows defining custom data schemas for projects.
  - **`name: string`** - Possible value: `customSchema`
  - **`options`**
    - **`collections`**: An array of collection definitions, each with the following fields:
      - **`name: string`** - The name of the collection in PascalCase format with the suffix `Collection` (e.g., `CustomCollection`).
      - **`fields`**: An array of field definitions, each including:
        - **`name: string`** - Field name in camelCase format.
        - **`array: boolean`** - Indicates whether the field is an array.
        - **`description: string`** - (Optional) Description of the field.
        - **`type`** - Possible types: `int`, `number`, `text`, `uuid`, `date`, `boolean`, `object`, `phoneNumber`, `geoCoordinates`, `cref`.

        - **Additional Field Configurations**:
          - **`text` field**:
            - Can have additional properties:
              - **`skipTokenization: boolean`** - If `true`, the field will not be tokenized.
              - **`tokenization: enum`** - Defines the tokenization strategy for the field. Possible values are `word`, `field`, `lowercase`, and `whitespace`.
          - **`phoneNumber` field**:
            - **Input/Output Schema**:
              ```json
              {
                "input": "020 1234567",                       // Required. Raw input in string format
                "defaultCountry": "nl",                       // Required if only a national number is provided, ISO 3166-1 alpha-2 country code. Only set if explicitly set by the user.
                "internationalFormatted": "+31 20 1234567",   // Read-only string
                "countryCode": 31,                            // Read-only unsigned integer, numerical country code
                "national": 201234567,                        // Read-only unsigned integer, numerical representation of the national number
                "nationalFormatted": "020 1234567",           // Read-only string
                "valid": true                                 // Read-only boolean. Whether the parser recognized the phone number as valid
              }
              ```
          - **`geoCoordinates` field**:
            - **Input/Output Schema**:
              ```json
              {
                "latitude": 52.366667,
                "longitude": 4.9
              }
              ```
          - **`object` field**:
            - Must have a **`fields`** field, which is an array of field definitions. Possible types within the `object` are: `int`, `number`, `text`, `date`, `boolean`, `uuid`.
            - **Note**: Currently, objects are not vectorized, and filter operators are not supported.
          - **`cref` field**:
            - Must have a **`refs`** array where each reference includes:
              - **`collection: string`** - The collection name being referenced.
              - **`field: string`** - The foreign collection's field being referenced.
            - **Available Built-in Collections** for `cref` include:
              - `ImageBlock`'s `document` field
              - `AudioFile`'s `document` field
              - `VideoFile`'s `document` field

### Example Configuration
Here’s an example of configuring project settings with various options:

```json
{
  "textVectorizer": {
    "name": "text2vec-openai-text-embedding-3-small"
  },
  "spellcheck": {
    "name": "text-spellcheck"
  },
  "reranker": {
    "name": "reranker-cohere-multilingual-v3.0"
  },
  "autoTopics": {
    "name": "autotopics-openai-gpt-4o"
  },
  "autoVision": {
    "name": "autovision-openai-gpt-4o"
  },
  "autoSummary": {
    "name": "autosum-openai-gpt-4o"
  },
  "qnaProvider": {
    "name": "qna-openai-gpt-3.5-turbo-instruct"
  },
  "autoEntities": {
    "name": "autoentities-openai-gpt-4o"
  },
  "autoKeywords": {
    "name": "autokeywords-openai-gpt-4o"
  },
  "generativeSearch": {
    "name": "generative-unbody",
    "options": {
      "model": "gpt-4o"
    }
  },
  "customSchema": {
    "name": "customSchema",
    "options": {
      "collections": [
        {
          "name": "ProfileCollection",
          "fields": [
            {
              "name": "name",
              "type": "text"
            },
            {
              "name": "firstName",
              "type": "text"
            },
            {
              "name": "lastName",
              "type": "text"
            },
            {
              "name": "photos",
              "type": "cref",
              "refs": [
                {
                  "collection": "ImageBlock",
                  "field": "document"
                }
              ]
            },
            {
              "name": "videos",
              "type": "cref",
              "refs": [
                {
                  "collection": "VideoFile",
                  "field": "document"
                }
              ]
            },
            {
              "name": "emailAddress",
              "type": "text",
              "tokenization": "field"
            },
            {
              "name": "phoneNumber",
              "type": "phoneNumber"
            },
            {
              "name": "address",
              "type": "object",
              "fields": [
                {
                  "name": "street",
                  "type": "text"
                },
                {
                  "name": "city",
                  "type": "text"
                },
                {
                  "name": "state",
                  "type": "text"
                },
                {
                  "name": "zip",
                  "type": "text"
                },
                {
                  "name": "country",
                  "type": "text"
                }
              ]
            },
            {
              "name": "addressCoordinates",
              "type": "geoCoordinates"
            }
          ]
        }
      ]
    }
  }
}
```
