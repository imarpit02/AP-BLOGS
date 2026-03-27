import React, { useState, useEffect } from 'react'
import { Input } from './ui/input'
import { useNavigate } from 'react-router-dom'
import { RouteIndex, Routesearch } from '@/helpers/RouteName'
import { Button } from './ui/button'
import { useLocation } from "react-router-dom"

const SearchBox = () => {

  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const getInput = (e) => {
    setQuery(e.target.value)
  }

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    if (
      debouncedQuery.trim().length >= 2 &&
      !location.pathname.includes("search")
    ) {
      navigate(Routesearch(debouncedQuery))
    }
  }, [debouncedQuery])

  useEffect(() => {
    if (!location.pathname.includes("search")) {
      setQuery('')
      setDebouncedQuery('')
    }
  }, [location])

  const clearSearch = () => {
    setQuery('')
    setDebouncedQuery('')
    navigate(RouteIndex)
  }

  return (
    <div className="relative w-full">
      <Input
        name="q"
        value={query}
        onChange={getInput}
        placeholder="Search blogs here by blog title..."
        className="h-9 px-5 pr-10 bg-gray-50"
      />

      {query && (
        <Button
          variant='icon'
          onClick={clearSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          X
        </Button>
      )}
    </div>
  )
}

export default SearchBox