import LessonButton from "./EachLesson";
import "../App.css";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/dataContext";
import { useContext } from "react";

function LessonList() {
  const navigate = useNavigate();
  const { setUrl, setTitle } = useContext(DataContext) as any;

  return (
    <ul className="LessonList justify-content-center">
      <li>
        <LessonButton
          lessonNumber="Nhiều lựa chọn"
          onClick={() => {
            setUrl("/quiz1.json");
            setTitle("Bài 1");
            navigate("/quiz");
          }}
        />
      </li>
      <li>
        <LessonButton
          lessonNumber="Âm thanh nhiều lựa chọn"
          onClick={() => {
            setUrl("/quiz2.json");
            setTitle("Bài 2");
            navigate("/quiz");
          }}
        />
      </li>
      <li>
        <LessonButton
          lessonNumber="Lesson 3"
          onClick={() => console.log("Clicked")}
        />
      </li>
      <li>
        <LessonButton
          lessonNumber="Lesson 4"
          onClick={() => console.log("Clicked")}
        />
      </li>
      <li>
        <LessonButton
          lessonNumber="Lesson 5"
          onClick={() => console.log("Clicked")}
        />
      </li>
      <li>
        <LessonButton
          lessonNumber="Lesson 6"
          onClick={() => console.log("Clicked")}
        />
      </li>
    </ul>
  );
}

export default LessonList;
