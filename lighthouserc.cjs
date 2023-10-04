module.exports = {
  ci: {
    upload: {
      target: 'temporary-public-storage',
    },
    collect: {
      url: ['http://localhost:3000', 'http://localhost:3000/events'],
      startServerCommand: 'bun start',
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'bf-cache': 'off',
        'csp-xss': 'off',
        'image-aspect-ratio': 'off',
        'tap-targets': 'off',
        'heading-order': 'off',
        'uses-responsive-images': 'off',
      },
    },
  },
}
