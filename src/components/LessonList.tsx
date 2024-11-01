import LessonButton from "./EachLesson";
import "../App.css";
import { replace, useNavigate } from "react-router-dom";

function LessonList() {
  const navigate = useNavigate();

  return (
    <ul className="LessonList">
      <li>
        <LessonButton
          lessonNumber="Lesson 1"
          onClick={() => navigate("/quiz")}
        />
        <LessonButton
          lessonNumber="Lesson 2"
          onClick={() => console.log("Clicked")}
        />
        <LessonButton
          lessonNumber="Lesson 3"
          onClick={() => console.log("Clicked")}
        />
        <LessonButton
          lessonNumber="Lesson 4"
          onClick={() => console.log("Clicked")}
        />
        <LessonButton
          lessonNumber="Lesson 5"
          onClick={() => console.log("Clicked")}
        />
        <LessonButton
          lessonNumber="Lesson 6"
          onClick={() => console.log("Clicked")}
        />
      </li>
    </ul>
  );
}

export default LessonList;
