import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import { getStringDate } from "../utill/date";
import { emotionList } from "../utill/emotion";



const Diary = () => {
    const { id } = useParams()
    const diaryList = useContext(DiaryStateContext)
    const navigate = useNavigate()
    const [data, setData] = useState()

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0]
        titleElement.innerHTML = `Emotion Diary - ${id}th diary`
    }, [])
    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find((it) => parseInt(it.id) === parseInt(id))

            if (targetDiary) {
                setData(targetDiary)
            } else {
                alert("No diary.")
                navigate('', { replace: true })
            }
        }
    }, [id, diaryList]);

    if (!data) {
        return <div className="DiaryPage">Loading...</div>
    } else {

        const curEmotionData = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion))
        console.log(curEmotionData)
        return (
            <div className="DiaryPage">
                <MyHeader headText={`${getStringDate(new Date(data.date))} Record`}
                    leftChild={
                        <MyButton text={"Back"} onClick={() => navigate(-1)} />
                    }
                    rightChild={
                        <MyButton text={"Edit"} onClick={() => navigate(`/edit/${data.id}`)}
                        />
                    }
                />
                <article>
                    <section>
                        <h4>Today's feeling</h4>
                        <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                            <img src={curEmotionData.emotion_img} />
                            <div className="emotion_descript">
                                {curEmotionData.emotion_descript}
                            </div>
                        </div>

                    </section>
                    <section>
                        <h4>Today's Feeling</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        )
    }
}

export default Diary;
