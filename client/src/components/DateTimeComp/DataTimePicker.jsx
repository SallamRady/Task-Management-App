import React from 'react';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';

const DataTimePicker = ({ setValue }) => {
    return (
        <DateTimePicker onChange={(newValue) => setValue(newValue)} label="Basic date time picker" />
        // <LocalizationProvider dateAdapter={AdapterDayjs}>
        //     <DateTimePicker onChange={(newValue) => setValue(newValue)} label="Basic date time picker" />
        //     {/* <DemoContainer components={['DateTimePicker']}>
        //         <DateTimePicker onChange={(newValue) => setValue(newValue)} label="Basic date time picker" />
        //     </DemoContainer> */}
        // </LocalizationProvider>
    );
}

export default DataTimePicker;
