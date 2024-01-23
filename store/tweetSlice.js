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
    },
    addLikeToComment: (state, action) => {
      state.tweets = state.tweets.map(tweet => {
        if(tweet._id === action.payload.tweetId) {
          tweet.comments.forEach(comment => {
            if(comment._id === action.payload.commentId) {
              comment.likes.push(action.payload.email)
            }
          })
        }
        return tweet;
      })
    },
    removeLikeFromComment: (state, action) => {
      state.tweets = state.tweets.map(tweet => {
        if(tweet._id === action.payload.tweetId) {
          tweet.comments.forEach(comment => {
            if(comment._id === action.payload.commentId) {
              comment.likes = comment.likes.filter(email => email !== action.payload.email)
            }
          })
        }
        return tweet;
      })
    },
    deleteComment: (state, action) => {
      state.tweets = state.tweets.map(tweet => {
        if(tweet._id === action.payload.tweetId) {
          tweet.comments = tweet.comments.filter(comment => comment._id !== action.payload.commentId)
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
    console.log(res)
    if (res.data) {
      const allTweetsUpdated = res.data.map(tweet => {
        return {...tweet, image: Object.keys(tweet.image).length === 0 ? {} : tweet.image.data}
      })
      dispatch(tweetActions.allTweetsFromDb(allTweetsUpdated));
    } else {
      console.log("error in fetching tweets")
    }
  };
};
