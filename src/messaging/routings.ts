import configuration from '@app/config/configuration';

const _SUB_ROUTING_KEYS = {
  MS_CATS: {
    CREATED: 'ms_cats.created',
    UPDATED: 'ms_cats.updated',
  },
} as const;

type RoutingKeysDefinition = {
  [key: string]: {
    [key: string]: string;
  };
};

/**
 * Prepend a queue name to an object with routing keys for easier customization.
 * @param queue
 * @param input
 * @returns
 */
function buildRoutingKeys<T>(queue: string, input: RoutingKeysDefinition) {
  const output = {};

  for (const entityKey of Object.keys(input)) {
    output[entityKey] = {};
    const entity = input[entityKey];

    for (const action of Object.keys(entity)) {
      output[entityKey][action] = `${queue}.${input[entityKey][action]}`;
    }
  }
  return output as T;
}

/**
 * All routing keys that the microservice will subscribe to.
 * @example `crm_example.ms_cats.created`
 */
export const SUB_ROUTING_KEYS = buildRoutingKeys<typeof _SUB_ROUTING_KEYS>(
  configuration.rabbitmq.queue,
  _SUB_ROUTING_KEYS,
);
