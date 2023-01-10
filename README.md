# MovieQL-Client
GraphQL Client Study

### 프로젝트 셋업
```
npx creact-react-app movieql-client --template typescript
```

### 패키지 설치
```
npm install @apollo/client graphql react-router-dom
```

### Apollo Provider 생성
GraphQL API 연동을 진행할려면 index.tsx 파일에 Apollo Provider를 생성해주어야합니다
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import client from './client';
import { ApolloProvider } from "@apollo/client"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
```

### useQuery
useQuery 훅을 사용하면 React 에서 GraphQL 데이터를 가져오고 그 결과를 UI에 연결할수있습니다<br/>
useQuery 훅은 Apollo 애플리케이션에서 쿼리를 실행하기 위한 기본 API입니다
```
const ALL_MOVIES = gql`
  query getMovies {
    allMovies{
        title,
        id
        medium_cover_image
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
  ...
}
```

### Local Only Fiedls
Apollo 클라이언트 쿼리에는 GraphQL 서버의 정의되어있지 않은 로컬 전용 필드가 포함될수있습니다<br/>
@client 지시문을 사용하여 해당 필드가 로컬 전용 필드임을 명시할수있습니다
```
const GET_MOVIE = gql`
  query getMovie($movieId:String!){
    movie(id:$movieId){
      id
      title
      medium_cover_image
      rating
      isLiked @client
    }
  }
`
```

### writeFragment
writeFragment를 사용하면 캐시에 데이터를 쓸수있습니다<br/>
캐시된 데이터에 대한 변경사항은 서버에 푸시되지 않으며, 새로고침시 변경사항이 사라집니다
```
const {data,loading, client: {cache}} = useQuery<GetMovieProps>(GET_MOVIE,{
  variables:{
    movieId:id
  }
})
const onClick = () => {
  cache.writeFragment({
    id:`Movie:${id}`,
    fragment: gql`
      fragment MovieFragment on Movie {
        isLiked
      }
    `,
    data:{
      isLiked:!data?.movie.isLiked
    }
  })
}
```
