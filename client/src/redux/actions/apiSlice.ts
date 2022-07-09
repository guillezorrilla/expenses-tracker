import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURI = 'http://localhost:8080'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/api/categories',
      providesTags: ['categories'],
    }),
    getLabels: builder.query({
      query: () => '/api/labels',
      providesTags: ['transactions'],
    }),
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
        url: '/api/transactions',
        method: 'POST',
        body: initialTransaction,
      }),
      invalidatesTags: ['transactions'],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/api/transactions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['transactions'],
    }),
    getTransactions: builder.query({
      query: () => '/api/transactions',
    }),
  }),
})

export default apiSlice
