export const roots = ['<rootDir>']
export const moduleFileExtensions = ['js', 'ts', 'tsx', 'json']
export const testPathIgnorePatterns = [
  '<rootDir>[/\\\\](node_modules|.next)[/\\\\]'
]
export const transformIgnorePatterns = [
  '[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'
]
export const transform = {
  '^.+\\.(ts|tsx)$': 'babel-jest'
}
export const watchPlugins = [
  'jest-watch-typeahead/filename',
  'jest-watch-typeahead/testname'
]
export const moduleNameMapper = {
  '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js'
}
