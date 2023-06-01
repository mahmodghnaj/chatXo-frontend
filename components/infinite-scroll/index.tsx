import { defaultPagination } from "@/lib/data";
import classNames from "classnames";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import LoadingSpinner from "../loading-spinner";
import { InfiniteScrollType, InfiniteScrollProps } from "./type";

const InfiniteScroll = forwardRef<InfiniteScrollType, InfiniteScrollProps>(
  (
    {
      fetch,
      children,
      query,
      className,
      queryParams,
      data,
      total,
      focusLastItem,
      scrollBack,
      NoDataComponent,
    },
    ref
  ) => {
    const [page, setPage] = useState(defaultPagination.page);
    const parentRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);
    const { isFetching, isLoading } = fetch(
      {
        id: queryParams,
        params: { ...defaultPagination, page: page, ...query },
      },
      {
        skip: !!(total && data.length >= total),
      }
    );

    useImperativeHandle(
      ref,
      () => {
        return {
          backToBottom() {
            if (listRef.current) {
              listRef.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
              });
            }
          },
        };
      },
      []
    );

    useEffect(() => {
      const parentElem = parentRef.current;
      const handleScroll = () => {
        if (!parentElem) return;
        if (!total) return;
        if (data.length >= total) {
          parentElem.removeEventListener("scroll", handleScroll);
          return;
        }
        const scrollHeight = parentElem.scrollHeight;
        const scrollTop = parentElem.scrollTop;
        const clientHeight = parentElem.clientHeight;

        if (
          (scrollBack && scrollTop <= 300 && !isFetching && !isLoading) ||
          (!scrollBack &&
            scrollTop + clientHeight + 5 >= scrollHeight &&
            !isFetching &&
            !isLoading)
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
    }, [page, isFetching, data.length, total, isLoading, scrollBack]);

    useEffect(() => {
      if (
        !isFetching &&
        page === 1 &&
        listRef.current &&
        focusLastItem &&
        !isLoading
      ) {
        listRef.current.scrollIntoView({
          behavior: "auto",
          block: "end",
        });
      }
    }, [isFetching, page, focusLastItem, isLoading]);

    return (
      <div ref={parentRef} className={classNames(`${className} flex flex-col`)}>
        {isFetching && scrollBack && (
          <div>
            <LoadingSpinner />
          </div>
        )}
        {data?.length ? (
          <div ref={listRef}>{children(data)}</div>
        ) : (
          <>{NoDataComponent! && !isFetching && NoDataComponent}</>
        )}
        {isFetching && !scrollBack && (
          <div>
            <LoadingSpinner />
          </div>
        )}
      </div>
    );
  }
);

InfiniteScroll.displayName = "Infinite Scroll";
export default InfiniteScroll;
