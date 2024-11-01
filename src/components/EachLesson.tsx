import { Link } from "react-router-dom";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";

interface Props {
  lessonNumber: string;
  onClick: () => void;
}

const LessonButton = ({ lessonNumber = "Lesson 0", onClick }: Props) => {
  return (
    <div className="OuterLessonCover">
      {/* <Image></Image> */}
      <div style={{ font: "30px bold", flexGrow: "1" }}>{lessonNumber}</div>
      <div className="ButtonDiv">
        <button
          className="btn btn-outline-success btn-lg StartButton"
          onClick={onClick}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default LessonButton;
