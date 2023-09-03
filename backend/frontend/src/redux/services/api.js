import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
    reducerPath : 'user-api',
    baseQuery : fetchBaseQuery({
        baseUrl : 'http://127.0.0.1:8000/api/',
    }),
    endpoints : (builder)=>({

        authenticate : builder.mutation({
            query:(data)=>{
                return {
                url : 'token/',
                method : 'POST',
                headers : 
                {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    'email': data.email,
                    'password': data.password,
                }),
            }}
        }),
        
        updateToken : builder.mutation({
            query : (refresh_token)=>{
                return {
                url : 'token/refresh/',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    'refresh' : refresh_token,
                }),
            }}
        }),

        userSignup : builder.mutation({
            query:(data)=>{
                return {
                url : 'signup/',
                method : 'POST',
                headers :
                {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(data),
            }}
        }),

        fetchProfile: builder.query({
            query:(access_token)=>({
                url: 'user/',
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${access_token}`,
                }
            })
        }),

        fetchBooks : builder.query({
            query:()=>({
                url : 'books/',
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                }
            })
        }),

        fetchCartItems : builder.query({
            query:(access_token)=>({
                url:'cartitems/get_cart_items/',
                method : 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${access_token}`,
                  },
            })
        }),

        addCartItems : builder.mutation({
            query : (params)=>{
                return{
                url : 'cartitems/add_to_cart/',
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${params.access_token}`,
                },
                body : JSON.stringify({
                    'book_id' : params.id,
                    'quantity' : params.quantity,
                }),
            }}
        }),

        updateCart : builder.mutation({
            query : (params)=>{
                return {
                    url : 'cartitems/update_cart/',
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${params.access_token}`,
                    },
                    body : JSON.stringify({
                        'book_id' : params.id,
                        'quantity' : params.quantity,
                    }),
                }
            }
        }),


        deleteCartItem: builder.mutation({
            query:(params)=>{
                return {
                url:'cartitems/delete_cart_item/',
                method : 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${params.access_token}`,
                  },
                body : JSON.stringify({'book_id':params.id})
            }
        }
        }),

        
        fetchOrders : builder.query({
            query:(access_token)=>({
                url : 'orderitems/',
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    Authorization: `Bearer ${access_token}`,
                }
            })
        }),

        placeOrders : builder.mutation({
            query : (access_token)=>({
                url : 'orders/',
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`,
                  },
            })
        }),
    })
})

    

export const { 
    useFetchCartItemsQuery, useFetchProfileQuery, useFetchBooksQuery, useFetchOrdersQuery,
    useDeleteCartItemMutation, useAuthenticateMutation, useAddCartItemsMutation,
     useUserSignupMutation, useUpdateTokenMutation, usePlaceOrdersMutation, useUpdateCartMutation } = api
