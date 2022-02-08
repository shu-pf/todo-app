const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

// Jestに渡されるカスタム設定を追加する
const customJestConfig = {
  // 各テストが実行される前に、さらに設定オプションを追加する
  // setupFilesAfterEnv:['<rootDir>/jest.setup.js'] となります。
  // TypeScriptでbaseUrlがルートディレクトリに設定されている場合は、エイリアスを動作させるために以下が必要です。
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

// createJestConfigがこのようにエクスポートされるのは、next/jestが非同期のNext.jsの設定を確実にロードできるようにするためです。
module.exports = createJestConfig(customJestConfig);
