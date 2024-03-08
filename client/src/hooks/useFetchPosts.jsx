import React, { useEffect, useState } from "react";
import api from "../utils/api";

const useFetchPosts = (page = 1, limit = 5) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(()=>{
    setPosts([])
  },[])

  useEffect(() => {
    setLoading(true);
    setError(false);
    api
      .get(`/posts/?page=${page}&limit=${limit}`)
      .then((res) => {
        setPosts((prev) => [...prev, ...res.data]);
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  }, [page]);

  return { loading, error, hasMore, posts };
};

export default useFetchPosts;
