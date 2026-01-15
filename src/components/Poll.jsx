// src/components/Poll.jsx
import React, { useEffect, useState } from "react";
import { ref, onValue, runTransaction } from "firebase/database";
import { db } from "../firebase";

const Poll = ({ pollId }) => {
    const [poll, setPoll] = useState(null);
    const [userVote, setUserVote] = useState(null);

    useEffect(() => {
        const voted = JSON.parse(localStorage.getItem("votedPolls") || "{}");
        setUserVote(voted[pollId]);

        const pollRef = ref(db, `polls/${pollId}`);
        const unsubscribe = onValue(pollRef, (snap) => {
            if (snap.exists()) setPoll(snap.val());
        });

        return () => unsubscribe();
    }, [pollId]);

    const vote = (optionKey) => {
        const voted = JSON.parse(localStorage.getItem("votedPolls") || "{}");
        const previousVote = voted[pollId];

        if (previousVote === optionKey) return; // no aumenta votos extra

        // Restar voto anterior si existía
        if (previousVote) {
            const oldVoteRef = ref(db, `polls/${pollId}/options/${previousVote}/votes`);
            runTransaction(oldVoteRef, (v) => (v || 1) - 1).catch(console.error);
        }

        // Sumar nuevo voto
        const newVoteRef = ref(db, `polls/${pollId}/options/${optionKey}/votes`);
        runTransaction(newVoteRef, (v) => (v || 0) + 1)
            .then(() => {
                voted[pollId] = optionKey;
                localStorage.setItem("votedPolls", JSON.stringify(voted));
                setUserVote(optionKey);
            })
            .catch(console.error);
    };

    if (!poll) return null;

    const totalVotes = Object.values(poll.options).reduce((sum, o) => sum + o.votes, 0) || 1;

    return (
        <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">{poll.question}</h2>
            <div className="space-y-3">
                {Object.entries(poll.options).map(([key, opt]) => {
                    const percent = Math.round((opt.votes / totalVotes) * 100);
                    const isUserChoice = userVote === key;

                    return (
                        <div key={key} className="mb-3">
                            <button
                                className={`w-full text-left p-2 rounded-md font-medium transition-colors ${isUserChoice ? "bg-green-500 text-white" : "bg-blue-100 hover:bg-blue-200"
                                    }`}
                                onClick={() => vote(key)}
                            >
                                {opt.text} ({opt.votes})
                            </button>
                            <div className="w-full bg-gray-200 rounded h-4 mt-1">
                                <div
                                    className={`h-4 rounded transition-all ${isUserChoice ? "bg-green-500" : "bg-blue-500"
                                        }`}
                                    style={{ width: `${percent}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Poll;
