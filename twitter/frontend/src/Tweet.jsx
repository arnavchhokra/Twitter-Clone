import { useState } from "react";
import { useEffect } from "react";
import { ethers } from "ethers";
import Twitter from "../../server/artifacts/contracts/TwitterContract.sol/TwitterContract.json";

const Tweet = () => {
  const TwitterContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [Tweet, setTweet] = useState("");
  const postTweet = (event) => {
    event.preventDefault();
    addTweet();
    console.log(Tweet);
  };
  const addTweet = async () => {
    let tweet = {
      tweetText: Tweet,
    };

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

        let twitterTx = await TwitterContract.addTweet(tweet.tweetText);
        console.log(twitterTx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("Error submitting new Tweet", error);
    }
  };

  // Similar to componentDidMount and componentDidUpdate:

  return (
    <div className="tweet-home">
      <div className="tweet-container">
        <h3>Home</h3>
        <div className="tweet-upper">
          <img
            src={
              "data:image/jpeg;base64,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"
            }
          />
          <textarea
            value={Tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="What's happening?"
          />
        </div>
        <div className="tweet-bottom">
          <button onClick={(event) => postTweet(event)}>Tweet</button>
        </div>
      </div>
    </div>
  );
};

export default Tweet;