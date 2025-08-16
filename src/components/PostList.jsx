import { useGetPostsQuery } from "@services/rootApi";
import Post from "./Post";
import Loading from "./Loading";
import { useCallback, useEffect, useRef, useState } from "react";

const PostList = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isSuccess, isFetching } = useGetPostsQuery({ offset, limit });

  const previousDataRef = useRef();

  useEffect(() => {
    if (isSuccess && data && previousDataRef.current !== data) {
      if (!data.length) {
        setHasMore(false);
        return;
      }
      previousDataRef.current = data;
      setPosts((prevPosts) => {
        return [...prevPosts, ...data];
      });
    }
  }, [data, isSuccess]);

  const handleScroll = useCallback(() => {
    if (!hasMore) {
      return;
    }
    const scrollTop = document.documentElement.scrollTop; // b
    const scrollHeight = document.documentElement.scrollHeight; // a
    const clientHeight = document.documentElement.clientHeight; // a

    if (clientHeight + scrollTop + 50 >= scrollHeight && !isFetching) {
      console.log("SHOULD TRIGGER API");
      setOffset(offset + limit);
    }
  }, [hasMore, isFetching, offset]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="flex flex-col gap-4">
      {(posts || []).map((post) => (
        <Post
          key={post._id}
          fullName={post.author?.fullName}
          createdAt={post.createdAt}
          content={post.content}
          image={post.image}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
      {isFetching && <Loading />}
    </div>
  );
};
export default PostList;
