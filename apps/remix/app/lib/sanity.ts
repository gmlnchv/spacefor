import { createClient } from '@sanity/client';
import { makeSafeQueryRunner } from 'groqd';

const client = createClient({
  projectId: 'tt57qu4m',
  dataset: 'production',
  apiVersion: '2021-03-25',
  useCdn: true,
  perspective: 'published',
});

export const runQuery = makeSafeQueryRunner(
  (query, params: Record<string, unknown> = {}) => client.fetch(query, params)
);
