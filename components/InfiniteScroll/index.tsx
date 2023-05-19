import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../loading-spinner";
interface InfiniteScrollProps {
  children: (data: any) => JSX.Element;
  query: UseQuery<QueryDefinition<any, any, any, any>>;
  className: string;
  data: any[];
  total: number | undefined;
}

function InfiniteScroll({
  children,
  query,
  className,
  data,
  total,
}: InfiniteScrollProps) {
  const [page, setPage] = useState(1);
  const parentRef = useRef<HTMLDivElement>(null);
  const { isFetching, isLoading } = query(page, {
    skip: !!(total && data.length >= total),
  });
  useEffect(() => {
    const parentElem = parentRef.current;
    const handleScroll = () => {
      if (!parentElem) return;
      if (!total) {
        throw new Error("Total Not Found");
      }
      if (data.length >= total) {
        parentElem.removeEventListener("scroll", handleScroll);
        return;
      }
      const scrollHeight = parentElem.scrollHeight;
      const scrollTop = parentElem.scrollTop;
      const clientHeight = parentElem.clientHeight;
      if (
        scrollTop + clientHeight + 5 >= scrollHeight &&
        !isFetching &&
        !isLoading
      ) {
        setPage(page + 1);
      }
    };
    if (parentElem) {
      parentElem.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (parentElem) parentElem.removeEventListener("scroll", handleScroll);
    };
  }, [page, isFetching, data.length, total, isLoading]);

  return (
    <div ref={parentRef} className={classNames(`${className} flex flex-col`)}>
      <div>{children(data)}</div>
      {isFetching && (
        <div>
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default InfiniteScroll;
