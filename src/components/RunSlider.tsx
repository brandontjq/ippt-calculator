import {useState} from "react";
import {Slider} from "@mui/material";

interface Props{
    description: string
    handleCallback: (value: number | number[]) => void
}

export default function RunSlider({description, handleCallback}: Props) {
    const [sliderValue, setSliderValue] = useState<number | number[]>(780)

    const handleSliderChange = (event: Event, value: number | number[]) => {
        setSliderValue(value)
        handleCallback(value)
    };

    const getTime = (totalSeconds: number| number[]) => {
        const minutes = Math.floor(totalSeconds as number/ 60);
        const seconds = totalSeconds as number - minutes * 60;
        const secondsConverted = seconds === 0 ? "00" : seconds;
        return minutes + ":" + secondsConverted;
    }

    return <div>
        <Slider
            defaultValue={780}
            min={360}
            max={1200}
            step={10}
            color="success"
            aria-label="Default"
            valueLabelDisplay="auto"
            valueLabelFormat={getTime(sliderValue)}
            onChange={handleSliderChange}
        />
        <p>{description}: {getTime(sliderValue)}</p>
    </div>
}