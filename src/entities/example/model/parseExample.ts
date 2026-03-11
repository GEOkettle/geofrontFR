import {
  exampleListSchema,
  exampleSchema
  
} from '#/entities/example/schemas/exampleSchema'
import type {ExampleEntity} from '#/entities/example/schemas/exampleSchema';

export function parseExample(input: unknown): ExampleEntity {
  return exampleSchema.parse(input)
}

export function parseExampleList(input: unknown): ExampleEntity[] {
  return exampleListSchema.parse(input)
}
