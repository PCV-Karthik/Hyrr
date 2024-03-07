import React from "react";

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  console.log(posts);
  return (
    <ul className="list-group mb-4">
      {posts.map((post) => (
        <li key={post.id} className="list-group-item m-2">
          <div className="border border-gray-300 rounded-lg p-5 my-4">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
              </div>
              <div className="my-4">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {post.content}
                </p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Posts;
