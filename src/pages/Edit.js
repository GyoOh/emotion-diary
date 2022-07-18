
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {

    const [originData, setOriginData] = useState();
    const diaryList = useContext(DiaryStateContext)
    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0]
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`
    }, [])
    useEffect(() => {
        if (diaryList.length > 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );

            if (targetDiary) {
                setOriginData(targetDiary)
            } else {
                navigate("/", { replace: true })
            }
        }
    }, [id, diaryList])
    return (
        <div>{originData && <DiaryEditor isEdit={true} originData={originData} />}
            <h2>Edit</h2>
            <p>이곳은 일기 수정페이지 입니다.</p>

        </div>
    )
}

export default Edit;