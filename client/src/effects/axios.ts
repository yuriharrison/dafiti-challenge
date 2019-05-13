import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import axios from 'axios';


export interface IuseAxiosReturnBasic {
  data: any,
  error: any
}
export interface IuseAxiosReturn extends IuseAxiosReturnBasic {
  isRequesting: boolean,
  setSendRequest: Dispatch<SetStateAction<boolean>>
}
export function useAxios(endpoint: string, type: string = "get", postData: any = null): IuseAxiosReturn {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [sendRequest, setSendRequest] = useState(false);

  const request = () => {
    setSendRequest(false);
    setIsRequesting(true);
    let args = [endpoint];

    if (type === 'post') {
      args = [...args, postData]
    }

    // @ts-ignore
    axios[type](...args).then((response: { data: any }) => setData(response.data))
      .catch((error: any) => setError(error))
      .finally(() => setIsRequesting(false));
  }

  useEffect(() => {
    

    if (sendRequest) {
      request();
    }
  }, [sendRequest,]);

  return { data, error, isRequesting, setSendRequest };
}


export interface IuseFetchOnceReturn extends IuseAxiosReturnBasic {
  isLoading: boolean,
}
export type Error = any
export type Data = any
export function useFetchOnce(endpoint: string) {
  const { data, error, isRequesting, setSendRequest } = useAxios(endpoint);
  const isLoading = isRequesting;
  useEffect(() => {
    setSendRequest(true);
  }, []);
  return [data, error, isLoading] as unknown as [Data, Error, boolean];
}

type PostCallback = (data: any) => void;
export interface IusePostReturn extends IuseAxiosReturnBasic {
  isPosting: boolean,
  setPostData: Dispatch<SetStateAction<any>>
  setCallback: Dispatch<SetStateAction<PostCallback>>
  setSendPost: Dispatch<SetStateAction<boolean>>
}
export const usePost = (endpoint: string): IusePostReturn => {
  const [postData, setPostData] = useState();
  const [callback, setCallback] = useState<PostCallback>();
  const { data, error, isRequesting, setSendRequest } = useAxios(endpoint, "post", postData);
  callback && callback(data)
  const [isPosting, setSendPost] = [isRequesting, setSendRequest];
  return {
    data, error, isPosting, setPostData, setCallback, setSendPost
  } as unknown as IusePostReturn
}
