// .stylelintrc.js or stylelint.config.js
export default {
    extends: [
      'stylelint-config-standard',
      'stylelint-config-standard-scss'
    ],
    plugins: [
      'stylelint-scss'
    ],
    rules: {
      // Allow Tailwind CSS directives
      'at-rule-no-unknown': [
        true,
        {
          ignoreAtRules: [
            'tailwind',
            'apply',
            'variants',
            'responsive',
            'screen',
            'layer'
          ]
        }
      ],
      // Allow @apply rule (not deprecated in Tailwind context)
      'at-rule-no-deprecated': null,
      // SCSS specific rules
      'scss/at-rule-no-unknown': [
        true,
        {
          ignoreAtRules: [
            'tailwind',
            'apply',
            'variants',
            'responsive',
            'screen',
            'layer'
          ]
        }
      ]
    }
  }