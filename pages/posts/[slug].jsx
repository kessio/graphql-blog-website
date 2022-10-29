import { GraphQLClient, gql } from 'graphql-request'

const graphCms =  new GraphQLClient('https://api-eu-west-2.hygraph.com/v2/cl9rwb3av1ago01t8gpo0cuir/master');

const QUERY = gql`
   query Post($slug: String!){
    post(where:{slug: $slug}){
      title
    datePublished
    slug
    content {
      text
    }
    author {
      name
      avatar {
        url
      }
    }
    coverphoto {
      url
    }
    excerpt

    }
   }
`

const SLUGLIST = gql`
{
  posts {
    slug

  }
}
`

export async function getStaticPaths () {
  const {posts} = await graphCms.request(SLUGLIST)

  return {
    paths: posts.map((post) => ({params: {slug: post.slug}})),
    fallback: false,
  }
}

export async function getStaticProps ({params}) {
  const slug = params.slug
  const data = await graphCms.request(QUERY, {slug})
  const post = data.post;

  return {
    props: {
      post

    },
    revalidate: 10
  }
}


export default function blogPost({post}) {

  return (
    <div className="flex flex-col justify-center items-center gap-5 md:mx-20 py-10">
      <div className="text-gray-700 md:text-4xl font-extrabold">
        {post.title}
      </div>
        <img src={post.coverphoto.url} className="w-3/5" />
   
      <div className="col w-3/4 text-justify font-sans text-gray-600 text-1xl">
        <p>{post.content.text}</p>
      </div>
    </div>
  )

}