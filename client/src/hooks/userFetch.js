import { useEffect, useState } from "react"
import axios from "axios"

export const useFetch = (url, options = {}, dependencies = []) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios({
          url,
          ...options
        })

        setData(response.data)
        setError(null)

      } catch (err) {
        setError(err.response?.data || err.message)
      } finally {
        setLoading(false)
      }
    }

    if (url) fetchData()

  }, dependencies)

  return { data, loading, error }
}
