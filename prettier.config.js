//  @ts-check

/** @type {import('prettier').Config} */
const config = {
  semi: false, // Do not print semicolons at statement ends.
  singleQuote: true, // Prefer single quotes for JavaScript and TypeScript strings.
  trailingComma: 'all', // Keep trailing commas where valid to reduce diff noise.
  tabWidth: 2, // Indent nested code blocks by 2 spaces.
  useTabs: false, // Use spaces instead of tab characters for indentation.
  printWidth: 80, // Wrap long lines when they grow beyond 80 characters.
  bracketSpacing: true, // Print spaces inside object literal braces.
  arrowParens: 'always', // Always include parentheses around arrow function params.
  endOfLine: 'lf', // Normalize line endings to LF across environments.
}

export default config
