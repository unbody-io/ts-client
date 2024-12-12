# Unbody Admin

- [Unbody Admin](#unbody-admin)
  - [Overview](#overview)
  - [Installation](#installation)
  - [Initialization](#initialization)
    - [Authentication Methods](#authentication-methods)
  - [Usage](#usage)
    - [Creating a Project](#creating-a-project)
    - [Creating a Source](#creating-a-source)
    - [Creating a Project API Key](#creating-a-project-api-key)
    - [Listing Resources](#listing-resources)
      - [Optional Properties](#optional-properties)
      - [Returned Values](#returned-values)
    - [Endpoints](#endpoints)
      - [Projects](#projects)
      - [Project API Keys](#project-api-keys)
      - [Project Webhooks](#project-webhooks)
      - [Project Sources](#project-sources)
      - [Admin API Keys](#admin-api-keys)
    - [Filterable Fields](#filterable-fields)
      - [Project Filterable Fields](#project-filterable-fields)
      - [Project State Possible Values](#project-state-possible-values)
      - [Source Filterable Fields](#source-filterable-fields)
      - [Source State Possible Values](#source-state-possible-values)
      - [Source Type Possible Values](#source-type-possible-values)
      - [Webhook Filterable Fields](#webhook-filterable-fields)
    - [Filter Operators](#filter-operators)
      - [String and Enum Filter Operators](#string-and-enum-filter-operators)
      - [Number Filter Operators](#number-filter-operators)
      - [Boolean Filter Operators](#boolean-filter-operators)
      - [Date Filter Operators](#date-filter-operators)
  - [Project Settings Guide](#project-settings-guide)
    - [Using `.set` Method](#using-set-method)
    - [Using `.get` Method](#using-get-method)
    - [`TextVectorizer` Configuration](#textvectorizer-configuration)
    - [`ImageVectorizer` Configuration](#imagevectorizer-configuration)
    - [`QnA` Configuration](#qna-configuration)
    - [`Generative` Configuration](#generative-configuration)
    - [`Reranker` Configuration](#reranker-configuration)
    - [`Spellcheck` Configuration](#spellcheck-configuration)
    - [`AutoSummary` Configuration](#autosummary-configuration)
    - [`AutoKeywords` Configuration](#autokeywords-configuration)
    - [`AutoEntities` Configuration](#autoentities-configuration)
    - [`AutoTopics` Configuration](#autotopics-configuration)
    - [`AutoVision` Configuration](#autovision-configuration)
    - [`PdfParser` Configuration](#pdfparser-configuration)
    - [`CustomSchema` Configuration](#customschema-configuration)
      - [Usage Example](#usage-example)
      - [Field Definition](#field-definition)
      - [Supported Field Types](#supported-field-types)
      - [Examples of Advanced Field Definitions](#examples-of-advanced-field-definitions)
        - [`Cref` Field Example](#cref-field-example)
        - [`Object` Field Example](#object-field-example)
      - [Notes and Important Details](#notes-and-important-details)
    - [`Enhancement` Configuration](#enhancement-configuration)
      - [Defining a Custom Enhancement Pipeline](#defining-a-custom-enhancement-pipeline)
      - [Optional Parameters for a Pipeline](#optional-parameters-for-a-pipeline)
      - [Pipeline Context (`ctx`)](#pipeline-context-ctx)
      - [Key Context Components](#key-context-components)
      - [Steps in a Pipeline](#steps-in-a-pipeline)
        - [Optional Parameters for a Step](#optional-parameters-for-a-step)
      - [Step Example](#step-example)
      - [Setting the Enhancement in Project Settings](#setting-the-enhancement-in-project-settings)
      - [Available Actions](#available-actions)
        - [`TextGenerator`](#textgenerator)
        - [`StructuredGenerator`](#structuredgenerator)
        - [`Summarizer`](#summarizer)

## Overview

`UnbodyAdmin` is a TypeScript/JavaScript client for interacting with Unbody’s Admin API. It provides a convenient and unified interface to manage projects, sources, webhooks, keys, and more within your Unbody environment.

## Installation

```bash
# using npm
npm install unbody

# using yarn
yarn add unbody
```

## Initialization

To start using `UnbodyAdmin`, you need to create an instance of it. You’ll need to provide valid authentication credentials, such as Admin keys or a JWT access token.

**Example Initialization:**

```tsx
import { UnbodyAdmin } from 'unbody/admin'

const admin = new UnbodyAdmin({
  auth: {
    // credentials go here
  },
})
```

### Authentication Methods

1. **Admin Keys (Basic Auth)** (recommended)

Generate an admin key from the Unbody dashboard and use it as username and password:

```tsx
const admin = new UnbodyAdmin({
  auth: {
    username: '[admin-key-id]',
    password: '[admin-key-secret]',
  },
})
```

1. **Access Token (Bearer Token)**
   If you have a JWT access token, you can provide it directly:

```tsx
const admin = new UnbodyAdmin({
  auth: {
    accessToken: 'Bearer [your-access-token]',
  },
})
```

## Usage

### Creating a Project

Creating a project in Unbody requires configuring its settings and saving the project instance. You can use the provided helper classes to define the project settings easily.

Here’s an example of how to create a new project with a specific configuration:

```tsx
import { ProjectSettings, TextVectorizer } from 'unbody/admin'

// Define project settings
const settings = new ProjectSettings().set(
  new TextVectorizer(TextVectorizer.Transformers.Default),
)

// Create a project reference
const project = admin.projects.ref({
  name: 'New Project',
  settings,
})

// Save the project
await project.save()

console.log(`Created "${project.name}"; id: ${project.id}`)
```

For more details on configuring project settings, see the [Project Settings Guide](#project-settings-guide)

### Creating a Source

To create a source within a project, you first need to reference the project. Here’s an example:

```tsx
// Fetch the project instance
const project = await admin.projects.get({
  id: '[project id]',
})

// Alternatively, reference the project directly
const project = admin.projects.ref({
  id: '[project id]',
})

// Create a source within the project
const source = project.sources.ref({
  name: '[source name]',
  type: SourceTypes['[source type]'],
})

// Save the source
await source.save()
```

Ensure the `SourceTypes` corresponds to a valid type supported by the API. For a list of available source types, see the [Source Types Reference](Link to be added later)

### Creating a Project API Key

You can create an API key for a specific project to enable secure access to its resources. Here’s an example:

```tsx
const apiKey = await project.apiKeys
  .ref({
    name: 'API Key',
  })
  .save()

console.log(apiKey.id, apiKey.key)
```

The `apiKey.key` should be stored securely, as it will not be retrievable after creation. If the key is lost, it must be deleted, and a new one should be created.

### Listing Resources

You can list resources such as projects or sources using the provided API methods. Here’s how to retrieve a list of projects or sources:

```tsx
// List projects
const { projects, pagination } = await admin.projects.list({})

// List sources for a specific project
const project = admin.projects.ref({ id: ['project id'] })
const { sources, pagination } = await project.sources.list({})
```

#### Optional Properties

Both methods accept the following optional properties:

- **`limit`**: `number` - Maximum number of results to return.
- **`offset`**: `number` - Number of results to skip before starting the list.
- **`sort`**: `Object` - Sorting configuration with the following fields:
  - `field`: `string` - The field to sort by.
  - `order`: `"asc" | "desc"` - Sorting order.
- **`filter`**: `Object` - Filtering criteria specific to the resource type.
  See the [Filterable Properties for Projects](#project-filterable-fields) and [Filterable Properties for Sources](#source-filterable-fields).

#### Returned Values

Each method returns:

1. **An array of resources** (e.g., `projects` or `sources`).
2. **A pagination object** with the following properties:
   - **`count`**: `number` - The number of results returned.
   - **`total`**: `number` - The total number of results matching the filter criteria.
   - **`offset`**: `number` - The offset value used in the request.
   - **`limit`**: `number` - The limit value used in the request.

### Endpoints

#### Projects

- **Create Project**
  ```tsx
  await admin.projects.ref({ ...params }).save()
  ```
  - **Method**: `POST`
  - **Path**: `/projects`
- **List Projects**
  ```tsx
  const { projects } = await admin.projects.list({ ...params })
  ```
  - **Method**: `GET`
  - **Path**: `/projects`
  - **Filterable Fields**: [Reference](#project-filterable-fields)
  - **Pagination Parameters**: `limit`, `offset`, `sort`
- **Delete Project**
  ```tsx
  await admin.projects.delete(projectRef) // or
  await admin.projects.delete({ id: '[project-id]' })
  ```
  - **Method**: `DELETE`
  - **Path**: `/projects/{projectId}`

#### Project API Keys

- **Create API Key**
  ```tsx
  await projectRef.apiKeys.ref({ ...params }).save()
  ```
  - **Method**: `POST`
  - **Path**: `/projects/{projectId}/api-keys`
- **Delete API Key**
  ```tsx
  await projectRef.apiKeys.delete({ id: '[api-key-id]' })
  ```
  - **Method**: `DELETE`
  - **Path**: `/projects/{projectId}/api-keys/{apiKeyId}`

#### Project Webhooks

- **Create Webhook**
  ```tsx
  await project.webhooks.ref({ ...params }).save()
  ```
  - **Method**: `POST`
  - **Path**: `/projects/{projectId}/webhooks`
- **List Webhooks**
  ```tsx
  const { webhooks } = await project.webhooks.list({ ...params })
  ```
  - **Method**: `GET`
  - **Path**: `/projects/{projectId}/webhooks`
  - **Filterable Fields**: [Reference](#webhook-filterable-fields)
- **Delete Webhook**
  ```tsx
  await project.webhooks.delete({ id: '[webhook-id]' })
  ```
  - **Method**: `DELETE`
  - **Path**: `/projects/{projectId}/webhooks/{webhookId}`

#### Project Sources

- **Create Source**

  ```tsx
  import { SourceTypes } from 'unbody/admin'

  await project.sources
    .ref({
      name: 'New Source',
      type: SourceTypes.PushApi,
    })
    .save()
  ```

  - **Method**: `POST`
  - **Path**: `/projects/{projectId}/sources`

- **List Sources**
  ```tsx
  const { sources } = await project.sources.list({ ...params })
  ```
  - **Method**: `GET`
  - **Path**: `/projects/{projectId}/sources`
  - **Filterable Fields**: [Reference](#source-filterable-fields)
- **Delete Source**
  ```tsx
  await project.sources.delete({ id: '[source-id]' })
  ```
  - **Method**: `DELETE`
  - **Path**: `/projects/{projectId}/sources/{sourceId}`
- **Update Source**
  ```tsx
  await project.sources.update(sourceRef) // or
  await project.sources.update({ id: '[source-id]' })
  ```
  - **Method**: `PATCH`
  - **Path**: `/projects/{projectId}/sources/{sourceId}`
- **Initialize Source**
  ```tsx
  await project.sources.initialize(sourceRef) // or
  await project.sources.initialize({ id: '[source-id]' })
  ```
  - **Method**: `POST`
  - **Path**: `/projects/{projectId}/sources/{sourceId}/indexing/initialize`
- **Rebuild Source**
  ```tsx
  await project.sources.rebuild(sourceRef) // or
  await project.sources.rebuild({ id: '[source-id]' })
  ```
  - **Method**: `POST`
  - **Path**: `/projects/{projectId}/sources/{sourceId}/indexing/rebuild`

#### Admin API Keys

- **Create Admin Key**
  ```tsx
  await admin.adminKeys.ref({ ...params }).save()
  ```
  - **Method**: `POST`
  - **Path**: `/api-keys`
- **Delete Admin Key**
  ```tsx
  await admin.adminKeys.delete({ id: '[admin-key-id]' })
  ```
  - **Method**: `DELETE`
  - **Path**: `/api-keys/{apiKeyId}`

### Filterable Fields

#### Project Filterable Fields

| Field                                     | Type   | Filter Operators                                             |
| ----------------------------------------- | ------ | ------------------------------------------------------------ |
| `name`                                    | string | [String Filter Operators](#string-and-enum-filter-operators) |
| [`state`](#project-state-possible-values) | enum   | [Enum Filter Operators](#string-and-enum-filter-operators)   |
| `pausedAt`                                | Date   | [Date Filter Operators](#date-filter-operators)              |
| `restoredAt`                              | Date   | [Date Filter Operators](#date-filter-operators)              |
| `createdAt`                               | Date   | [Date Filter Operators](#date-filter-operators)              |
| `updatedAt`                               | Date   | [Date Filter Operators](#date-filter-operators)              |

#### Project State Possible Values

To use these states in your code, import the `ProjectStates` enum:

```tsx
import { ProjectStates } from 'unbody/admin'
```

These are the possible states a project can be in, along with their corresponding TypeScript enumeration values:

| State          | TypeScript Enum              |
| -------------- | ---------------------------- |
| `created`      | `ProjectStates.Created`      |
| `initializing` | `ProjectStates.Initializing` |
| `initialized`  | `ProjectStates.Initialized`  |
| `paused`       | `ProjectStates.Paused`       |
| `pausing`      | `ProjectStates.Pausing`      |
| `restoring`    | `ProjectStates.Restoring`    |

#### Source Filterable Fields

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

To use these states in your code, import the `SourceStates` enum:

```tsx
import { SourceStates } from 'unbody/admin'
```

These are the possible states a source can be in, along with their corresponding TypeScript enumeration values:

| State          | TypeScript Enum             |
| -------------- | --------------------------- |
| `initializing` | `SourceStates.Initializing` |
| `updating`     | `SourceStates.Updating`     |
| `deleting`     | `SourceStates.Deleting`     |
| `paused`       | `SourceStates.Paused`       |
| `idle`         | `SourceStates.Idle`         |

#### Source Type Possible Values

To use these types in your code, import the `SourceTypes` enum:

```tsx
import { SourceTypes } from 'unbody/admin'
```

These are the possible source types, along with their corresponding TypeScript enumeration values:

| Type              | TypeScript Enum              |
| ----------------- | ---------------------------- |
| `discord`         | `SourceTypes.Discord`        |
| `github_branch`   | `SourceTypes.GithubBranch`   |
| `github_issues`   | `SourceTypes.GithubIssues`   |
| `google_calendar` | `SourceTypes.GoogleCalendar` |
| `google_drive`    | `SourceTypes.GoogleDrive`    |
| `push_api`        | `SourceTypes.PushApi`        |

#### Webhook Filterable Fields

| Field       | Type | Filter Operators                                |
| ----------- | ---- | ----------------------------------------------- |
| `createdAt` | Date | [Date Filter Operators](#date-filter-operators) |

### Filter Operators

#### String and Enum Filter Operators

- `$eq`, `$ne`, `$in`, `$nin`, `$null`, `$like`

#### Number Filter Operators

- `$eq`, `$ne`, `$gt`, `$lt`, `$gte`, `$lte`, `$null`

#### Boolean Filter Operators

- `$eq`, `$ne`, `$null`

#### Date Filter Operators

- `$gt`, `$gte`, `$lt`, `$lte`, `$null`

## Project Settings Guide

The `ProjectSettings` class serves as a factory for creating and managing project settings. It provides methods to define and retrieve specific settings, which can then be used to configure a project's behavior.

### Using `.set` Method

Use the `.set` method to define a project setting. For example:

```tsx
import { ProjectSettings, TextVectorizer } from 'unbody/admin'

const settings = new ProjectSettings()

settings.set(new TextVectorizer(TextVectorizer.Transformers.Default))
```

### Using `.get` Method

Use the `.get` method to retrieve a specific setting. For example:

```tsx
const textVectorizer = settings.get(TextVectorizer) // returns an instance of TextVectorizer
```

### `TextVectorizer` Configuration

The `TextVectorizer` defines the text vectorization model used for representing text as vectors, which is essential for search operations.

**Usage Example**

To configure a project with the default `TextVectorizer`:

```tsx
import { TextVectorizer } from 'unbody/admin'

const textVectorizer = new TextVectorizer(TextVectorizer.Transformers.Default)
console.log(textVectorizer.name) // "text2vec-transformers"
```

**Available Models**

The table below lists the available text vectorization models, their providers, and the corresponding details:

| TypeScript Type                             | Name                                      | Provider | Model                         |
| ------------------------------------------- | ----------------------------------------- | -------- | ----------------------------- |
| `TextVectorizer.OpenAI.Ada002`              | `text2vec-openai-ada-002`                 | OpenAI   | OpenAI Ada 002                |
| `TextVectorizer.OpenAI.TextEmbedding3Large` | `text2vec-openai-text-embedding-3-large`  | OpenAI   | OpenAI Text Embedding 3 Large |
| `TextVectorizer.OpenAI.TextEmbedding3Small` | `text2vec-openai-text-embedding-3-small`  | OpenAI   | OpenAI Text Embedding 3 Small |
| `TextVectorizer.Cohere.MultilingualV3`      | `text2vec-cohere-multilingual-v3.0`       | Cohere   | Cohere Multilingual V3        |
| `TextVectorizer.Cohere.MultilingualLightV3` | `text2vec-cohere-multilingual-light-v3.0` | Cohere   | Cohere Multilingual Light V3  |
| `TextVectorizer.Cohere.EnglishV3`           | `text2vec-cohere-english-v3.0`            | Cohere   | Cohere English V3             |
| `TextVectorizer.Cohere.EnglishLightV3`      | `text2vec-cohere-english-light-v3.0`      | Cohere   | Cohere English Light V3       |
| `TextVectorizer.Cohere.EnglishV2`           | `text2vec-cohere-english-v2.0`            | Cohere   | Cohere English V2             |
| `TextVectorizer.Cohere.EnglishLightV2`      | `text2vec-cohere-english-light-v2.0`      | Cohere   | Cohere English Light V2       |
| `TextVectorizer.Contextionary.Default`      | `text2vec-contextionary`                  | Unbody   | Contextionary                 |
| `TextVectorizer.Transformers.Default`       | `text2vec-transformers`                   | Unbody   | Transformers Default          |

### `ImageVectorizer` Configuration

The `ImageVectorizer` sets the model used for representing images as vectors.

**Usage Example**

To configure a project with the `ImageVectorizer`:

```tsx
import { ImageVectorizer } from 'unbody/admin'

const imageVectorizer = new ImageVectorizer(
  ImageVectorizer.Img2VecNeural.Default,
)
console.log(imageVectorizer.name) // "img2vec-neural"
```

**Available Models**

The table below lists the available image vectorization model:

| TypeScript Type                         | Name             | Provider | Model          |
| --------------------------------------- | ---------------- | -------- | -------------- |
| `ImageVectorizer.Img2VecNeural.Default` | `img2vec-neural` | Unbody   | Img2Vec Neural |

### `QnA` Configuration

The `QnA` configuration defines the provider used for Q&A capabilities within the project.

**Usage Example**

To configure a project with the `QnA` provider:

```tsx
import { QnA } from 'unbody/admin'

const qna = new QnA(QnA.Transformers.Default)
console.log(qna.name) // "qna-transformers"
```

**Available Providers**

The table below lists the available QnA providers:

| TypeScript Type                  | Name                                | Provider | Model                         |
| -------------------------------- | ----------------------------------- | -------- | ----------------------------- |
| `QnA.Transformers.Default`       | `qna-transformers`                  | Unbody   | Transformers Default          |
| `QnA.OpenAI.GPT3_5TurboInstruct` | `qna-openai-gpt-3.5-turbo-instruct` | OpenAI   | OpenAI GPT-3.5 Turbo Instruct |

### `Generative` Configuration

The `Generative` configuration enables RAG (Retrieval-Augmented Generation) capabilities within the project.

**Usage Example**

To configure a project with the `Generative` provider:

```tsx
import { Generative } from 'unbody/admin'

const generative = new Generative(Generative.OpenAI.GPT4o)
console.log(generative.options.model) // "gpt-4o"
```

**Available Models**

The table below lists the available models for `Generative` configuration:

| TypeScript Type                      | Name                | Provider | Model             |
| ------------------------------------ | ------------------- | -------- | ----------------- |
| `Generative.OpenAI.GPT3_5Turbo`      | `gpt-3.5-turbo`     | OpenAI   | GPT-3.5 Turbo     |
| `Generative.OpenAI.GPT4`             | `gpt-4`             | OpenAI   | GPT-4             |
| `Generative.OpenAI.GPT4Turbo`        | `gpt-4-turbo`       | OpenAI   | GPT-4 Turbo       |
| `Generative.OpenAI.GPT4o`            | `gpt-4o`            | OpenAI   | GPT-4o            |
| `Generative.OpenAI.GPT4oMini`        | `gpt-4o-mini`       | OpenAI   | GPT-4o Mini       |
| `Generative.Cohere.Command`          | `command`           | Cohere   | Command           |
| `Generative.Cohere.CommandLight`     | `command-light`     | Cohere   | Command Light     |
| `Generative.Cohere.CommandR`         | `command-r`         | Cohere   | Command R         |
| `Generative.Cohere.CommandRPlus`     | `command-r-plus`    | Cohere   | Command R Plus    |
| `Generative.Mistral.OpenMistral7b`   | `open-mistral-7b`   | Mistral  | Open Mistral 7b   |
| `Generative.Mistral.OpenMixtral8x7b` | `open-mixtral-8x7b` | Mistral  | Open Mixtral 8x7b |

### `Reranker` Configuration

The `Reranker` specifies the reranking model used to prioritize search results, ensuring that the most relevant results appear at the top.

**Usage Example**

To configure a reranker for a project:

```tsx
import { Reranker } from 'unbody/admin'

const reranker = new Reranker(Reranker.Transformers.Default)
console.log(reranker.name) // "reranker-transformers"
```

**Available Models**

The table below lists the available reranking models:

| TypeScript Type                  | Name                                | Provider | Model                |
| -------------------------------- | ----------------------------------- | -------- | -------------------- |
| `Reranker.Cohere.MultilingualV3` | `reranker-cohere-multilingual-v3.0` | Cohere   | Multilingual V3      |
| `Reranker.Cohere.MultilingualV2` | `reranker-cohere-multilingual-v2.0` | Cohere   | Multilingual V2      |
| `Reranker.Cohere.EnglishV3`      | `reranker-cohere-english-v3.0`      | Cohere   | English V3           |
| `Reranker.Cohere.EnglishV2`      | `reranker-cohere-english-v2.0`      | Cohere   | English V2           |
| `Reranker.Transformers.Default`  | `reranker-transformers`             | Unbody   | Transformers Default |

### `Spellcheck` Configuration

The `Spellcheck` configuration specifies the model used for text spellchecking within the project.

**Usage Example**

To configure spellchecking for a project:

```tsx
import { Spellcheck } from 'unbody/admin'

const spellcheck = new Spellcheck(Spellcheck.TextSpellcheck.Default)
console.log(spellcheck.name) // "text-spellcheck"
```

**Available Models**

The table below lists the available spellchecking models:

| TypeScript Type                     | Name              | Provider | Model                   |
| ----------------------------------- | ----------------- | -------- | ----------------------- |
| `Spellcheck.TextSpellcheck.Default` | `text-spellcheck` | Unbody   | Text Spellcheck Default |

### `AutoSummary` Configuration

Automatically generates summaries for text content.

**Usage Example**

```tsx
import { AutoSummary } from 'unbody/admin'

const autoSummary = new AutoSummary(AutoSummary.OpenAI.GPT4o)
console.log(autoSummary.name) // "autosum-openai-gpt-4o"
```

**Available Models**

| TypeScript Type                  | Name                           | Model Provider | Model         |
| -------------------------------- | ------------------------------ | -------------- | ------------- |
| `AutoSummary.OpenAI.GPT3_5Turbo` | `autosum-openai-gpt-3.5-turbo` | OpenAI         | GPT-3.5 Turbo |
| `AutoSummary.OpenAI.GPT4o`       | `autosum-openai-gpt-4o`        | OpenAI         | GPT-4o        |
| `AutoSummary.OpenAI.GPT4oMini`   | `autosum-openai-gpt-4o-mini`   | OpenAI         | GPT-4o Mini   |
| `AutoSummary.Cohere.CommandR`    | `autosum-cohere-command-r`     | Cohere         | Command R     |

### `AutoKeywords` Configuration

Generates keywords automatically from text content to enhance search and categorization.

**Usage Example**

```tsx
import { AutoKeywords } from 'unbody/admin'

const autoKeywords = new AutoKeywords(AutoKeywords.OpenAI.GPT4o)
console.log(autoKeywords.name) // "autokeywords-openai-gpt-4o"
```

**Available Models**

| TypeScript Type                   | Name                                | Model Provider | Model         |
| --------------------------------- | ----------------------------------- | -------------- | ------------- |
| `AutoKeywords.OpenAI.GPT3_5Turbo` | `autokeywords-openai-gpt-3.5-turbo` | OpenAI         | GPT-3.5 Turbo |
| `AutoKeywords.OpenAI.GPT4o`       | `autokeywords-openai-gpt-4o`        | OpenAI         | GPT-4o        |
| `AutoKeywords.OpenAI.GPT4oMini`   | `autokeywords-openai-gpt-4o-mini`   | OpenAI         | GPT-4o Mini   |

### `AutoEntities` Configuration

Automatically identifies and extracts named entities from text.

**Usage Example**

```tsx
import { AutoEntities } from 'unbody/admin'

const autoEntities = new AutoEntities(AutoEntities.OpenAI.GPT4o)
console.log(autoEntities.name) // "autoentities-openai-gpt-4o"
```

**Available Models**

| TypeScript Type                   | Name                                | Model Provider | Model         |
| --------------------------------- | ----------------------------------- | -------------- | ------------- |
| `AutoEntities.OpenAI.GPT3_5Turbo` | `autoentities-openai-gpt-3.5-turbo` | OpenAI         | GPT-3.5 Turbo |
| `AutoEntities.OpenAI.GPT4o`       | `autoentities-openai-gpt-4o`        | OpenAI         | GPT-4o        |
| `AutoEntities.OpenAI.GPT4oMini`   | `autoentities-openai-gpt-4o-mini`   | OpenAI         | GPT-4o Mini   |

### `AutoTopics` Configuration

Automatically generates topics from the content.

**Usage Example**

```tsx
import { AutoTopics } from 'unbody/admin'

const autoTopics = new AutoTopics(AutoTopics.OpenAI.GPT4o)
console.log(autoTopics.name) // "autotopics-openai-gpt-4o"
```

**Available Models**

| TypeScript Type                 | Name                              | Model Provider | Model         |
| ------------------------------- | --------------------------------- | -------------- | ------------- |
| `AutoTopics.OpenAI.GPT3_5Turbo` | `autotopics-openai-gpt-3.5-turbo` | OpenAI         | GPT-3.5 Turbo |
| `AutoTopics.OpenAI.GPT4o`       | `autotopics-openai-gpt-4o`        | OpenAI         | GPT-4o        |
| `AutoTopics.OpenAI.GPT4oMini`   | `autotopics-openai-gpt-4o-mini`   | OpenAI         | GPT-4o Mini   |

### `AutoVision` Configuration

Generates captions, labels, and extracts texts from image files.

**Usage Example**

```tsx
import { AutoVision } from 'unbody/admin'

const autoVision = new AutoVision(AutoVision.OpenAI.GPT4o)
console.log(autoVision.name) // "autovision-openai-gpt-4o"
```

**Available Models**

| TypeScript Type               | Name                            | Model Provider | Model       |
| ----------------------------- | ------------------------------- | -------------- | ----------- |
| `AutoVision.OpenAI.GPT4o`     | `autovision-openai-gpt-4o`      | OpenAI         | GPT-4o      |
| `AutoVision.OpenAI.GPT4oMini` | `autovision-openai-gpt-4o-mini` | OpenAI         | GPT-4o Mini |
| `AutoVision.OpenAI.GPT4Turbo` | `autovision-openai-gpt-4-turbo` | OpenAI         | GPT-4 Turbo |

### `PdfParser` Configuration

The `PdfParser` configuration enables parsing and extracting content from PDF files.

**Usage Example**

```typescript
import { PdfParser } from 'unbody/admin'

settings.set(new PdfParser(PdfParser.NlmSherpa.Default))

console.log(settings.get(PdfParser).name) // "pdfparser-nlmsherpa"
```

**Available Parsers**

| TypeScript Type               | Name                  | Description                               |
| ----------------------------- | --------------------- | ----------------------------------------- |
| `PdfParser.NlmSherpa.Default` | `pdfparser-nlmsherpa` | NLM Sherpa; extracts text from PDF files. |
| `PdfParser.Pdf2Image.Default` | `pdfparser-pdf2image` | pdf2image; converts PDF files to images.  |

### `CustomSchema` Configuration

The `CustomSchema` configuration allows defining custom data schemas for projects. It enables the creation of custom collections and fields, which can be used to store, organize, and extend data structures within a project. This section provides an updated guide with clear examples and detailed explanations.

#### Usage Example

Below is a comprehensive example that demonstrates how to define a `CustomSchema`, add collections and fields, and extend built-in schemas:

```tsx
import { CustomSchema, ProjectSettings } from 'unbody/admin'

// Create a new custom schema
const customSchema = new CustomSchema()

// Define a custom collection with a text field
const customCollection = new CustomSchema.Collection('CustomCollection')
customCollection.add(new CustomSchema.Field.Text('name', 'Name'))

// Extend a built-in schema (e.g., VideoFile) with an additional field
const videoFileCollection = new CustomSchema.Collection('VideoFile').add(
  new CustomSchema.Field.Text(
    'xChapters', // Field name
    'Extracted Chapters', // Field description
    true, // Indicates the field is an array
    'word', // Tokenization strategy
  ),
)

// Add the custom collection and set the schema
customSchema.add(customCollection).extend(videoFileCollection)

// Apply the schema to project settings
const settings = new ProjectSettings()
settings.set(customSchema)
```

---

#### Field Definition

When defining fields, the following arguments are used:

- **`name: string`** – Field name in camelCase format.
- **`description: string`** – Description of the field.
- **`array?: boolean`** – Indicates whether the field is an array. Defaults to `false`.
- **`tokenization?: "field" | "word" | "lowercase" | "whitespace"`** – Tokenization strategy for text fields.
- **`skipVectorization?: boolean`** – If `true`, skips vectorization for the field.

#### Supported Field Types

The following field types are available for use:

| Field Type             | Description                                                            |
| ---------------------- | ---------------------------------------------------------------------- |
| `Field.Int`            | Represents an integer field.                                           |
| `Field.Number`         | Represents a numerical field.                                          |
| `Field.Text`           | Represents a text field, with optional tokenization and vectorization. |
| `Field.UUID`           | Represents a universally unique identifier field.                      |
| `Field.Date`           | Represents a date field.                                               |
| `Field.Boolean`        | Represents a boolean field.                                            |
| `Field.Object`         | Represents a nested object field.                                      |
| `Field.PhoneNumber`    | Represents a phone number field with advanced formatting.              |
| `Field.GeoCoordinates` | Represents a geographical coordinates field (latitude and longitude).  |
| `Field.Cref`           | Represents a cross-reference field pointing to another collection.     |

---

#### Examples of Advanced Field Definitions

##### `Cref` Field Example

```tsx
// Define a cref field referencing the VideoFile collection's document field
const crefField = new CustomSchema.Field.Cref(
  'videos',
  'References Video Files',
)
crefField.add('VideoFile', 'document')
```

##### `Object` Field Example

```tsx
// Define a complex object field for an address
const objectField = new CustomSchema.Field.Object('address', 'Address')
objectField
  .add(new CustomSchema.Field.Text('street', 'Street'))
  .add(new CustomSchema.Field.Text('city', 'City'))
  .add(new CustomSchema.Field.Text('state', 'State'))
  .add(new CustomSchema.Field.Text('zip', 'Zip'))
```

#### Notes and Important Details

1.  **Naming Conventions**:
    - Custom collection names must follow PascalCase and end with `Collection` (e.g., `CustomCollection`).
    - Field names must be in camelCase format.
2.  **Built-in Collections**:
    - You can extend the following built-in collections with custom fields:
      - `ImageBlock`
      - `AudioFile`
      - `VideoFile`
      - `TextDocument`
      - `SpreadsheetDocument`
      - `SubtitleFile`
3.  **Extension Rules**:
    - Extended field names must start with `x` and use camelCase format (e.g., `xCustomField`).
4.  **Field Specific Notes**:

    - **`Text` Field**:
      - Supports tokenization strategies: `word`, `field`, `lowercase`, `whitespace`.
      - Can skip vectorization using the `skipVectorization` flag.
    - **`PhoneNumber` Field**:
      - **Input/Output Schema**:
        ```json
        {
          "input": "020 1234567", // Required. Raw input in string format
          "defaultCountry": "nl", // Required if only a national number is provided, ISO 3166-1 alpha-2 country code. Only set if explicitly set by the user.
          "internationalFormatted": "+31 20 1234567", // Read-only string
          "countryCode": 31, // Read-only unsigned integer, numerical country code
          "national": 201234567, // Read-only unsigned integer, numerical representation of the national number
          "nationalFormatted": "020 1234567", // Read-only string
          "valid": true // Read-only boolean. Whether the parser recognized the phone number as valid
        }
        ```
    - **`GeoCoordinates` Field**:
      - Stores `latitude` and `longitude` as numbers.
      - Input/Output Schema:
      ```json
      {
        "latitude": 52.366667,
        "longitude": 4.9
      }
      ```
    - **`Object` Field**:
      - Can contain nested fields of types `int`, `number`, `text`, `date`, `boolean`, or `uuid`.
      - Objects are not vectorized, and filter operators are unsupported.
    - **`Cref` Field**
      The `Cref` field enables creating cross-references between collections. It is crucial to understand the rules and requirements for using cross-references effectively: 1. **Built-in Collections**:
      You can reference only the following built-in collections, and exclusively their `document` field:

              - `ImageBlock` → `document`
              - `AudioFile` → `document`
              - `VideoFile` → `document`
              - `TextDocument` → `document`

              These are the only built-in collections you can reference, and the `document` field is the only field available for cross-referencing in these collections.

          2. **Custom Cross-References**:

              When referencing custom collections, it is mandatory to define the cross-reference relationship in both collections. This means:

              - If `CollectionA` has a `Cref` field pointing to `CollectionB`, then `CollectionB` must also have a `Cref` field explicitly defined to reference `CollectionA`.

              Built-in collections are an exception to this rule—they do not require you to define reciprocal references when referencing their `document` field.

### `Enhancement` Configuration

The `Enhancement` configuration allows you to define custom pipelines to enrich your data with generated or transformed data. While Unbody provides built-in automatic enhancement pipelines, such as `AutoSummary`, `AutoVision`, `AutoKeywords`, and more, you can create custom pipelines tailored to your needs. These custom pipelines enable tasks like extracting or generating data using LLMs, crawling websites (coming soon), and customizing chunking strategies with different approaches.

Custom pipelines are defined to process records in specific collections and can include conditional logic, reusable variables, and multiple steps for complex workflows.

---

#### Defining a Custom Enhancement Pipeline

Here’s how you can define a custom pipeline:

```tsx
import { Enhancement } from 'unbody/admin'

const enrichVideoPipeline = new Enhancement.Pipeline(
  'enrich_video', // Unique pipeline name
  'VideoFile', // Target collection
)
```

This example defines a custom enhancement pipeline that will be run for records in the `VideoFile` collection.

#### Optional Parameters for a Pipeline

- **`if`**: A condition that determines whether the pipeline should run for a given record. It should return `true` or `false`. If `false`, the pipeline will not execute for that record.
  **Example**:

  ```tsx
  if: (ctx) => ctx.source.type === 'google_drive'

  ```

- **`vars`**: A reusable map of variables that can be accessed in the pipeline’s steps. These variables are helpful for injecting dynamic instructions or configurations into the pipeline.
  **Example**:

  ```tsx
  vars: {
    transcription: (ctx) =>
      JSON.stringify(ctx.record.subtitles[0].entries),
  }

  ```

---

#### Pipeline Context (`ctx`)

The `ctx` object provides essential information about the current pipeline execution. Below is the structure of the context:

```tsx
export type EnhancementContext = {
  source: {
    id: string
    type: string
    name: string
    createdAt: Date
    updatedAt: Date
  }

  project: {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    settings: Record<string, any>
  }

  vars: Record<string, any>

  record: Record<string, any> // The record being enhanced
  steps: Record<
    string,
    {
      output: Record<string, any> // Output of the step
      result: Record<string, any> // Result of the step
      skipped?: boolean
      failedAt?: Date
      startedAt?: Date
      finishedAt?: Date
    }
  >
  result: Record<string, any> // Current step's result after execution
}
```

#### Key Context Components

- **`record`**: The record being enhanced. Includes all GraphQL record properties.
- **`steps`**: A map of step names to their `output`, `result`, and execution details (e.g., start and finish times).
- **`result`**: The result of the current step after it has been executed.
- **`vars`**: Custom variables defined in the pipeline.
- **`source`** and **`project`**: Metadata about the source and project associated with the pipeline.

---

#### Steps in a Pipeline

Each pipeline must include at least one step. A step is defined by:

- A **unique name** within the pipeline.
- An **action** specifying the operation to perform.
- An **`output`** map that defines how the results will be stored.
- Optional parameters such as `if` and `onFailure` for advanced control.

##### Optional Parameters for a Step

- **`if`**: A condition that determines whether the step should run for a given record. It should return `true` or `false`. If `false`, the step will not execute. Example: `if: (ctx) => ctx.vars.transcription.length > 0`
- **`onFailure`**: Specifies the behavior when the step fails. Possible values:
  - `"continue"`: Ignore errors and proceed to the next step.
  - `"stop"`: Stop the pipeline execution on failure.

#### Step Example

```tsx
const action = new Enhancement.Action.StructuredGenerator({
  model: 'openai-gpt-4o', // Action model
  prompt: (ctx) =>
    `Extract chapters from the video's transcription:\\n ${ctx.vars.transcription}`,
  schema: (ctx, { z }) =>
    z
      .object({
        chapters: z.array(
          z.object({
            start: z.string().describe('Start time of the chapter'),
            end: z.string().describe('End time of the chapter'),
            title: z.string().describe('Title of the chapter'),
          }),
        ),
      })
      .describe('Extracted info'),
})

const extractChapters = new Enhancement.Step('extract_chapters', action, {
  output: {
    xChapters: (ctx) => ctx.result.json.chapters || [],
  },
  if: (ctx) => ctx.vars.transcription.length > 0,
  onFailure: 'continue',
})

enrichVideoPipeline.add(extractChapters)
```

**Explanation of the Example**

1. **Action**: Specifies the operation to perform using a model (e.g., `openai-gpt-4o`) and includes parameters like a `prompt` and a `schema`.
2. **Step**: Ties the action to the pipeline and specifies how the action’s result (`ctx.result`) is stored in the `output`.

---

#### Setting the Enhancement in Project Settings

Once the pipeline is defined, it can be added to the enhancement configuration and applied to the project settings:

```tsx
const enhancement = new Enhancement()

enhancement.add(enrichVideoPipeline)

settings.set(enhancement)
```

#### Available Actions

The `Enhancement` configuration supports various built-in actions. Each action performs specific operations based on the inputs provided and generates a result. This section details the `TextGenerator` action, its input parameters, and its result structure.

---

##### `TextGenerator`

The `TextGenerator` action uses a language model to generate text based on the provided prompt. It accepts the following input parameters:

| Parameter          | Type                 | Required | Description |
| ------------------ | -------------------- | -------- | ----------- |
| `model`            | `string \| Function` | Yes      |             |
| `prompt`           | `string \| Function` | Yes      |             |
| `temperature`      | `number \| Function` | No       |             |
| `maxTokens`        | `number \| Function` | No       |             |
| `topP`             | `number \| Function` | No       |             |
| `frequencyPenalty` | `number \| Function` | No       |             |
| `presencePenalty`  | `number \| Function` | No       |             |

For all parameters, you can provide a literal value (e.g., `'openai-gpt-4'`) or a function that dynamically determines the value based on the pipeline context (`ctx`).

---

**Result Structure**

The result object generated by the `TextGenerator` action contains the following property:

| Property  | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| `content` | `string` | The text generated by the language model. |

---

**Example: Summarizing Video Transcriptions**

Below is an example of using the `TextGenerator` action to summarize video transcriptions:

```tsx
const summarizeVideo = new Enhancement.Step(
  'summarize_video',
  new Enhancement.Action.TextGenerator({
    model: (ctx) => ctx.vars.preferredModel || 'openai-gpt-4', // Dynamically choosing the model
    prompt: (ctx) =>
      `Summarize the video transcription:\\n${JSON.stringify(
        ctx.record.subtitles?.[0]?.entries || [],
      )}`,
    temperature: 0.7,
  }),
  {
    output: {
      autoSummary: (ctx) => ctx.result.content, // Storing the generated summary
    },
  },
)
```

##### `StructuredGenerator`

The `StructuredGenerator` action generates structured JSON data based on a prompt and schema.

---

**Input Parameters**

| Parameter          | Type                            | Required | Description |
| ------------------ | ------------------------------- | -------- | ----------- |
| `model`            | `string \| Function`            | Yes      |             |
| `prompt`           | `string \| Function`            | Yes      |             |
| `schema`           | `T      \| Function`            | Yes      |             |
| `temperature`      | `number \| Function`            | No       |             |
| `maxTokens`        | `number \| Function`            | No       |             |
| `topP`             | `number \| Function`            | No       |             |
| `frequencyPenalty` | `number \| Function`            | No       |             |
| `presencePenalty`  | `number \| Function`            | No       |             |
| `images`           | `{ url: string }[] \| Function` | No       |             |

For all parameters, you can provide a literal value (e.g., `'openai-gpt-4o'`) or a function that dynamically determines the value based on the pipeline context (`ctx`) or helpers.

---

**Result Structure**

The result object generated by the `StructuredGenerator` action contains the following property:

| Property | Type                  | Description                                      |
| -------- | --------------------- | ------------------------------------------------ |
| `json`   | `Record<string, any>` | The structured JSON data produced by the action. |

---

**Helpers**

The `z` (Zod) helper library is included to define and validate the schema for the output. Zod is a validation library that ensures the generated JSON matches the expected structure.

---

**Example: Extracting Chapters from a Video Transcription**

```tsx
const extractChapters = new Enhancement.Step(
  'extract_chapters',
  new Enhancement.Action.StructuredGenerator({
    model: 'openai-gpt-4o', // Language model
    prompt: (ctx) =>
      `Extract chapters from the video's transcription:\\n ${JSON.stringify(
        ctx.record.subtitles,
      )}`,
    schema: (ctx, { z }) =>
      z
        .object({
          chapters: z.array(
            z.object({
              start: z.string().describe('Start time of the chapter'),
              end: z.string().describe('End time of the chapter'),
              title: z.string().describe('Title of the chapter'),
            }),
          ),
        })
        .describe('Extracted chapter information'),
    temperature: 0.7,
  }),
  {
    output: {
      xChapters: (ctx) => ctx.result.json.chapters || [],
    },
  },
)
```

##### `Summarizer`

The `Summarizer` action is designed to summarize long texts using AI models. It employs a map-reduce method to efficiently handle large content by breaking it into smaller chunks and generating a cohesive summary.

---

**Input Parameters**

| Parameter  | Type                 | Required | Description |
| ---------- | -------------------- | -------- | ----------- |
| `model`    | `string \| Function` | Yes      |             |
| `text`     | `string \| Function` | Yes      |             |
| `metadata` | `string \| Function` | No       |             |
| `prompt`   | `string \| Function` | No       |             |

---

**Prompt Guidelines**

When providing a custom prompt, ensure it includes the `{text}` and `{metadata}` placeholders, which will be dynamically replaced during execution:

- **`{text}`**: Represents the actual long content to be summarized.
- **`{metadata}`**: Includes metadata for additional context. If not provided, this placeholder will be omitted.

**Example Prompt**:

```
Summarize the following text based on the provided metadata:\\n
Text: {text}\\n
Metadata: {metadata}

```

---

**Output Structure**

The result object generated by the `Summarizer` action contains the following property:

| Property  | Type     | Description                                 |
| --------- | -------- | ------------------------------------------- |
| `summary` | `string` | The summarized text produced by the action. |

---

**Example: Summarizing a Long Text**

```tsx
const summarizeText = new Enhancement.Step(
  'summarize_text',
  new Enhancement.Action.Summarizer({
    model: 'openai-gpt-4o', // Language model
    text: (ctx) => ctx.record.content, // Long text content
    metadata: '- title: document title...', // Metadata for context
    prompt: `Summarize the following content:\\nText: {text}\\nMetadata: {metadata}`, // Custom prompt
  }),
  {
    output: {
      autoSummary: (ctx) => ctx.result.summary, // Storing the summary
    },
  },
)
```
