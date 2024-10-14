## Overview

The `@unbody-io/push-api` package provides an easy-to-use interface to manually upload files and push custom JSON data into the Unbody platform.

- **Uploading Files**: Manually upload and manage files like images and videos.
- **Pushing Custom Data**: Push structured JSON data with your own schema.

## Installation

To get started with the Unbody Push API, install the typescript client:

```bash
# using npm
npm install @unbody-io/push-api

# using yarn
yarn add @unbody-io/push-api
```

## Authentication

The Push API requires authentication using a **Project API Key**, which can be generated on the Unbody dashboard under the project settings. Use this API key to authenticate your requests.

```ts
import { UnbodyPushAPI } from '@unbody-io/push-api'

const pushApi = new UnbodyPushAPI({
  projectId: '[project-id]',
  sourceId: '[push-api-source-id]',
  auth: {
    apiKey: 'pk_...', // Your project API key
  },
})
```

## Usage

### Upload Files

You can upload files to your Unbody project using the `.files.upload()` method. The file should have a valid name and extension.

```js
// Uploading a file
const { data } = await pushApi.files.upload({
  id: 'file-uuid', // Unique ID for the file
  file: file, // File object
  payload: {}, // Extra fields for the file (optional)
})

// Example response data
console.log(data.data.collection) // E.g., 'ImageBlock' for image files
console.log(data.data.id) // Unique file ID
console.log(data.data.contentType) // File's content type

// Or, with external URL
const { data } = await pushApi.files.upload({
  id: 'file-uuid',
  filename: 'image.jpg', // required
  url: 'https://example.com/image.jpg',
  payload: {}, // Extra fields for the file (optional)
})
```

Alternatively, you can also upload a file using a `FormData` object:

```ts
const formData = new FormData()

formData.append('id', 'file-unique-id')
formData.append('file', file, 'file-name.ext')
formData.append(
  'payload',
  JSON.stringify({
    xCustomField: 'value',
  }),
)

await pushApi.files.upload({
  form: formData, // FormData object with file and id
})
```

### Delete Files

To delete a file, use the `.files.delete()` method:

```js
await pushApi.files.delete({
  id: 'file-unique-id', // Unique ID for the file
})
```

### List Files

You can list uploaded files with pagination options:

```js
await pushApi.files.list({
  cursor: 'cursor', // Optional
  limit: 10, // Optional
  offset: 0, // Optional
  sort: 'asc', // Optional
})
```

### Create Data Records

To create a custom data record, use the `.records.create()` method. This is useful for pushing structured JSON data to your Unbody project.

```ts
await pushApi.records.create({
  id: 'record-custom-id', // Unique ID for the record
  collection: 'CustomCollection', // Collection name
  payload: {}, // Record payload
})
```

### Get Data Records

To fetch a specific data record by its ID:

```ts
const { data } = await pushApi.records.get({
  id: 'record-unique-id',
})

console.log(data.data.collection) // Record collection name
console.log(data.data.id) // Record ID
console.log(data.data.payload) // Record payload
console.log(data.data.type) // Record type; `file` or `record`
```

### Update Records

The `.records.update()` method allows you to replace the entire payload of a record or file's extra fields:

```js
await pushApi.records.update({
  id: 'record-unique-id',
  collection: 'CustomCollection',
  payload: {}, // New payload, replaces the existing payload
})

await pushApi.records.update({
  id: 'file-unique-id',
  collection: 'TextDocument',
  payload: {
    xCustomField: 'value',
  }, // New payload, replaces the existing payload
})
```

### Patch Records

The `.records.patch()` method lets you partially update the record's payload or file's extra fields:

```js
await pushApi.records.patch({
  id: 'record-unique-id',
  collection: 'CustomCollection',
  payload: {}, // Partial update, merges with the existing payload
})

await pushApi.records.patch({
  id: 'file-unique-id',
  collection: 'TextDocument',
  payload: {
    xCustomField: 'new value',
  }, // Partial update, merges with the existing payload
})
```

### Cross-References

```ts
await pushApi.records.patch({
  id: 'record-unique-id',
  collection: 'CustomCollection',
  payload: {
    profilePhoto: [
      {
        id: 'image-file-id',
        collection: 'ImageBlock',
      },
    ],
  },
})
```

### Delete Data Records

To delete a specific data record:

```js
await pushApi.records.delete({
  id: 'record-unique-id',
  collection: 'CustomCollection',
})
```

**Note**: This method cannot be used to delete files. For deleting files, use `pushApi.files.delete` method instead.

### List Data Records

You can list all records in a specific collection:

```js
await pushApi.records.list({
  collection: 'CustomCollection', // Optional
  cursor: 'cursor', // Optional
  limit: 10, // Optional
  offset: 0, // Optional
})
```

### Notes

- The `id` for both files and records must be unique across the same source. For instance, a file and a record cannot share the same `id`. When processing records through the Push API, the `remoteId` field will contain this `id`.
- Data within a **source** is isolated, meaning **cross-references** cannot be created between records or files that belong to different sources. All operations are limited to the current source.

## Endpoints

The following is a summary of the main endpoints and their corresponding response types:

### Files

- **Upload File**: `.files.upload()`  
  Response: `FileRecordEntity`
- **Delete File**: `.files.delete()`  
  Response: `FileRecordEntity`
- **List Files**: `.files.list()`  
  Response: `{ files: FileRecordEntity[], cursor: string }`

### Data Records

- **Create Record**: `.records.create()`  
  Response: `DataRecordEntity`
- **Get Record**: `.records.get()`  
  Response: `RecordEntity`
- **Update Record**: `.records.update()`  
  Response: `DataRecordEntity`
- **Patch Record**: `.records.patch()`  
  Response: `DataRecordEntity`
- **Delete Record**: `.records.delete()`  
  Response: `DataRecordEntity`
- **List Records**: `.records.list()`  
  Response: `{ records: RecordEntity[], cursor: string }`
