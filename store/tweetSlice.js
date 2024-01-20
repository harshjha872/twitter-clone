import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const tweetSlice = createSlice({
  name: "tweets",
  initialState: {
    tweets: [],
  },
  reducers: {
    addTweets: (state, action) => {
      state.tweets = [...state.tweets, action.payload];
    },
    allTweetsFromDb: (state, action) => {
      state.tweets = [...action.payload]
    },
    addLike: (state, action) => {
      state.tweets = state.tweets.map(tweet => {
        if(tweet._id === action.payload.tweetId) {
          tweet.likes.push(action.payload.email)
        }
        return tweet;
      })
    },
    removeLike: (state, action) => {
      state.tweets = state.tweets.map(tweet => {
        if(tweet._id === action.payload.tweetId) {
          tweet.likes = tweet.likes.filter(email => email !== action.payload.email)
        }
        return tweet;
      })
    },
    addComment: (state, action) => {
      state.tweets = state.tweets.map(tweet => {
        if(tweet._id === action.payload.tweetId) {
          tweet.comments.push(action.payload.comment)
        }
        return tweet;
      })
    }
  },
});

export const tweetActions = tweetSlice.actions;

export default tweetSlice;

export const getAllTweets = () => {
  return async (dispatch) => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/feed`);

    if (res.status === 200 && res.statusText === "OK") {
      console.log('tweets', res.data)
      const allTweetsUpdated = res.data.map(tweet => {
        return {...tweet, image: Object.keys(tweet.image).length === 0 ? {} : tweet.image.data}
      })
      dispatch(tweetActions.allTweetsFromDb(allTweetsUpdated));
    } else {
      console.log("error in fetching tweets")
    }
  };
};
