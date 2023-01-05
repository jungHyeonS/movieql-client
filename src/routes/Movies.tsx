import { gql, useApolloClient } from "@apollo/client"
import React, { useEffect, useState } from "react"

interface Movie {
  id: number
  title: string
  __typename: string
}


const Movies = () => {
  const [movies,setMovies] = useState<Movie[]>([]);
  const client = useApolloClient()
  useEffect(()=>{
      client.query({
          query:gql`
              {
                  allMovies{
                      title,
                      id
                  }
              }
          `
      }).then(results => setMovies(results.data.allMovies))
  },[client])
  return (
    <ul>
      {movies.map((movie : Movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  )
}
export default Movies