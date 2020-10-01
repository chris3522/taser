import useSWR from 'swr'
import fetcher from './fetcher'
import {url} from '../lib/env'

const useTaserVacations = (id, init) => {

    const { data, error, mutate } = useSWR(`${url}/api/tasers/${id}/vacations`, fetcher, { initialData: init })

    return {
        dataVacations:data,
        isLoadingVacations: !error && !data,
        isErrorVacations: error,
        mutateVacations: mutate
    }
}

export default useTaserVacations