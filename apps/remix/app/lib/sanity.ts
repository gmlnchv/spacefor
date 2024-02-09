import { createClient } from '@sanity/client'
import { makeSafeQueryRunner } from 'groqd'

const client = createClient({
  projectId: 'rvviv5g5',
  dataset: 'production',
  apiVersion: '2021-03-25',
  useCdn: true,
})

export const runQuery = makeSafeQueryRunner(
  (query, params: Record<string, unknown> = {}) => client.fetch(query, params),
)
