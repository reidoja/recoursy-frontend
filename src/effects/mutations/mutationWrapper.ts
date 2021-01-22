import { MutationConfig, MutationFunction, useMutation } from 'react-query';

function makeCombinedCallback(defaultConfig: any, config: any, attr: string) {
  return (...data: any[]) => {
    defaultConfig && defaultConfig[attr] && defaultConfig[attr](...data);
    config && config[attr] && config[attr](...data);
  };
}

export default function mutationWrapper<V, T>(
  func: MutationFunction<V, T>,
  defaultConfig?: MutationConfig<V, unknown, T, unknown>
) {
  return function (config?: MutationConfig<V, unknown, T, unknown>) {
    return useMutation(func, {
      ...(defaultConfig || {}),
      ...config,
      onSuccess: makeCombinedCallback(defaultConfig, config, 'onSuccess'),
      onError: makeCombinedCallback(defaultConfig, config, 'onError'),
    });
  };
}
