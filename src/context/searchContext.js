import React, { useState, createContext, useContext } from "react"

// const searchString = {
//   searchString: "",
// }

const SearchContext = createContext({
  searchString: '',
  setSearchString: () => {},
})

const SearchProvider = ({ children }) => {
  const [searchString, setSearchString] = useState('')

  return <SearchContext.Provider value={{ searchString, setSearchString }}>
    {children}
  </SearchContext.Provider>
}

const useSearchContext = () => useContext(SearchContext)

export { SearchProvider, useSearchContext }