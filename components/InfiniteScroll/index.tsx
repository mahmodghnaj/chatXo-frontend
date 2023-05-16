import React, { useEffect, useRef, useState } from "react";

interface InfiniteScrollProps {
  children: (data: any) => JSX.Element;
  query: unknown;
  className: string;
}

function InfiniteScroll({ children, query, className }: InfiniteScrollProps) {
  const [page, setPage] = useState(0);
  const parentRef = useRef(null);
  const { data, isFetching } = query(page);
  const res = data?.data ?? [];
  useEffect(() => {
    function handleScroll() {
      console.log("d");
      const parentElem = parentRef.current;
      const scrollHeight = parentElem.scrollHeight;
      const scrollTop = parentElem.scrollTop;
      const clientHeight = parentElem.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("Fetching more data...");
        setPage(page + 1);
      }
    }
    const parentElem = parentRef.current;
    parentElem.addEventListener("scroll", handleScroll);
    return () => parentElem.removeEventListener("scroll", handleScroll);
  }, [page, isFetching]);

  return (
    <div ref={parentRef} className={`${className}`}>
      {children(res)}
    </div>
  );
}

export default InfiniteScroll;
