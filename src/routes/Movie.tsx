import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query getMovie($movieId:String!){
    movie(id:$movieId){
      id
      title
    }
  }
`

interface Movie{
  id:number,
  title:string
}

interface GetMovieProps{
  movie : Movie
}




const Movie = () => {
  const {id} = useParams();
  const {data,loading} = useQuery<GetMovieProps>(GET_MOVIE,{
    variables:{
      movieId:id
    }
  })

  

  if(loading){
    return <h1>Fetching Movie...</h1>
  }
  return <h1>{data?.movie.title}</h1>
}
export default Movie;