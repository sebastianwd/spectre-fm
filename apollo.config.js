module.exports = {
  client: {
    excludes: [
      '**/public/**/*.js',
      '**/node_modules/**/*',
      '**/.next/**/*',
      '**/generated/*',
    ],
    service: {
      name: 'spectre-fm',
      // url: ' http://localhost:4000/___graphql',
      localSchemaFile: './graphql.schema.json',
      // skipSSLValidation: true,
    },
  },
}
