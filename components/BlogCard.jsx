import Link from 'next/link'

const BlogCard = ({title, slug, author, coverphoto, excert}) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white">
      <Link href={'/posts/'+ slug}>
      <img className="w-full" src={coverphoto.url} alt="Mountain" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base pb-5">
          {excert}
        </p>
        <div className=" flex gap-3">
          <img src={author.avatar.url} width={28} height={20} alt="author-avatar" /> 
          <p className="font-semibold text-gray-700 text-base">{author.name}</p>
        </div>
      </div>
      </Link>
    </div>
    
  )
}

export default BlogCard