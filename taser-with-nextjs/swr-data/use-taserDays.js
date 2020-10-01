import useSWR from 'swr'
import fetcher from './fetcher'
import {url} from '../lib/env'

const useTaserDays = (id, init) => {

    const { data, error, mutate } = useSWR(`${url}/api/tasers/${id}/days`, fetcher, { initialData: init })

    return {
        dataDays:data,
        isLoadingDays: !error && !data,
        isErrorDays: error,
        mutateDays: mutate
    }
}

export default useTaserDays