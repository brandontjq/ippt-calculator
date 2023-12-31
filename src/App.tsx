import StaticStationSlider from "./components/StaticStationSlider";
import {useEffect, useState} from "react";
import AgeSelect from "./components/AgeSelect";
import DataUtil from "./utils/DataUtil";
import {Avatar, Grid} from "@mui/material";
import RunSlider from "./components/RunSlider";


export default function App() {
    const [ageValue, setAgeValue] = useState<number>(18)
    const [pushUpValue, setPushUpValue] = useState<number | number[]>(30)
    const [pushUpScore, setPushUpScore] = useState<number | number[]>(16)
    const [sitUpValue, setSitUpValue] = useState<number | number[]>(30)
    const [sitUpScore, setSitUpScore] = useState<number | number[]>(16)
    const [runValue, setRunValue] = useState<number | number[]>(780)
    const [runScore, setRunScore] = useState<number | number[]>(27)
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
        <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
            <Grid item xs={12}>
                <h1>SAF Ippt Calculator</h1>
            </Grid>

            <Grid item xs={12}>
                <AgeSelect handleCallback={ageCallback} description={"Age"}/>
            </Grid>

            <Grid item xs={12} container justifyContent="center" alignItems="center">
                <Grid item xs={3}></Grid>
                <Grid item xs={1} alignItems="right"><Avatar alt="pushup" src="./src/static/images/pushup.png"/></Grid>
                <Grid item xs={4}>
                    <StaticStationSlider handleCallback={pushUpCallback} description={"Push-Ups"}/>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <p>Score : {pushUpScore}</p>
                </Grid>
            </Grid>

            <Grid item xs={12} container justifyContent="center" alignItems="center">
                <Grid item xs={3}></Grid>
                <Grid item xs={1} alignItems="right"><Avatar alt="pushup" src="./src/static/images/situp.png"/></Grid>
                <Grid item xs={4}>
                    <StaticStationSlider handleCallback={sitUpCallback} description={"Sit-Ups"}/>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <p>Score : {sitUpScore}</p>
                </Grid>
            </Grid>

            <Grid item xs={12} container justifyContent="center" alignItems="center">
                <Grid item xs={3}></Grid>
                <Grid item xs={1} alignItems="right"><Avatar alt="pushup" src="./src/static/images/run.png"/></Grid>
                <Grid item xs={4}>
                    <RunSlider handleCallback={runCallback} description={"2.4KM Run"}/>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <p>Score : {runScore}</p>
                </Grid>
            </Grid>

            <Grid item xs={12} container justifyContent="center" alignItems="center">
                <Grid item xs={3}></Grid>
                <Grid item xs={1} alignItems="right"></Grid>
                <Grid item xs={4}>
                    <p style={{color: awardColor}}>Your Award: {award}</p>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>
                    <p>Total Score : {totalScore}</p>
                </Grid>
            </Grid>


        </Grid>
    )
}