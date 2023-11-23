export interface AdditionalProps {
  certainty: number
  creationTimeUnix: string
  distance: number
  explainScore: string
  id: string
  lastUpdateTimeUnix: string
  score: string
  vector: number[]
  interpretation: {
    source: [
      {
        concept: string
        occurrence: number
        weight: number
      },
    ]
  }
  nearestNeighbors: {
    neighbors: [
      {
        concept: string
        distance: number
      },
    ]
  }
  semanticPath: {
    concept: string
    distanceToNext: number
    distanceToPrevious: number
    distanceToQuery: number
    distanceToResult: number
  }
  answer: {
    endPosition: number
    hasAnswer: boolean
    property: string
    result: string
    startPosition: number
  }
  generate: {
    error: string
    singleResult: string
    groupedResult: string
  }
  classification: {
    basedOn: string[]
    classifiedFields: string[]
    completed: string
    id: string
    scope: string[]
  }
  featureProjection: { vector: number[] }
}
