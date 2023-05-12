import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../features/goals/goalSlice";

function GoalForm() {
  const [text, setText] = useState({
    date: "",
    goal: "",
  });
  // console.log(text);
  const { date, goal } = text;

  const dispatch = useDispatch();
  const onChange = (e) => {
    console.log(e.target.name);
    setText((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
    }));
  };
  // console.log(text);
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(text);
    const goalData = {
      goal,
      date,
    };
    dispatch(createGoal(goalData));
    // setText("");
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="goal"
            id="goal"
            value={goal}
            onChange={onChange}
          />
          <label htmlFor="text">Date</label>
          <input
            type="text"
            name="date"
            id="date"
            value={date}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  );
}

export default GoalForm;
