import React, { useCallback, useContext, useRef, useState } from "react";
import useFetchPosts from "../hooks/useFetchPosts";
import CircularLoading from "../components/CircularLoading";
import { appContext } from "../context/AppContext";

const Home = () => {
  const ctx = useContext(appContext);

  const [page, setPage] = useState(1);
  const { posts, error, hasMore, loading } = useFetchPosts(page, 4);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          console.log("fetching more...");
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div>
      <nav className="p-3 flex gap-3 w-full justify-between items-center fixed bg-white top-0 shadow-sm z-50">
        <h1 className="text-2xl">Feed</h1>

        <p className="ml-auto font-medium">
          {" "}
          <span className="hidden md:inline">welcome,</span>{" "}
          {ctx?.user.username}
        </p>
        <button
          type="button"
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600
        to-blue-700 hover:bg-gradient-to-br active:brightness-75 font-medium rounded-lg py-2 px-4 text-center"
          onClick={ctx?.logout}
        >
          Logout
        </button>
      </nav>

      <div className="gap-5 flex flex-col items-center mt-24">
        {posts.map((post, i) => {
          if (posts.length == i + 1)
            return (
              <div
                ref={lastElementRef}
                key={i}
                className="w-[90%] md:w-[30rem]"
              >
                <Card post={post} />
              </div>
            );
          return (
            <div key={i} className="md:w-[30rem] w-[90%]">
              <Card post={post} />{" "}
            </div>
          );
        })}
        {loading && (
          <div className="mb-3">
            <CircularLoading />
          </div>
        )}
      </div>
    </div>
  );
};

const Card = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const likes = post?.likes;

  return (
    <div className="relative min-h-[200px] w-full flex flex-col shadow-md p-4 rounded-md bg-slate-100">
      <img
        className="h-[300px] w-full object-cover rounded-t-md"
        src={post?.image}
        alt=""
      />

      <div className="py-2 flex gap-4 items-center">
        <div
          onClick={() => setLiked((l) => !l)}
          className="cursor-pointer flex items-center gap-2"
        >
          {liked ? (
            <i className="fa-solid fa-heart text-[1.5rem] text-red-600"></i>
          ) : (
            <i className="fa-regular fa-heart text-[1.5rem]"></i>
          )}
          <p className="text-sm">
            {liked && (
              <>
                <span className="font-semibold">You</span> and
              </>
            )}{" "}
            {likes} {liked ? "others" : "people"} liked this
          </p>
        </div>
        <i className="fa-regular text-[1.4rem]  fa-message ml-auto"></i>
        <i className="fa-sharp fa-regular fa-paper-plane text-[1.3rem]"></i>
      </div>

      <div className=" flex gap-3 items-center ">
        <img
          src={post?.owner.picture}
          className="h-11 rounded-full aspect-square"
          alt=""
        />
        <div className="min-h-12 flex flex-col justify-between">
          <p className="text-sm">
            <span className="font-semibold">
              {post?.owner.firstName} {post?.owner.lastName}
            </span>{" "}
            {post?.text}
          </p>
          <div className="flex gap-2 mt-1">
            {post?.tags.map((t, i) => (
              <div
                key={i}
                className="text-xs p-2 py-1 bg-slate-300 font-medium rounded-md"
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
