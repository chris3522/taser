import useSWR from 'swr'
import fetcher from './fetcher'
import {url} from '../lib/env'

const useSelectedDate = (id,init) => {

    const { data, error, mutate } = useSWR(`${url}/api/tasers/${id}/date`,fetcher, { initialData: init })

    return {
        dataDate:data,
        isLoadingDate: !error && !data,
        isErrorDate: error,
        mutateDate: mutate
    }
}

export default useSelectedDate