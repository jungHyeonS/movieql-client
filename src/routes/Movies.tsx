import { gql, useApolloClient, useQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

interface Movie {
  id: number
  title: string
  __typename: string
}


interface author {
  fullName:string
}

interface Tweet{
  id: number
  text: string
  __typename: string
  author?: author
}


const ALL_MOVIES = gql`
  query getMovies {
    allMovies{
        title,
        id
    }
    allTweets{
      id
      text
      author {
        fullName
      }
    }
  }
`

const Movies = () => {
  const { data, loading, error} = useQuery(ALL_MOVIES)
  if(loading){
    return <h1>Loading...</h1>
  }

  if(error){
    return <h1>Coud not fetch</h1>
  }

  return (
    <ul>
      <h1>Movies</h1>
      {data.allMovies.map((movie : Movie) => 
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            {movie.title}
          </Link>
          
        </li>  
      )}
      <h1>Tweets</h1>
      {data.allTweets.map((tweet : Tweet) => 
        <li key={tweet.id}>
          {tweet.text}/ by : {tweet.author?.fullName}
        </li>  
      )}
    </ul>
  )
}
export default Movies