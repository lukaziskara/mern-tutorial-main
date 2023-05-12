import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { Link } from "react-router-dom";

function GoalItem({ goal }) {
  const dispatch = useDispatch();
  console.log(goal);

  return (
    <div className="event">
      {/* <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div> */}
      <h2>{goal.date}</h2>
      {/* <h2 className="event-title" onClick={() => console.log("click")}>
        {goal.goal}
      </h2> */}
      <Link className="event-title" to={`/fullevent/${goal._id}`}>
        {goal.goal}
      </Link>
      <p>ზოგადი ინფორმაცია</p>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        X
      </button>
    </div>
  );
}

export default GoalItem;
