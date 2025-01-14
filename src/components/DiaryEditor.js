import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { DiaryDispatchContext } from "../App";
import EmotionItem from "./EmotionItem";
import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import { getStringDate } from "../utill/date";
import { emotionList } from "../utill/emotion";



const DiaryEditor = ({ isEdit, originData }) => {
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()))

    const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext)
    const navigate = useNavigate()
    const handClickEmote = useCallback((emotion) => {
        setEmotion(emotion)
    }, [])
    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current.focus();
            return;
        }
        if (window.confirm(isEdit ? "Do you want to edit diary?" : "Do you want to write new diary?")) {
            if (!isEdit) {
                onCreate(date, content, emotion)
            } else {
                onEdit(originData.id, date, content, emotion)
            }
        }

        navigate('/', { replace: true })
    };
    const handleRemove = () => {
        if (window.confirm("Are you sure to delete?")) {
            onRemove(originData.id)
            navigate('/', { replace: true })
        }
    }
    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(parseInt(originData.date))))
            setEmotion(originData.emotion)
            setContent(originData.content)
        }
    }, [isEdit, originData])

    return (
        <div className="DiaryEditor">
            <MyHeader headText={isEdit ? "Edit diary" : "Write new diary"}
                leftChild={
                    <MyButton text={"< Back"} onClick={() => navigate(-1)} />}
                rightChild={isEdit && <MyButton text={"Delete"} type={"negative"} onClick={handleRemove} />}

            />
            <div>
                <section>
                    <h4>What's the date?</h4>
                    <div className="input_box">
                        <input
                            className="input_date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            type="date" />
                    </div>

                </section>
                <section>
                    <h4>Today's feel</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem key={it.emotion_id}{...it}
                                onClick={handClickEmote}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>Today's diary</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                            placeholder="How do you feel today?"
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={"Cancel"} onClick={() => navigate(-1)} />
                        <MyButton
                            text={"Done"}
                            type={"positive"}
                            onClick={handleSubmit}
                        />
                    </div>
                </section>
            </div>
        </div>
    )
}
export default DiaryEditor;