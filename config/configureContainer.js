import { createContainer, Lifetime } from 'awilix';

export default function configureContainer() {
  const container = createContainer()

  container.loadModules([
    ['services/*.js', Lifetime.SCOPED],
    ['repositories/*.js', Lifetime.SINGLETON]
  ], {
    formatName: 'camelCase'
  })

  return container
};
