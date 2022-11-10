import Tweet from "./Tweet.jsx";
import Post from "./Post.jsx";
import React from "react";
import "./style.css";
import Twitter from "../../server/artifacts/contracts/TwitterContract.sol/TwitterContract.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const Tweets = [
  {
    displayName: "Arnav",
    userName: "0x631f5a82c7825f7ee4Ec6175e247c029D0fc3CC5",
    text: "Heloooo",
    timeStamp: "2022-10-04:00:00:00",
  },
];

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const TwitterContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

  const getUpdatedTweets = (allTweets) => {
    let updatedTweets = [];
    for (let i = 0; i < allTweets.length; i++) {
      console.log(allTweets[i].tweetText);
      let tweet = {
        id: allTweets[i].id,
        tweetText: allTweets[i].tweetText,
        username: allTweets[i].username,
      };
      updatedTweets.push(tweet);
    }
    return updatedTweets;
  };

  const getAllTweets = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        let allTweets = await TwitterContract.getAllTweets();
        console.log(allTweets);
        setPosts(getUpdatedTweets(allTweets));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTweets();
  }, []);

  return (
    <div className="Feed-Home">
      <div className="Feed-Container">
        <Tweet />
        {posts.map((post) => (
          <Post key={post.displayName} user={post.userName} text={post.text} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
