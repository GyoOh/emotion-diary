import { useContext, useEffect, useState } from "react";

import MyHeader from './../components/MyHeader'
import MyButton from './../components/MyButton'
import DiaryList from './../components/DiaryList'
import { DiaryStateContext } from "../App";

const Home = () => {

    const diaryList = useContext(DiaryStateContext)

    const [data, setData] = useState([])
    const [curDate, setCurDate] = useState(new Date())
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const headText = `${months[curDate.getMonth()]} ${curDate.getFullYear()}`;


    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0]
        titleElement.innerHTML = `Emotion diary`
    }, [])

    useEffect(() => {
        const firstDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth(),
            1
        ).getTime()

        const lastDay = new Date(
            curDate.getFullYear(),
            curDate.getMonth() + 1,
            0,
            23,
            59,
            59
        ).getTime()

        setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay))
    }, [diaryList, curDate])

    useEffect(() => {
        console.log(data)
    }, [data])
    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate()))
    }
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate()))
    }
    return (
        <div>
            <MyHeader headText={headText}
                leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
                rightChild={<MyButton text={">"} onClick={increaseMonth} />}
            />
            <DiaryList diaryList={data} />
        </div>
    )
}
export default Home;