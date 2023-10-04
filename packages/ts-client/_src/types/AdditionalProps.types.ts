interface AdditionalAnswer {
  endPosition: number
  hasAnswer: boolean
  property: string
  result: string
  startPosition: number
}

interface AdditionalnumbererpretationSource {
  concept: string
  occurrence: number
  weight: number
}

interface Additionalnumbererpretation {
  source: [AdditionalnumbererpretationSource]
}

interface AdditionalFeatureProjection {
  vector: number[]
}

interface AdditionalNearestNeighborsNeighbor {
  concept: string
  distance: number
}

interface AdditionalNearestNeighbors {
  neighbors: [AdditionalNearestNeighborsNeighbor]
}

interface AdditionalSemanticPath {
  concept: string
  distanceToNext: number
  distanceToPrevious: number
  distanceToQuery: number
  distanceToResult: number
}

interface AdditionalClassification {
  basedOn: string[]
  classifiedFields: string[]
  completed: string
  id: string
  scope: string[]
}

export interface AdditionalProps {
  certainty: number
  creationTimeUnix: string
  distance: number
  explainScore: string
  id: string
  lastUpdateTimeUnix: string
  score: string
  vector: number[]

  interpretation: Additionalnumbererpretation
  nearestNeighbors: AdditionalNearestNeighbors
  semanticPath: AdditionalSemanticPath
  answer: AdditionalAnswer
  classification: AdditionalClassification
  featureProjection: AdditionalFeatureProjection
}
