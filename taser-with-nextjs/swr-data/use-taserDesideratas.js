import useSWR from 'swr'
import fetcher from './fetcher'
import {url} from '../lib/env'

const useTaserDesideratas = (id, init) => {

    const { data, error, mutate } = useSWR(`${url}/api/tasers/${id}/desideratas`, fetcher, { initialData: init })

    return {
        dataDesideratas:data,
        isLoadingDesideratas: !error && !data,
        isErrorDesideratas: error,
        mutateDesideratas: mutate
    }
}

export default useTaserDesideratas