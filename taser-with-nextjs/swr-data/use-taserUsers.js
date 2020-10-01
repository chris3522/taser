import useSWR from 'swr'
import fetcher from './fetcher'
import {url} from '../lib/env'

const useTaserUsers = (id, init) => {

    const { data, error, mutate } = useSWR(`${url}/api/tasers/${id}/users`, fetcher, { initialData: init })

    return {
        dataUsers:data,
        isLoadingUsers: !error && !data,
        isErrorUsers: error,
        mutateUsers: mutate
    }
}

export default useTaserUsers