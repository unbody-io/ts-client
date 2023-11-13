# Example usage

To get query for debugging purposes:

```typescript
import { Unbody } from './core'

function example() {
  const unbody = new Unbody({
    apiKey: 'xxxx',
    projectId: 'xxxx',
  })

  const query = unbody.get.textBlock
    .where({ path: 'x' })
    .ask('what is bitcoin price?')
    .getGraphQuery()
  console.log(query)
}

example()
```

To execute query and getting result:

```typescript
import { Unbody } from './core'

async function example() {
  const unbody = new Unbody({
    apiKey: 'xxxx',
    projectId: 'xxxx',
  })

  try {
    const response = await unbody.get.googleDoc
      .where({ path: 'x' })
      .ask('what is bitcoin price?')
      .exec()
    console.log(response)
  } catch (e) {
    console.log(e)
  }
}

example()
```
