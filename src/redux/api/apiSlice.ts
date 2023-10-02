import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5009' }),
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => '/books'
        }),
        getSingleBook: builder.query({
            query: (id: string) => `/books/${id}`,
            providesTags: ['comments'],
        }),
        postComment: builder.mutation({
            query: ( {id, data} ) => {
                // Log the 'data' to check if it's passed or not
                console.log('Data:', data);

                return {
                    url: `/comment/${id}`,
                    method: "PATCH",
                    body:data
                };
            },
            invalidatesTags: ['comments'],
        }),

        postBook: builder.mutation({
            query: (data) => ({
                url: `/books`,
                method: 'POST',
                body: data
            })
        }),
        editBook: builder.mutation({
            query: ({ id, data }) => ({
                url: `/books/${id}`,
                method: 'POST',
                body: data
            })
        })
    })
});

export const { useGetBooksQuery, useGetSingleBookQuery, usePostBookMutation, useEditBookMutation, usePostCommentMutation } = api;