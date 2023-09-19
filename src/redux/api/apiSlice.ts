import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api/v1' }),
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/books'
        }),
        getSingleBook: builder.query({
            query: (id: string) => `/books/${id}`,
        })
    })
});

export const { useGetBooksQuery, useGetSingleBookQuery } = api;