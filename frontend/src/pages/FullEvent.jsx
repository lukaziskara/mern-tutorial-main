import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import TheEvent from "../components/TheEvent";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";
// import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  const [data, setData] = useState();
  // const [isLoading, setLoading] = React.useState(true);

  const [isAscending, setIsAscending] = useState(true);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGoals(id));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  console.log(
    goals,
    goals
      .slice()
      .sort((a, b) =>
        isAscending
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
      )
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   axios
  //     .get(`/posts/${id}`)
  //     .then((res) => {
  //       setData(res.data);
  //       console.log(res.data);
  //       // setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.warn(err);
  //       alert("Ошибка при получении статьи");
  //     });
  // }, []);

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />
      <TheEvent key={id} value={id} />
    </>
  );
}

export default Dashboard;
