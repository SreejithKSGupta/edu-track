// eslint.config.cjs
const angularEslint = require('@angular-eslint/eslint-plugin');
const angularTemplateEslint = require('@angular-eslint/eslint-plugin-template');
const angularTemplateParser = require('@angular-eslint/template-parser');
const js = require('@eslint/js');

module.exports = [
  // Ignore patterns
  { ignores: ['projects/**/*'] },

  // TypeScript files configuration
  {
    files: ['**/*.ts'],
    languageOptions: {
      sourceType: 'module',
      parserOptions: {
        project: ['tsconfig.json']
      }
    },


    plugins: {
      '@angular-eslint': angularEslint,
      '@angular-eslint/template': angularTemplateEslint
    },
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' }
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' }
      ]
    }
  },

  // HTML files configuration
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser
    },
    plugins: {
      '@angular-eslint/template': angularTemplateEslint
    },
    rules: {}
  }
];