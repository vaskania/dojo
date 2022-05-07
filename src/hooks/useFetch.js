import {useState, useEffect} from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController()

        const fetchData = async () => {
            try {
                const res = await fetch(url, {signal: abortCont.signal})
                if (!res.ok) {
                    throw Error('could not fetch data')
                }
                const data = await res.json()
                setData(data)
                setIsPending(false)
                setError(null)
            } catch (err) {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    setIsPending(false)
                    setError(err.message)
                }
            }
        }
        fetchData()

        return () => abortCont.abort()
    }, [url])

    return {data, isPending, error}
}

export default useFetch