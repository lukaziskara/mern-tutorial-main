import { useDispatch } from "react-redux";
import { deleteGoal } from "../features/goals/goalSlice";
import { Link } from "react-router-dom";

export default function TheEvent({ value }) {
  console.log(value);

  const dispatch = useDispatch();
  return (
    <section className="content">
      <div className="the-event">
        <div className="title">The Event with ID: {value}</div>
      </div>
    </section>
  );
}
