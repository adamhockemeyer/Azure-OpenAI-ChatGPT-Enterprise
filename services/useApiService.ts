import { useCallback } from 'react';

import { useFetch } from '@/hooks/useFetch';

import { useMsal, useAccount } from '@azure/msal-react';
import { msalInstance, loginRequest } from '@/services/authConfigService';

export interface GetModelsRequestProps {
  key: string;
  accessToken?: string;
}

const useApiService =  () => {
  const fetchService = useFetch();

  // const { instance } = useMsal();

  // console.log('instance', instance)
  // console.log('account', instance.getActiveAccount())

  // const tokenResponse = instance.acquireTokenSilent({
  //     ...loginRequest,
  //     account: instance.getActiveAccount() || undefined,
  //   }).then((response) => { 
  //     console.log('tokenResponse', response);
  //   });

    

  // const getModels = useCallback(
  // 	(
  // 		params: GetManagementRoutineInstanceDetailedParams,
  // 		signal?: AbortSignal
  // 	) => {
  // 		return fetchService.get<GetManagementRoutineInstanceDetailed>(
  // 			`/v1/ManagementRoutines/${params.managementRoutineId}/instances/${params.instanceId
  // 			}?sensorGroupIds=${params.sensorGroupId ?? ''}`,
  // 			{
  // 				signal,
  // 			}
  // 		);
  // 	},
  // 	[fetchService]
  // );

  const getModels = useCallback(
    (params: GetModelsRequestProps, signal?: AbortSignal) => {
      return fetchService.post<GetModelsRequestProps>(`/api/models`, {
        body: { key: params.key },
        headers: {
          'Content-Type': 'application/json',
        ...(params.accessToken && {
          Authorization: `${params.accessToken ? params.accessToken : 'NOT_SET'}`
        })
        },
        signal,
      });
    },
    [fetchService],
  );

  return {
    getModels,
  };
};

export default useApiService;
