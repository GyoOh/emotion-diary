
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
        titleElement.innerHTML = `Emotion diary - ${id}th diary`
    }, [])
    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) == parseInt(id)
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
            {!originData && <><h2>Edit</h2><p>Here is edit page.</p></>}

        </div>
    )
}

export default Edit;