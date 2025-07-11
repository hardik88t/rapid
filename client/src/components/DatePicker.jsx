import { RxCross2 } from "react-icons/rx";
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';



const DatePicker = ({ blogData, setBlogData, onCancel, onSave, onPublish }) => {
    const formatDateTime = (dateTime) => {
        if (!dateTime) return '';
        const date = new Date(dateTime);
        const formattedDate = date.toISOString(); // Formats date to "YYYY-MM-DDTHH:mm:ss.sssZ"
        return formattedDate;
    };
    useEffect(() => {
        handleDateChange({ target: { value: date } });
        handleTimeChange({ target: { value: time } });
        setDate(date);
        setTime(time);
        const selectedDateTime = new Date(`${date}T${time}`);
        const formattedDateTime = formatDateTime(selectedDateTime);
    }, []);


    const currentDate = new Date().toISOString().split('T')[0];
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const [date, setDate] = useState(blogData.publishDate ? new Date(blogData.publishDate).toISOString().split('T')[0] : currentDate);
    const [time, setTime] = useState(blogData.publishDate ? new Date(blogData.publishDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : currentTime);



    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setDate(newDate);
        const selectedDateTime = new Date(`${newDate}T${time}`);
        const formattedDateTime = formatDateTime(selectedDateTime);
        setBlogData({ ...blogData, publishDate: formattedDateTime, status: "Scheduled" });
    };

    const handleTimeChange = (event) => {
        const newTime = event.target.value;
        setTime(newTime);
        const selectedDateTime = new Date(`${date}T${newTime}`);
        const formattedDateTime = formatDateTime(selectedDateTime);
        setBlogData({ ...blogData, publishDate: formattedDateTime, status: "Scheduled" });
    };

    const handleUnpublish = () => {
        setDate("--/--/----");
        setTime("--:--");
        setBlogData({ ...blogData, publishDate: null, status: "Draft" });
    }

    return (
        <div className="flex flex-col justify-center gap-1 border-gray-300 border rounded-lg w-96">
            <div className="flex flex-row justify-between bg-gray-900 p-6 rounded-t-lg">
                <div className="font-bold text-white text-xl">Publish</div>
                <div className="text-gray-500 text-sm">
                    <RxCross2 size='28' fill="" className="" onClick={onPublish} />
                </div>
            </div>
            <div className="m-6">
                <label htmlFor="publishdate" className="flex flex-row justify-start mb-2 text-gray-700 text-left">
                    <span className="text-red-500">*</span>Publish Date
                </label>
                <input
                    className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none"
                    type="date"
                    name="publishdate"
                    id="publishdate"
                    value={date}
                    onChange={handleDateChange}
                />
            </div>
            <div className="m-6">
                <label htmlFor="publishtime" className="flex flex-row justify-start mb-2 text-gray-700 text-left">
                    <span className="text-red-500">*</span>Publish Time
                </label>
                <input
                    className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none"
                    type="time"
                    name="publishtime"
                    id="publishtime"
                    value={time}
                    onChange={handleTimeChange}
                />
            </div>
            <div className="flex justify-end gap-2 mb-4 pr-6">
                <NavButton onClick={handleUnpublish} className='bg-red-500 bg-opacity-80 text-white' content={'Unpublish'} />
                <NavButton onClick={onCancel} className='hover:bg-gray-300' content={'Cancel'} />
                <NavButton onClick={onSave} className='bg-blue-700 bg-opacity-80 text-white' content={'Publish'} />
            </div>
        </div>
    );
};

const NavButton = ({ content, className, onClick }) => {
    const classNames = `border border-gray-500 py-2 px-4 rounded-lg hover:bg-opacity-100 ${className}`;

    return (
        <button className={classNames} onClick={onClick}>
            {content}
        </button>
    );
};

export default DatePicker;