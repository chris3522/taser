import useSWR from 'swr'
import fetcher from './fetcher'
import {url} from '../lib/env'

export default function useTaserInfo(id, init) {
    const { data, error, mutate } = useSWR(`${url}/api/tasers/${id}/info`, fetcher, { initialData: init })

    return {
        dataInfo:data,
        isLoadingInfo: !error && !data,
        isErrorInfo: error,
        mutateInfo: mutate
    }
}