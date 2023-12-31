import StaticStationSlider from "./components/StaticStationSlider";
import {useEffect, useState} from "react";
import AgeSelect from "./components/AgeSelect";
import DataUtil from "./utils/DataUtil";
import {Avatar} from "@mui/material";
import RunSlider from "./components/RunSlider";


export default function App() {
    const [ageValue, setAgeValue] = useState<number>(18)
    const [pushUpValue, setPushUpValue] = useState<number | number[]>(30)
    const [pushUpScore, setPushUpScore] = useState<number | number[]>(16)
    const [sitUpValue, setSitUpValue] = useState<number | number[]>(30)
    const [sitUpScore, setSitUpScore] = useState<number | number[]>(16)
    const [runValue, setRunValue] = useState<number | number[]>(780)
    const [runScore, setRunScore] = useState<number | number[]>(27)
    const [totalValue, setTotalValue] = useState<number | number[]>(150)
    const [totalScore, setTotalScore] = useState<number | number[]>(0)
    const [award, setAward] = useState('Pass')
    const [awardColor, setAwardColor] = useState('black')

    const ageCallback = (age: number) => {
        setAgeValue(age)
    }
    const pushUpCallback = (pushUps: number | number[]) => {
        setPushUpValue(pushUps)
        const getPushUpScore = DataUtil.getScoresByAgeGroup.get(ageGroup)!.get("Static")!.get(pushUps as number)
        setPushUpScore(getPushUpScore!)
    }
    const sitUpCallback = (sitUps: number | number[]) => {
        setSitUpValue(sitUps)
        const getSitUpScore = DataUtil.getScoresByAgeGroup.get(ageGroup)!.get("Static")!.get(sitUps as number)
        setSitUpScore(getSitUpScore!)
    }
    const runCallback = (run: number | number[]) => {
        setRunValue(run)
        const getRunScore = DataUtil.getScoresByAgeGroup.get(ageGroup)!.get("Run")!.get(run as number)
        setRunScore(getRunScore!)
    }

    useEffect(() => {
        const numberPushUp = pushUpValue as number;
        const numberSitUp = sitUpValue as number
        const numberRunValue = runValue as number
        setTotalValue(numberPushUp + numberSitUp + numberRunValue)
        const numberPushUpScore = pushUpScore as number;
        const numberSitUpScore = sitUpScore as number
        const numberRunScore = runScore as number
        setTotalScore(numberPushUpScore + numberSitUpScore + numberRunScore)
    });

    const getAgeGroup = DataUtil.getAgeGroupMap
    const ageGroup: number = getAgeGroup.get(ageValue)!

    useEffect(() => {
        const getAward = (points: number) => {
            if (points >= 90) {
                setAwardColor('gold')
                return "Gold (Commando / Diver / Guards)"
            } else if (points >= 85) {
                setAwardColor('gold')
                return "Gold"
            } else if (points >= 75) {
                setAwardColor('silver')
                return "Silver"
            } else if (points >= 61) {
                setAwardColor('black')
                return "Pass with Incentive (NSmen)"
            } else if (points >= 51) {
                setAwardColor('black')
                return "Pass"
            } else {
                setAwardColor('red')
                return "Fail"
            }
        }
        setAward(getAward(totalScore as number))
    }, [totalScore]);

    return (

        <div style={{
            position: 'absolute', left: '50%', top: '38%',
            transform: 'translate(-50%, -50%)'
        }}>
            <h1>SAF Ippt Calculator</h1>
            <AgeSelect handleCallback={ageCallback} description={"Age"}/>
            <Avatar alt="pushup" src="./src/static/images/pushup.png"/>
            <StaticStationSlider handleCallback={pushUpCallback} description={"Push-Ups"}/>
            <Avatar alt="pushup" src="./src/static/images/situp.png"/>
            <StaticStationSlider handleCallback={sitUpCallback} description={"Sit-Ups"}/>
            <Avatar alt="pushup" src="./src/static/images/run.png"/>
            <RunSlider handleCallback={runCallback} description={"2.4KM Run"}/>

            <p>Your Push-Ups Score : {pushUpScore}</p>
            <p>Your Sit-Ups Score : {sitUpScore}</p>
            <p>Your Run Score : {runScore}</p>
            <p>Your Total Score: {totalScore}</p>
            <p style={{color: awardColor}}>Your Award: {award}</p>
        </div>
    )
}