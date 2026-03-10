import { apiClient, axiosInstance } from '#/shared/api'
import { parseExampleList } from '#/entities/example/model/parseExample'
import type { Example } from '#/entities/example/types/example'
import { exampleMockResponse } from '#/features/example/api/exampleMocks'

export async function getExampleList(): Promise<Example[]> {
  if (!axiosInstance.defaults.baseURL) {
    return parseExampleList(exampleMockResponse)
  }

  const response = await apiClient.get<unknown>('/examples')
  return parseExampleList(response)
}
