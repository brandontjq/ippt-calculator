import {Slider} from "@mui/material";
import {useState} from "react";

interface Props{
    description: string
    handleCallback: (value: number | number[]) => void
}
export default function StaticStationSlider({description, handleCallback}: Props) {

    const [sliderValue, setSliderValue] = useState<number | number[]>(30)

    const handleSliderChange = (event: Event, value: number | number[]) => {
        setSliderValue(value);
        handleCallback(value)
    };

    return <div>
        <Slider
            defaultValue={30}
            max={60}
            color="success"
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={handleSliderChange}
        />
        <p>{description}: {sliderValue}</p>
    </div>
}