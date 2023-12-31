import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useState} from "react";
interface Props{
    description: string
    handleCallback: (value: number) => void
}
export default function AgeSelect({description, handleCallback}: Props) {
    const [age, setAge] = useState(18);

    const handleChange = (event: SelectChangeEvent) => {
        const newValue: number = Number(event.target.value);
        setAge(newValue)
        handleCallback(newValue)
    };

    const ages: number[] = [];
    for (let i = 18; i <= 60; i++) {
        ages.push(i);
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{description}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age as unknown as string}
                label={description}
                onChange={handleChange}
            >
                {
                    ages.map((age) => (
                        <MenuItem key={age} value={age}>{age}</MenuItem>
                    ))
                }

            </Select>
        </FormControl>
    );

}