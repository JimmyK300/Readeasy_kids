import "../App.css";

interface Props {
  lessonNumber: string;
  onClick: () => void;
}

const LessonButton = ({ lessonNumber = "Lesson 0", onClick }: Props) => {
  return (
    <div className="OuterLessonCover">
      <div style={{ fontSize: "30px", fontWeight: "bold", flexGrow: "1" }}>
        {lessonNumber}
      </div>
      {/* <Image></Image> */}
      <div className="ButtonDiv">
        <button className="StartButton" onClick={onClick}>
          Start
        </button>
      </div>
    </div>
  );
};

export default LessonButton;
