import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotificationProvider from "../../services/notificationProvider";
import { userRequests } from "../../services/requestProvider";

import "./Results.css";

export default function Results() {
  const { query } = useParams();
  const nav = useNavigate();

  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    const requestHandler = async () => {
      const resultsResponse = await userRequests.searchUser(query);

      if (resultsResponse.error) {
        NotificationProvider("Error", resultsResponse.err, "danger");
        return nav("/");
      }

      setResults(resultsResponse.data.results);
    };
    requestHandler();
  }, [query, nav]);

  return (
    <div className="container search-results">
      <h1 className="mt-20 mb-20 title">Search Results for: {query}</h1>
      {results.length > 0 ? (
        <div className="user-cards">
          {results.map(
            (result: {
              name: string;
              lastName: string;
              profileImage: string;
              username: string;
              email: string;
            }) => {
              return (
                <div className="user-card">
                  <img
                    className="user-image"
                    src={result.profileImage}
                    alt="User Profile"
                  />
                  <h1 className="username">{result.username}</h1>
                  <p className="user-fullName">
                    {result.name} {result.lastName}
                  </p>
                </div>
              );
            }
          )}
        </div>
      ) : (
        <div className="no-results">
          <h1>No users found</h1>
        </div>
      )}
    </div>
  );
}
