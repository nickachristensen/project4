import { useState, useEffect } from "react";
import axios from "axios";

import React from "react";

const useBookSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "/posts",
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setBooks((prevBooks) => {
          return [...new Set([...prevBooks, res.data.map((b) => b)])];
        });
        setHasMore(res.data.length > 0);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);
  return { loading, error, books, hasMore };
};

export default useBookSearch;
