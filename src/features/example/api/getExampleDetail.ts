import { apiClient, axiosInstance } from '#/shared/api'
import { parseExample } from '#/entities/example/model/parseExample'
import type { Example } from '#/entities/example/types/example'
import { exampleMockResponse } from '#/features/example/api/exampleMocks'

export async function getExampleDetail(exampleId: string): Promise<Example> {
  if (!axiosInstance.defaults.baseURL) {
    const example = exampleMockResponse.find((item) => item.id === exampleId)

    if (!example) {
      throw new Error(`Example "${exampleId}" was not found.`)
    }

    return parseExample(example)
  }

  const response = await apiClient.get<unknown>(`/examples/${exampleId}`)
  return parseExample(response)
}
