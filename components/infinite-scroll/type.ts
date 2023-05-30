import { QueryDefinition } from "@reduxjs/toolkit/dist/query";
import { UseQuery } from "@reduxjs/toolkit/dist/query/react/buildHooks";
import { ComponentType, ReactElement, ReactNode } from "react";
import { QueryArgs } from "../../store/types/general";

export interface InfiniteScrollProps {
  children: (data: any) => JSX.Element;
  fetch: UseQuery<QueryDefinition<QueryArgs, any, any, any>>;
  className?: string;
  data: any[];
  total: number | undefined;
  query?: object;
  queryParams?: string;
  focusLastItem?: boolean;
  scrollBack?: boolean;
  NoDataComponent?: JSX.Element;
}

export interface InfiniteScrollType {
  backToBottom: () => void;
}
