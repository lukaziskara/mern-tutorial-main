import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
// import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  // const { users } = useSelector((state) => state.users);
  // console.log(users);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };
  console.log(
    goals
      .slice()
      .sort((a, b) =>
        isAscending
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
      )
  );
  const sortedGoals = goals
    .slice()
    .sort((a, b) =>
      isAscending
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (
          <div className="goals">
            <div className="sorting">
              <span>Sort by Date:</span>
              <button className="sort-btn" onClick={toggleSortOrder}>
                {isAscending ? "↥" : "↧"}
              </button>
              <button onClick={() => setIsAscending(null)}>button</button>
            </div>
            {sortedGoals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
