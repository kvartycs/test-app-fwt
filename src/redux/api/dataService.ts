import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IImage {
  authorId: number;
  created: string;
  id: number;
  imageUrl: string;
  locationId: number;
  name: string;
}
interface IImagesProps {
  choosenAuthor: string;
  choosenLocation: string;
  rangeFrom: string;
  rangeTo: string;
  searchValue: string;
  currentPage: number;
}
export interface IAuthor {
  id: number;
  name: string;
}
export interface ILocation {
  id: number;
  location: string;
}

const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://test-front.framework.team/" }),
  endpoints: (builder) => ({
    getPaintings: builder.query<IImage[], IImagesProps>({
      query: ({
        currentPage,
        searchValue,
        choosenAuthor,
        choosenLocation,
        rangeFrom,
        rangeTo,
      }) =>
        `paintings?_page=${currentPage}&_limit=12&q=${searchValue}${
          choosenAuthor !== "" ? `&authorId=${choosenAuthor}` : ""
        }${choosenLocation !== "" ? `&locationId=${choosenLocation}` : ""}${
          rangeFrom !== "" ? `&created_gte=${rangeFrom}` : ""
        }${rangeTo !== "" ? `&created_lte=${rangeTo}` : ""}`,
    }),
    getAuthors: builder.query<IAuthor[], string>({
      query: () => `authors`,
    }),
    getLocations: builder.query<ILocation[], string>({
      query: () => `locations`,
    }),
  }),
});

export default dataApi;
