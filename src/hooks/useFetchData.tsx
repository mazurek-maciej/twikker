import { useEffect, useState } from 'react';
import { State, StatusOfApiCall } from '../models';

export function useFetchData(asyncFunc: () => Promise<State>) {
  const [status, setStatus] = useState<StatusOfApiCall>(StatusOfApiCall.IDLE);
  const [state, setState] = useState<State>({
    data: undefined,
    error: undefined,
  });

  const fetchData = async () => {
    setStatus(StatusOfApiCall.FETCHING);

    const data = await asyncFunc();

    if (data.data) {
      setStatus(StatusOfApiCall.SUCCESS);
      setState(data);
    } else {
      setStatus(StatusOfApiCall.FAILURE);
      setState(data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { status, state };
}
